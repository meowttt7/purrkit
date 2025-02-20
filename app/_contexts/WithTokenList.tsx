'use client';

import {useLocalStorageValue} from '@react-hookz/web';
import axios from 'axios';
import {createContext, useCallback, useContext, useMemo, useState} from 'react';
import {isAddressEqual} from 'viem';
import {useChainId} from 'wagmi';

import {useAsyncTrigger} from '@lib/hooks/useAsyncTrigger';
import {zeroNormalizedBN} from '@lib/utils/numbers';
import {toAddress} from '@lib/utils/tools.addresses';

import type {TAddress} from '@lib/utils/tools.addresses';
import type {TERC20TokenList, TERC20TokensWithBalance} from '@lib/utils/tools.erc20';
import type {AxiosResponse} from 'axios';
import type {Dispatch, ReactElement, SetStateAction} from 'react';

type TTokenListProps = {
	tokenLists: Record<number, Record<TAddress, TERC20TokensWithBalance>>;
	currentNetworkTokenList: Record<TAddress, TERC20TokensWithBalance>;
	isInitialized: boolean;
	isFromExtraList: (props: {address: TAddress; chainID: number}) => boolean;
	isCustomToken: (props: {address: TAddress; chainID: number}) => boolean;
	getToken: (props: {address: TAddress; chainID: number}) => TERC20TokensWithBalance | undefined;
	addCustomToken: (token: TERC20TokensWithBalance) => void;
	setTokenList: Dispatch<SetStateAction<Record<number, Record<TAddress, TERC20TokensWithBalance>>>>;
};
const defaultProps: TTokenListProps = {
	tokenLists: {},
	currentNetworkTokenList: {},
	isInitialized: false,
	isFromExtraList: (): boolean => false,
	isCustomToken: (): boolean => false,
	getToken: (): TERC20TokensWithBalance | undefined => undefined,
	addCustomToken: (): void => undefined,
	setTokenList: (): void => undefined
};

/******************************************************************************
 ** Helper function to convert a token from the TERC20TokensWithBalance type to the token list
 ** type.
 ******************************************************************************/
export function toTokenListToken(token: TERC20TokensWithBalance): TERC20TokenList['tokens'][0] {
	return {
		address: token.address,
		chainId: token.chainID,
		decimals: token.decimals,
		logoURI: token.logoURI,
		name: token.name,
		symbol: token.symbol
	};
}

/******************************************************************************
 ** Helper function to convert a token from the token list to a TERC20TokensWithBalance type
 ******************************************************************************/
export function toTToken(token: TERC20TokenList['tokens'][0]): TERC20TokensWithBalance {
	return {
		address: token.address,
		chainID: token.chainId,
		decimals: token.decimals,
		logoURI: token.logoURI,
		name: token.name,
		symbol: token.symbol,
		value: 0,
		balance: zeroNormalizedBN
	};
}

const TokenList = createContext<TTokenListProps>(defaultProps);
type TTokenListProviderProps = {
	children: ReactElement;
	lists?: string[];
};
export const WithTokenList = ({
	children,
	lists = [
		'https://raw.githubusercontent.com/SmolDapp/tokenLists/main/lists/etherscan.json',
		'https://raw.githubusercontent.com/SmolDapp/tokenLists/main/lists/tokenlistooor.json'
	]
}: TTokenListProviderProps): ReactElement => {
	const chainID = useChainId();
	const {value: extraTokenlist} = useLocalStorageValue<string[]>('extraTokenlists');
	const {value: extraTokens, set: setExtraTokens} = useLocalStorageValue<TERC20TokenList['tokens']>('extraTokens');
	const [tokenList, setTokenList] = useState<Record<number, Record<TAddress, TERC20TokensWithBalance>>>({});
	const [tokenListExtra, setTokenListExtra] = useState<Record<number, Record<TAddress, TERC20TokensWithBalance>>>({});
	const [tokenListCustom, setTokenListCustom] = useState<Record<number, Record<TAddress, TERC20TokensWithBalance>>>(
		{}
	);
	const [isInitialized, setIsInitialized] = useState([false, false, false]);
	const hashList = useMemo((): string => lists.join(','), [lists]);

	/************************************************************************************
	 ** This is the main function that will be called when the component mounts and
	 ** whenever the hashList changes. It will fetch all the token lists from the
	 ** hashList and then add them to the tokenList state.
	 ** This is the list coming from the props.
	 ************************************************************************************/
	useAsyncTrigger(async (): Promise<void> => {
		const unhashedLists = hashList.split(',');
		const responses = await Promise.allSettled(
			unhashedLists.map(async (eachURI: string): Promise<AxiosResponse> => axios.get(eachURI))
		);
		const tokens: TERC20TokenList['tokens'] = [];
		const fromList: TERC20TokenList[] = [];

		for (const [index, response] of responses.entries()) {
			if (response.status === 'fulfilled') {
				tokens.push(...(response.value.data as TERC20TokenList).tokens);
				fromList.push({...(response.value.data as TERC20TokenList), uri: unhashedLists[index]});
			}
		}

		const tokenListTokens: Record<number, Record<TAddress, TERC20TokensWithBalance>> = {};
		for (const eachToken of tokens) {
			if (!tokenListTokens[eachToken.chainId]) {
				tokenListTokens[eachToken.chainId] = {};
			}
			if (!tokenListTokens[eachToken.chainId][toAddress(eachToken.address)]) {
				tokenListTokens[eachToken.chainId][toAddress(eachToken.address)] = {
					address: eachToken.address,
					name: eachToken.name,
					symbol: eachToken.symbol,
					decimals: eachToken.decimals,
					chainID: eachToken.chainId,
					logoURI: eachToken.logoURI,
					value: 0,
					balance: zeroNormalizedBN
				};
			}

			/**************************************************************************************
			 ** If we are in development mode, we also want to add the token to our list, but only
			 ** if the token's chainID is 1 (Ethereum).
			 *************************************************************************************/
			if (
				process.env.NODE_ENV === 'development' &&
				Boolean(process.env.SHOULD_USE_FORKNET) &&
				eachToken.chainId === 1
			) {
				if (!tokenListTokens[1337]) {
					tokenListTokens[1337] = {};
				}
				if (!tokenListTokens[1337][toAddress(eachToken.address)]) {
					tokenListTokens[1337][toAddress(eachToken.address)] = {
						address: eachToken.address,
						name: eachToken.name,
						symbol: eachToken.symbol,
						decimals: eachToken.decimals,
						chainID: 1337,
						logoURI: eachToken.logoURI,
						value: 0,
						balance: zeroNormalizedBN
					};
				}
			}
		}
		setTokenList(tokenListTokens);
		setIsInitialized(prev => [true, prev[1], prev[2]]);
	}, [hashList]);

	/************************************************************************************
	 ** This trigger will load the lists from the extraTokenlist state. It's not about
	 ** individual tokens, but about the whole list, that can be added by the user from
	 ** the Smol tokenlist repository.
	 ************************************************************************************/
	useAsyncTrigger(async (): Promise<void> => {
		const tokenListTokens: Record<number, Record<TAddress, TERC20TokensWithBalance>> = {};
		const fromList: TERC20TokenList[] = [];

		for (const eachURI of extraTokenlist || []) {
			const [fromUserList] = await Promise.allSettled([axios.get(eachURI)]);

			if (fromUserList.status === 'fulfilled') {
				fromList.push({...(fromUserList.value.data as TERC20TokenList), uri: eachURI});
				const {tokens} = fromUserList.value.data;
				for (const eachToken of tokens) {
					if (!tokenListTokens[eachToken.chainId ?? eachToken.chainID]) {
						tokenListTokens[eachToken.chainId ?? eachToken.chainID] = {};
					}
					if (!tokenListTokens[eachToken.chainId ?? eachToken.chainID][toAddress(eachToken.address)]) {
						tokenListTokens[eachToken.chainId ?? eachToken.chainID][toAddress(eachToken.address)] = {
							address: eachToken.address,
							name: eachToken.name,
							symbol: eachToken.symbol,
							decimals: eachToken.decimals,
							chainID: eachToken.chainID ?? eachToken.chainId,
							logoURI: eachToken.logoURI,
							value: 0,
							balance: zeroNormalizedBN
						};
					}

					/**************************************************************************************
					 ** If we are in development mode, we also want to add the token to our list, but only
					 ** if the token's chainID is 1 (Ethereum).
					 *************************************************************************************/
					if (
						process.env.NODE_ENV === 'development' &&
						Boolean(process.env.SHOULD_USE_FORKNET) &&
						(eachToken.chainID ?? eachToken.chainId) === 1
					) {
						if (!tokenListTokens[1337]) {
							tokenListTokens[1337] = {};
						}
						if (!tokenListTokens[1337][toAddress(eachToken.address)]) {
							tokenListTokens[1337][toAddress(eachToken.address)] = {
								address: eachToken.address,
								name: eachToken.name,
								symbol: eachToken.symbol,
								decimals: eachToken.decimals,
								chainID: 1337,
								logoURI: eachToken.logoURI,
								value: 0,
								balance: zeroNormalizedBN
							};
						}
					}
				}
			}
		}
		setTokenListExtra(tokenListTokens);
		setIsInitialized(prev => [prev[0], true, prev[2]]);
	}, [extraTokenlist]);

	/************************************************************************************
	 ** This trigger will load the lists from the extraTokens state. It's about individual
	 ** tokens, that can be added by the user.
	 ************************************************************************************/
	useAsyncTrigger(async (): Promise<void> => {
		if (extraTokens === undefined) {
			return;
		}
		if ((extraTokens || []).length > 0) {
			const tokenListTokens: Record<number, Record<TAddress, TERC20TokensWithBalance>> = {};
			for (const eachToken of extraTokens || []) {
				if (!tokenListTokens[eachToken.chainId]) {
					tokenListTokens[eachToken.chainId] = {};
				}
				if (!tokenListTokens[eachToken.chainId][toAddress(eachToken.address)]) {
					tokenListTokens[eachToken.chainId][toAddress(eachToken.address)] = {
						address: eachToken.address,
						name: eachToken.name,
						symbol: eachToken.symbol,
						decimals: eachToken.decimals,
						chainID: eachToken.chainId,
						logoURI: eachToken.logoURI,
						value: 0,
						balance: zeroNormalizedBN
					};
				}
				/**************************************************************************************
				 ** If we are in development mode, we also want to add the token to our list, but only
				 ** if the token's chainID is 1 (Ethereum).
				 *************************************************************************************/
				if (
					process.env.NODE_ENV === 'development' &&
					Boolean(process.env.SHOULD_USE_FORKNET) &&
					eachToken.chainId === 1
				) {
					if (!tokenListTokens[1337]) {
						tokenListTokens[1337] = {};
					}
					if (!tokenListTokens[1337][toAddress(eachToken.address)]) {
						tokenListTokens[1337][toAddress(eachToken.address)] = {
							address: eachToken.address,
							name: eachToken.name,
							symbol: eachToken.symbol,
							decimals: eachToken.decimals,
							chainID: 1337,
							logoURI: eachToken.logoURI,
							value: 0,
							balance: zeroNormalizedBN
						};
					}
				}
			}
			setTokenListCustom(tokenListTokens);
		}
		setIsInitialized(prev => [prev[0], prev[1], true]);
	}, [extraTokens]);

	/************************************************************************************
	 ** This will aggregate all the token lists into one big list, that will be used
	 ** by the app.
	 ************************************************************************************/
	const aggregatedTokenList = useMemo((): Record<number, Record<TAddress, TERC20TokensWithBalance>> => {
		const aggregatedTokenList: Record<number, Record<TAddress, TERC20TokensWithBalance>> = {};
		for (const eachChainID of Object.keys(tokenList)) {
			if (!aggregatedTokenList[Number(eachChainID)]) {
				aggregatedTokenList[Number(eachChainID)] = {};
			}
			for (const eachToken of Object.values(tokenList[Number(eachChainID)])) {
				aggregatedTokenList[Number(eachChainID)][toAddress(eachToken.address)] = eachToken;
			}
		}

		for (const eachChainID of Object.keys(tokenListExtra)) {
			if (!aggregatedTokenList[Number(eachChainID)]) {
				aggregatedTokenList[Number(eachChainID)] = {};
			}
			for (const eachToken of Object.values(tokenListExtra[Number(eachChainID)])) {
				aggregatedTokenList[Number(eachChainID)][toAddress(eachToken.address)] = eachToken;
			}
		}

		for (const eachChainID of Object.keys(tokenListCustom)) {
			if (!aggregatedTokenList[Number(eachChainID)]) {
				aggregatedTokenList[Number(eachChainID)] = {};
			}
			for (const eachToken of Object.values(tokenListCustom[Number(eachChainID)])) {
				aggregatedTokenList[Number(eachChainID)][toAddress(eachToken.address)] = eachToken;
			}
		}
		return aggregatedTokenList;
	}, [tokenList, tokenListCustom, tokenListExtra]);

	/************************************************************************************
	 ** This will return the token list for the current network.
	 ************************************************************************************/
	const currentNetworkList: Record<TAddress, TERC20TokensWithBalance> = useMemo(
		() => aggregatedTokenList?.[chainID] || {},
		[aggregatedTokenList, chainID]
	);

	/************************************************************************************
	 ** This will return a specific token from the token list, or an empty object if the
	 ** token is not found.
	 ************************************************************************************/
	const getToken = useCallback(
		(props: {address: TAddress; chainID: number}): TERC20TokensWithBalance => {
			const fromTokenList = aggregatedTokenList?.[props.chainID]?.[toAddress(props.address)];
			if (fromTokenList) {
				return fromTokenList;
			}
			return {} as TERC20TokensWithBalance;
		},
		[aggregatedTokenList]
	);

	/************************************************************************************
	 ** This will return true if the token is from the tokenListExtra.
	 ************************************************************************************/
	const isFromExtraList = useCallback(
		(props: {address: TAddress; chainID: number}): boolean => {
			return Boolean(tokenListExtra?.[props.chainID]?.[toAddress(props.address)]);
		},
		[tokenListExtra]
	);

	/************************************************************************************
	 ** This will return true if the token is from the tokenListCustom, aka added by the
	 ** user as an individual token.
	 ************************************************************************************/
	const isCustomToken = useCallback(
		(props: {address: TAddress; chainID: number}): boolean => {
			return Boolean(tokenListCustom?.[props.chainID]?.[toAddress(props.address)]);
		},
		[tokenListCustom]
	);

	/************************************************************************************
	 ** This will add a token to the tokenListCustom.
	 ************************************************************************************/
	const addCustomToken = useCallback(
		(token: TERC20TokensWithBalance) => {
			const arr = extraTokens ?? [];
			if (!arr.some(t => isAddressEqual(t.address, token.address) && t.chainId === token.chainID)) {
				setExtraTokens([...arr, toTokenListToken(token)]);
			}
		},
		[extraTokens, setExtraTokens]
	);

	const contextValue = useMemo(
		(): TTokenListProps => ({
			tokenLists: aggregatedTokenList,
			currentNetworkTokenList: currentNetworkList,
			isFromExtraList,
			isCustomToken,
			isInitialized: isInitialized[0] && isInitialized[1] && isInitialized[2],
			setTokenList,
			addCustomToken,
			getToken
		}),
		[
			addCustomToken,
			aggregatedTokenList,
			currentNetworkList,
			getToken,
			isCustomToken,
			isInitialized,
			isFromExtraList
		]
	);

	return <TokenList.Provider value={contextValue}>{children}</TokenList.Provider>;
};

export const useTokenList = (): TTokenListProps => useContext(TokenList);

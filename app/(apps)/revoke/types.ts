import type {TNormalizedBN} from '@lib/utils/numbers';
import type {TAddress} from '@lib/utils/tools.addresses';
import type {TERC20TokensWithBalance} from '@lib/utils/tools.erc20';
import type {Dispatch} from 'react';

export type TAllowances = TAllowance[];

/**************************************************************************************************
 ** TAllowance is type for allowances to revoke.
 ** address: TAddress;
 ** owner: The owner of allowance.
 ** sender: The address of a contract that has allowance to spend tokens.
 ** value: The amount of tokens that contract has allowance to.
 ** blockNumber: Number of the block where approve has been made.
 ** chainID: ID of the chain where approve has been made.
 ** logIndex: Sequence number of the log.
 *************************************************************************************************/
export type TAllowance = {
	address: TAddress;
	args: {
		owner: TAddress;
		sender: TAddress;
		value: string | number | bigint | undefined;
	};
	blockNumber: bigint;
	chainID: number;
	logIndex: number;
	transactionIndex: number;
};
export type TUnlimitedFilter = 'unlimited' | 'limited' | undefined;
export type TWithBalanceFilter = 'with-balance' | 'without-balance' | undefined;

/**************************************************************************************************
 ** TRevokeConfiguration contains all the necessary information to perform a revoke operation.
 *************************************************************************************************/
export type TRevokeConfiguration = {
	tokenToCheck?: TERC20TokensWithBalance;
	tokensToCheck?: TTokenAllowance[];
	tokenToRevoke?: TTokenAllowance;
	allowancesFilters: TAllowancesFilters;
};

/**************************************************************************************************
 ** TExpandedAllowance is expanded TAllowances type with additional token and spender info.
 *************************************************************************************************/
export type TExpandedAllowance = TAllowance & {
	name: string;
	symbol: string;
	decimals: number;
	balanceOf: TNormalizedBN;
	spenderName: string;
};

export type TTokenAllowance = Pick<TERC20TokensWithBalance, 'address' | 'name'> & {spender: TAddress};

/**************************************************************************************************
 ** TRevokeContext is the context that hepls us to work with allowances.
 ** - allowances: Actual allowances with all required info.
 ** - configuration: The configuration of the revoke configuration.
 ** - dispatchConfiguration: The dispatcher of the revoke configuration.
 ** - isDoneWithInitialFetch: The flag that informate us if initial fetch is done.
 ** - filteredAllowances: Filtered allowances that are shown in UI.
 ** - isLoading: The flag that shows if allowances are still loading.
 *************************************************************************************************/
export type TRevokeContext = {
	allowances: TExpandedAllowance[] | undefined;
	configuration: TRevokeConfiguration;
	dispatchConfiguration: Dispatch<TRevokeActions>;
	filteredAllowances: TExpandedAllowance[] | undefined;
	isDoneWithInitialFetch: boolean;
	isLoading: boolean;
	allowanceFetchingFromBlock: bigint;
	allowanceFetchingToBlock: bigint;
	isLoadingInitialDB?: boolean;
};

/**************************************************************************************************
 ** TAllowancesFilters is type for all filters you can apply to allowances on the revoke page.
 *************************************************************************************************/
type TAllowancesFilters = {
	unlimited: {
		filter: TUnlimitedFilter;
	};
	withBalance: {
		filter: TWithBalanceFilter;
	};
	asset: {
		filter: TAddress[];
	};
	spender: {
		filter: string[];
	};
};

/**************************************************************************************************
 ** TRevokeActions
 ** SET_TOKEN_TO_CHECK: Sets token to have allowances for.
 ** SET_ALLOWANCE_TO_REVOKE: Sets allowance to be revoke.
 ** SET_FILTER: Sets filters to filter allowances in UI.
 ** RESET_FILTER: Resets all filter
 **************************************************************************************************/
export type TRevokeActions =
	| {type: 'SET_TOKEN_TO_CHECK'; payload: TERC20TokensWithBalance | undefined}
	| {type: 'SET_ALLOWANCE_TO_REVOKE'; payload: TTokenAllowance | undefined}
	| {type: 'SET_FILTER'; payload: TAllowancesFilters}
	| {type: 'RESET_FILTER'};

/**************************************************************************************************
 ** The TApproveEventEntry type definition is used in useRevoke context to get allowances
 ** for provided token list.
 ** The properties are:
 ** id?: number - Id for storing approve event in DB
 ** UID: string - UID for storing approve event in DB
 ** address: TAddress - Address of a token that is approved
 ** chainID: number - Chain ID in which is approve exists
 ** owner: TAddress - Owner of tokens that are approved
 ** sender: TAddress - Address that has access to approved tokens
 ** value: bigint - Amount of approved tokens
 ** blockNumber: bigint - The number of the block
 ** logIndex: number - integer of the log index position in the block
 **	transactionHash: TAddress - uniqe hash of allowance
 ** name: string - Name of a token that is approved
 ** symbol: string - Symbol of a token that is approved
 ** decimals: number - Decimals of a token that is approved
 ** balanceOf: number - Balance of a token that is apporved
 ** spenderName: string - Name of a contract that might spend user's money
 **********************************************************************************************/
export type TApproveEventEntry = {
	id?: number;
	UID: string;
	address: TAddress;
	balanceOf: TNormalizedBN;
	blockNumber: bigint;
	chainID: number;
	decimals: number;
	logIndex: number;
	transactionIndex: number;
	name: string;
	owner: TAddress;
	sender: TAddress;
	symbol: string;
	value: bigint;
	spenderName: string;
};

/**************************************************************************************************
 ** The TApproveEventChainSyncEntry type definition is used in useRevoke context to be able
 ** to merge allowances by block number.
 ** The properties are:
 ** id?: number - Id for storing approve event in DB
 ** chainID: number - Chain ID in which is sync happends
 ** address: TAddress - Address of a user
 ** blockNumber: number - The Number of a last approve event block
 **********************************************************************************************/
export type TApproveEventChainSyncEntry = {
	id?: number;
	chainID: number;
	address: TAddress;
	blockNumber: bigint;
};

/**************************************************************************************************
 **TAllowanceItemProps type of props for a single Allowance item in UI.
 *************************************************************************************************/
export type TAllowanceItemProps = {
	allowance: TExpandedAllowance;
	price?: TNormalizedBN;
	isTable?: boolean;
};

export type TRevokeSortBy = 'spender' | 'amount' | 'token' | '';

export type TFilterAllowance = Pick<TExpandedAllowance, 'symbol' | 'chainID' | 'address' | 'args'> & {
	displayName?: TAddress | string;
	spenderName: string;
};

/**************************************************************************************************
 ** The TAllowancesTableProps type is used to type the props of the AllowancesTable component.
 *************************************************************************************************/
export type TAllowancesTableProps = {
	prices?: Record<TAddress, TNormalizedBN>;
	handleOpenCurtain: VoidFunction;
};

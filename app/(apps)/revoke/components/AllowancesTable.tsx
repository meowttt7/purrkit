import Link from 'next/link';
import {Fragment, useCallback} from 'react';
import {useAccount} from 'wagmi';

import {Button} from '@lib/components/Button';
import {EmptyView} from '@lib/components/EmptyView';
import IconChevronPlain from '@lib/components/icons/IconChevronPlain';
import {IconPlus} from '@lib/components/icons/IconPlus';
import {IconSpinner} from '@lib/components/icons/IconSpinner';
import {useLoginModal} from '@lib/hooks/web3/useLoginModal';
import {cl} from '@lib/utils/helpers';
import {formatAmount} from '@lib/utils/numbers';
import {isAddress, toAddress} from '@lib/utils/tools.addresses';
import {AllowanceItem} from 'app/(apps)/revoke/components/AllowanceItem';
import {useAllowances} from 'app/(apps)/revoke/contexts/useAllowances';
import {useSortedAllowances} from 'app/(apps)/revoke/contexts/useSortedAllowances';

import type {TAllowancesTableProps, TExpandedAllowance} from 'app/(apps)/revoke/types';
import type {ReactElement, ReactNode} from 'react';

/**********************************************************************************************
 ** Columns of allowance table.
 *********************************************************************************************/
const tableColumns = [
	{
		value: 'token',
		title: 'Asset',
		isSortable: true,
		thClassName: 'font-light text-neutral-500',
		btnClassName: 'flex items-center transition-colors hover:text-neutral-800 group'
	},
	{
		value: 'amount',
		title: 'Amount at risk',
		isSortable: true,
		thClassName: 'flex justify-end font-light text-neutral-500',
		btnClassName: 'flex items-center group transition-colors hover:text-neutral-800'
	},
	{
		value: 'spender',
		title: 'Spender',
		isSortable: true,
		thClassName: 'px-6 font-light text-neutral-500',
		btnClassName: 'flex items-center transition-colors hover:text-neutral-800 group justify-end'
	},
	{
		value: '',
		isSortable: false,
		thClassName: 'px-6 font-medium'
	}
];

function TokenFetchingLoader(): ReactElement {
	const {isDoneWithInitialFetch, allowanceFetchingFromBlock, allowanceFetchingToBlock, isLoadingInitialDB} =
		useAllowances();

	const getMessage = (): ReactNode => {
		if (allowanceFetchingToBlock === 0n) {
			return 'Analyzing past blocks ...';
		}

		if (isLoadingInitialDB && isDoneWithInitialFetch) {
			return 'Finalization ...';
		}
		return (
			<Fragment>
				<span>{'Analyzing past blocks '}</span>
				<span className={'tabular-nums'}>
					{formatAmount((Number(allowanceFetchingFromBlock) / Number(allowanceFetchingToBlock)) * 100, 2, 2)}
				</span>
				<span>{'%'}</span>
			</Fragment>
		);
	};

	if (isDoneWithInitialFetch && !isLoadingInitialDB) {
		return <Fragment />;
	}

	return (
		<div className={'mt-10 flex flex-col items-center justify-center gap-4'}>
			<IconSpinner className={'size-6'} />
			<div className={'relative h-2 w-full overflow-hidden rounded-lg bg-neutral-300'}>
				<div
					className={'absolute inset-y-0 left-0 size-full bg-primary'}
					style={{
						width: `${(Number(allowanceFetchingFromBlock) / Number(allowanceFetchingToBlock || 1)) * 100}%`,
						transition: 'width 0.5s',
						zIndex: 1031
					}}
				/>
			</div>
			<p className={'text-xs text-neutral-600'}>{getMessage()}</p>
		</div>
	);
}

function NoAllowanceView(props: {handleOpenCurtain: () => void}): ReactElement {
	return (
		<div
			className={
				'rounded-large mt-3 flex h-56 w-full flex-col items-center justify-center bg-neutral-200 text-neutral-600'
			}>
			<p>{'Nothing to revoke. Select Token to check approvals'}</p>
			<Button
				className={'mt-6 !h-10'}
				onClick={props.handleOpenCurtain}>
				<IconPlus className={'mr-2 size-3'} />
				{'Add token'}
			</Button>
		</div>
	);
}

function Table({prices}: TAllowancesTableProps): ReactElement {
	const {filteredAllowances: allowances, isLoading} = useAllowances();
	const {sortedAllowances} = useSortedAllowances(allowances || [], prices);

	return (
		<>
			<table
				className={
					'text-gray-500 dark:text-gray-400 hidden w-full border-separate border-spacing-y-4 text-left text-sm md:table md:w-full rtl:text-right'
				}>
				<TableHeader allowances={sortedAllowances || []} />
				{sortedAllowances && sortedAllowances?.length > 0 && (
					<tbody
						suppressHydrationWarning
						className={'w-full'}>
						{sortedAllowances?.map(item => (
							<AllowanceItem
								isTable={true}
								key={`${item.address}-${item.args.owner}-${item.args.sender}-${item.blockNumber}-${item.logIndex}`}
								allowance={item}
								price={prices?.[toAddress(item.address)]}
							/>
						))}
					</tbody>
				)}
			</table>
			<div className={'flex flex-col gap-y-2 md:hidden'}>
				{allowances?.map(item => (
					<AllowanceItem
						isTable={false}
						key={`${item.address}-${item.args.owner}-${item.args.sender}-${item.blockNumber}-${item.logIndex}`}
						allowance={item}
						price={prices?.[toAddress(item.address)]}
					/>
				))}
			</div>
			<div
				className={cl(
					'flex h-6 justify-center transition-opacity',
					isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
				)}>
				<IconSpinner />
			</div>
		</>
	);
}

export const AllowancesTable = ({prices, handleOpenCurtain}: TAllowancesTableProps): ReactElement => {
	const {filteredAllowances: allowances, isLoading, isDoneWithInitialFetch, isLoadingInitialDB} = useAllowances();
	const hasAllowances = allowances && allowances.length === 0;
	const isFetchingData = !isDoneWithInitialFetch || isLoading || isLoadingInitialDB || !allowances;
	const {address} = useAccount();
	const onConnect = useLoginModal();

	/**********************************************************************************************
	 ** This function calls approve contract and sets 0 for approve amount. Simply it revokes the
	 ** allowance.
	 *********************************************************************************************/
	if (!isAddress(address)) {
		return (
			<div className={'max-w-full'}>
				<EmptyView onConnect={onConnect} />
			</div>
		);
	}

	if (hasAllowances && !isFetchingData && !isLoadingInitialDB && !isLoading) {
		return <NoAllowanceView handleOpenCurtain={handleOpenCurtain} />;
	}

	if (!isDoneWithInitialFetch || isLoadingInitialDB) {
		return <TokenFetchingLoader />;
	}

	if (!allowances) {
		return <NoAllowanceView handleOpenCurtain={handleOpenCurtain} />;
	}

	return (
		<Table
			prices={prices}
			handleOpenCurtain={handleOpenCurtain}
		/>
	);
};

const TableHeader = ({allowances}: {allowances: TExpandedAllowance[]}): ReactElement => {
	const {sortBy, sortDirection} = useSortedAllowances(allowances || []);

	/**********************************************************************************************
	 ** This toggleSortDirection function changes sort direction between asc, desc and 'no-sort'.
	 *********************************************************************************************/
	const toggleSortDirection = (newSortBy: string): 'asc' | 'desc' | '' => {
		if (sortBy === newSortBy) {
			if (sortDirection === '') {
				return 'desc';
			}
			if (sortDirection === 'desc') {
				return 'asc';
			}
			if (sortDirection === 'asc') {
				return '';
			}
		}
		return 'desc';
	};

	/**********************************************************************************************
	 ** This renderChevron function returns the correct icon, according to current sort state.
	 *********************************************************************************************/
	const renderChevron = useCallback(
		(shouldSortBy: boolean): ReactElement => {
			if (shouldSortBy && sortDirection === 'desc') {
				return <IconChevronPlain className={'size-4 min-w-[16px] cursor-pointer text-neutral-800'} />;
			}
			if (shouldSortBy && sortDirection === 'asc') {
				return (
					<IconChevronPlain className={'size-4 min-w-[16px] rotate-180 cursor-pointer text-neutral-800'} />
				);
			}
			return (
				<IconChevronPlain
					className={
						'size-4 min-w-[16px] cursor-pointer text-neutral-600 transition-colors group-hover:text-neutral-800'
					}
				/>
			);
		},
		[sortDirection]
	);
	return (
		<thead className={'w-full text-xs'}>
			<tr>
				{tableColumns.map((item, i) => (
					<th
						key={`${item.value}${i}`}
						className={item.thClassName}>
						<div className={cl(item.value === 'spender' ? 'flex justify-end' : '')}>
							<Link
								href={`?sortDirection=${toggleSortDirection(item.value)}&sortBy=${item.value}`}
								className={cl(item.btnClassName, sortBy === item.value ? 'text-neutral-800' : '')}>
								<p>{item.title}</p>
								{item.isSortable && renderChevron(sortBy === item.value)}
							</Link>
						</div>
					</th>
				))}
			</tr>
		</thead>
	);
};

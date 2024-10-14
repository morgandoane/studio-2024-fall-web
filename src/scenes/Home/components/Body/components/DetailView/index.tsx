import BalancerRow, { BalancerRowProps } from '@components/display/BalancerRow';
import { Filter, useData } from '@data/useData';
import { FC } from 'react';
import BalancerDetail from './components/BalancerDetail';
import Headline from './components/Headline';
import useKeyboardControls from './useKeyboardControls';
import { months } from '@utils/months';

export interface DetailViewProps {
	filter: Filter;
	setFilter: (newFilter: Filter) => void;
	row: BalancerRowProps;
	min: {
		supply: number;
		demand: number;
		events: number;
		ratio: number;
	};
	max: {
		supply: number;
		demand: number;
		events: number;
		ratio: number;
	};
}

const DetailView: FC<DetailViewProps> = ({
	row,
	filter,
	setFilter,
	min,
	max,
}) => {
	useKeyboardControls(filter, setFilter);

	const month = filter.month!;
	const year = filter.year!;

	const {
		data: { supply, demand },
	} = useData(filter);

	const totalSupply = supply.reduce((acc, s) => acc + s.total_unit, 0);
	const totalDemand = demand.reduce((acc, d) => acc + d.unit, 0);

	return (
		<div className="pl-12 pt-12">
			<p className="text-heading-4">
				{months[month - 1].long}, {year}
			</p>
			<Headline
				supply={totalSupply}
				demand={totalDemand}
				city={filter.city}
				year={year}
				month={month}
			/>
			<div className="h-8" />
			<BalancerDetail
				row={row}
				focus={month - 1}
				setFocus={(i) => {
					setFilter({ ...filter, month: i + 1 });
				}}
				min={min}
				max={max}
			/>
		</div>
	);
};

export default DetailView;

import BalancerRow, { BalancerRowProps } from '@components/display/BalancerRow';
import { Filter, useData } from '@data/useData';
import { FC } from 'react';
import BalancerDetail from './components/BalancerDetail';
import Headline from './components/Headline';
import useKeyboardControls from './useKeyboardControls';
import { months } from '@utils/months';
import EventsDetail from './components/EventsDetail';
import DemandDetail from './components/DemandDetail';
import Rings from '@components/display/Balancer/components/Rings';
import { getGradientColor } from '@utils/getGradientColor';
import { Reorder } from 'framer-motion';

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
		data: { supply, demand, events },
	} = useData(filter);

	const totalSupply = supply.reduce((acc, s) => acc + s.total_unit, 0);
	const totalDemand = demand.reduce((acc, d) => acc + d.unit, 0);

	const sideWidth = 240;

	const balancerProps = row.balancers[month - 1];

	const ratio = balancerProps.supply / balancerProps.demand;

	const color = getGradientColor(
		['#3c8a1f', '#50b011', '#dfd73b', '#e39d42', '#d55940'].reverse(),
		ratio,
		min.ratio,
		max.ratio
	);

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
			<div className="h-12" />
			<BalancerDetail
				row={row}
				focus={month - 1}
				setFocus={(i) => {
					setFilter({ ...filter, month: i + 1 });
				}}
				min={min}
				max={max}
			/>
			<div className="h-12" />
			<p className="text-heading-5 pb-4">Red Cross Events</p>
			<EventsDetail events={events} />
			<div className="h-12" />
			<p className="text-heading-5 pb-4">Blood Demand</p>
			<DemandDetail demand={demand} />
		</div>
	);
};

export default DetailView;
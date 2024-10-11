import { useDemand } from '@data/demand/useDemand';
import { useEvents } from '@data/events/useEvents';
import { useSupply } from '@data/supply/useSupply';
import { DashboardState } from '@scenes/Dashboard';
import { FC } from 'react';
import EventCard from './components/EventCard';
import Collapse from './components/Collapse';
import Pie from '@components/Pie';
import DemandDetail from './components/DemandDetail';
export interface DetailViewProps {
	dashboardState: DashboardState;
	setDashboardState: (dashboardState: DashboardState) => void;
}

const DetailView: FC<DetailViewProps> = ({
	dashboardState,
	setDashboardState,
}) => {
	const { data: events, loading: eventLoading } = useEvents((e) => {
		const city = dashboardState.city
			? dashboardState.city === e.city || !e.city
			: true;
		const year = dashboardState.year === e.year;
		const month = dashboardState.month
			? dashboardState.month === e.month
			: true;
		return city && year && month;
	});

	const { data: supply, loading: supplyLoading } = useSupply((s) => {
		const city = dashboardState.city ? dashboardState.city === s.city : true;
		const year = dashboardState.year === s.year;
		const month = dashboardState.month
			? dashboardState.month === s.month
			: true;
		return city && year && month;
	});

	const { data: demand, loading: demandLoading } = useDemand((d) => {
		const city = dashboardState.city ? dashboardState.city === d.city : true;
		const year = dashboardState.year === d.year;
		const month = dashboardState.month
			? dashboardState.month === d.month
			: true;
		return city && year && month;
	});

	const loading = eventLoading || supplyLoading || demandLoading;

	return (
		<div>
			<Collapse title="Red Cross Events" defaultOpen={false}>
				<div className="flex flex-col gap-4">
					{events.map((e, i) => (
						<EventCard event={e} key={`event-${i}`} />
					))}
				</div>
			</Collapse>
			<Collapse title="Blood Demand" defaultOpen={false}>
				<DemandDetail
					demand={demand}
					year={dashboardState.year!}
					city={dashboardState.city}
				/>
			</Collapse>
			<Collapse title="Blood Supply"></Collapse>
		</div>
	);
};

export default DetailView;

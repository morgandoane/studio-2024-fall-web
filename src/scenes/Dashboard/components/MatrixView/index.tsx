import BalancerMatrix, {
	BalancerMatrixProps,
} from '@components/BalancerMatrix';
import CanvasMatrix from '@components/CanvasMatrix';
import { useSupply } from '@data/supply/useSupply';
import { useDemand } from '@data/demand/useDemand';
import { useEvents } from '@data/events/useEvents';
import { Supply } from '@data/supply/Supply';
import { DashboardState } from '@scenes/Dashboard';
import { FC, useCallback, useMemo } from 'react';
import { Demand } from '@data/demand/Demand';
import { Event } from '@data/events/Event';

// 2006 through 2022
const years = Array.from({ length: 17 }, (_, i) => i + 2006);
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const MatrixView: FC<{
	dashboardState: DashboardState;
	setDashboardState: (dashboardState: DashboardState) => void;
}> = ({ dashboardState, setDashboardState }) => {
	const supplyFilter = useCallback(
		(s: Supply) => {
			if (!dashboardState.city) return true;
			else return s.city === dashboardState.city;
		},
		[dashboardState.city]
	);
	const demandFilter = useCallback(
		(s: Demand) => {
			if (!dashboardState.city) return true;
			else return s.city === dashboardState.city;
		},
		[dashboardState.city]
	);

	const eventFilter = useCallback(
		(s: Event) => {
			if (!dashboardState.city) return true;
			else return s.city === dashboardState.city || !s.city;
		},
		[dashboardState.city]
	);
	const { data: supply, loading: supplyLoading } = useSupply(supplyFilter);

	const { data: demand, loading: demandLoading } = useDemand(demandFilter);

	const { data: events, loading: eventsLoading } = useEvents(eventFilter);

	const loading = useMemo(
		() => supplyLoading || eventsLoading || demandLoading,
		[supplyLoading, eventsLoading, demandLoading]
	);

	const nodes = useMemo(() => {
		const res: BalancerMatrixProps['data'] = [];

		for (const year of years) {
			res.push({
				year,
				data: months.map((month) => ({
					supply: supply
						.filter((s) => s.year === year && s.month === month)
						.reduce((acc, s) => acc + s.total_unit, 0),
					demand:
						demand
							.filter((s) => s.year === year && s.month === month)
							.reduce((acc, s) => acc + s.unit, 0) * 0.8,
					events: events.filter((e) => e.year === year && e.month === month),
				})),
			});
		}

		return res;
	}, [supply, demand, events]);

	return (
		<div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<div style={{ flex: 1, maxWidth: '1200px', overflow: 'hidden' }}>
					{/* <BalancerMatrix
						data={nodes}
						thk={12}
						onClick={(year, month) => {
							setDashboardState({
								...dashboardState,
								year,
								month,
							});
						}}
					/> */}
					<CanvasMatrix
						data={nodes}
						onClick={(year, month) => {
							setDashboardState({
								...dashboardState,
								year,
								month,
							});
						}}
					/>
				</div>
			</div>
			<div style={{ height: '96px' }} />
		</div>
	);
};

export default MatrixView;

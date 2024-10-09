/* eslint-disable @typescript-eslint/no-unused-vars */
import BalancerMatrix, {
	BalancerMatrixProps,
} from '@components/BalancerMatrix';
import { useDemand } from '@data/demand/useDemand';
import { useEvents } from '@data/events/useEvents';
import { useSupply } from '@data/supply/useSupply';
import { DashboardState } from '@scenes/Dashboard';
import { FC } from 'react';

const MatrixView: FC<{
	dashboardState: DashboardState;
	setDashboardState: (dashboardState: DashboardState) => void;
}> = ({ dashboardState, setDashboardState }) => {
	const { data: supply, loading: supplyLoading } = useSupply((s) => {
		if (!dashboardState.city) return true;
		else return s.city === dashboardState.city;
	});

	const { data: demand, loading: demandLoading } = useDemand((s) => {
		if (!dashboardState.city) return true;
		else return s.city === dashboardState.city;
	});

	const { data: events, loading: eventsLoading } = useEvents((s) => {
		if (!dashboardState.city) return true;
		else return s.city === dashboardState.city || !s.city;
	});

	const loading = supplyLoading || eventsLoading || demandLoading;

	if (loading) return <div />;

	// 2006 through 2022
	const years = Array.from({ length: 17 }, (_, i) => i + 2006);
	const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	const getData = (): BalancerMatrixProps['data'] => {
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
					events: events.filter((e) => e.year === year && e.month === month)
						.length,
				})),
			});
		}

		return res;
	};

	const nodes = getData();

	return (
		<div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<div style={{ flex: 1, maxWidth: '1200px', overflow: 'hidden' }}>
					<BalancerMatrix
						data={nodes}
						thk={12}
						onClick={(year, month) => {
							setDashboardState({
								...dashboardState,
								year,
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

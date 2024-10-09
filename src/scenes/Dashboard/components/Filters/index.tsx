import { DashboardState } from '@scenes/Dashboard';
import { FC } from 'react';

export interface FiltersProps {
	dashboardState: DashboardState;
	setDashboardState: (dashboardState: DashboardState) => void;
}

// 2006 through 2022
const years = Array.from({ length: 17 }, (_, i) => i + 2006);

const cities = ['Seoul', 'Busan', 'Daegu', 'Incheon', 'Gwangju', 'Daejeon'];

const Filters: FC<FiltersProps> = ({ dashboardState, setDashboardState }) => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '16px',
			}}
		>
			<button
				disabled={!dashboardState.year && !dashboardState.city}
				onClick={() =>
					setDashboardState({ year: null, city: null, month: null })
				}
			>
				Clear Filters
			</button>
			<select
				value={dashboardState.year || ''}
				onChange={(e) =>
					setDashboardState({
						...dashboardState,
						year: parseInt(e.target.value) || null,
					})
				}
			>
				<option value="">Select a year</option>
				{years.map((year) => (
					<option key={`year-${year}`} value={year}>
						{year}
					</option>
				))}
			</select>
			<select
				value={dashboardState.city || ''}
				onChange={(e) =>
					setDashboardState({
						...dashboardState,
						city: e.target.value || null,
					})
				}
			>
				<option value="">Select a city</option>
				{cities.map((city) => (
					<option key={`city-${city}`} value={city}>
						{city}
					</option>
				))}
			</select>
		</div>
	);
};

export default Filters;

import { DashboardState } from '@scenes/Dashboard';
import { FC } from 'react';

export interface FiltersProps {
	dashboardState: DashboardState;
	setDashboardState: (dashboardState: DashboardState) => void;
}

// 2006 through 2022
const years = Array.from({ length: 17 }, (_, i) => i + 2006);

const Filters: FC<FiltersProps> = ({ dashboardState, setDashboardState }) => {
	return (
		<div>
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
		</div>
	);
};

export default Filters;

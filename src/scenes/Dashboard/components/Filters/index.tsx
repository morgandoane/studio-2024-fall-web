import { DashboardState } from '@scenes/Dashboard';
import { FC } from 'react';
import YearFilter from './components/YearFilter';
import CityFilter from './components/CityFilter';

export interface FiltersProps {
	dashboardState: DashboardState;
	setDashboardState: (dashboardState: DashboardState) => void;
}

const Filters: FC<FiltersProps> = ({ dashboardState, setDashboardState }) => {
	return (
		<div className="flex gap-2 items-center">
			<p>Filters:</p>
			<YearFilter
				value={dashboardState.year}
				onChange={(value) =>
					setDashboardState({ ...dashboardState, year: value })
				}
			/>
			<CityFilter
				value={dashboardState.city}
				onChange={(value) =>
					setDashboardState({ ...dashboardState, city: value })
				}
			/>
		</div>
	);
};

export default Filters;

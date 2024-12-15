import { DashboardState } from '@scenes/Dashboard';
import { FC } from 'react';

export interface FiltersProps {
	dashboardState: DashboardState;
	setDashboardState: (dashboardState: DashboardState) => void;
}

// 2006 through 2022
const years = Array.from({ length: 17 }, (_, i) => i + 2006);

const cities = [
	'Busan',
	'Chungbuk',
	'Daegu/Gyeongbuk',
	'Daejeon/Chungnam',
	'Gangwon',
	'Gyeonggi',
	'Gyeongnam',
	'Incheon',
	'Jeju',
	'Jeonam',
	'Jeonbuk',
	'Jeonnam',
	'Seoul',
	'Ulsan',
];

const Filters: FC<FiltersProps> = ({ dashboardState, setDashboardState }) => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '16px',
				position: 'relative',
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
			<div
				style={{
					position: 'absolute',
					right: '0',
				}}
			>
				{/* '#D5D052', '#DD8647', '#E43B3B' */}
				<div
					style={{
						height: '16px',
						width: '96px',
						background: 'linear-gradient(to right, #3BA556, #D5D052, #E43B3B)',
						borderRadius: '2px',
					}}
				></div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<p
						style={{
							fontSize: '.75rem',
							padding: 0,
							margin: 0,
						}}
					>
						Healthy
					</p>
					<p
						style={{
							fontSize: '.75rem',
							padding: 0,
							margin: 0,
						}}
					>
						Risky
					</p>
				</div>
			</div>
		</div>
	);
};

export default Filters;

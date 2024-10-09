import { FC, useState } from 'react';
import MatrixView from './components/MatrixView';
import DetailView from './components/DetailView';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Filters from './components/Filters';

export interface DashboardState {
	year: number | null;
	month: number | null;
	city: string | null;
}

export type ScrollDirection = 'none' | 'up' | 'down';

const Dashboard: FC = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const [scrollPosition, setScrollPosition] = useState(0);

	const dashboardState: DashboardState = {
		year: searchParams.get('year') ? parseInt(searchParams.get('year')!) : null,
		month: searchParams.get('month')
			? parseInt(searchParams.get('month')!)
			: null,
		city: searchParams.get('city'),
	};

	const setDashboardState = (dashboardState: DashboardState) => {
		if (dashboardState.year) {
			searchParams.set('year', dashboardState.year.toString());
		} else {
			searchParams.delete('year');
		}

		if (dashboardState.month) {
			searchParams.set('month', dashboardState.month.toString());
		} else {
			searchParams.delete('month');
		}

		if (dashboardState.city) {
			searchParams.set('city', dashboardState.city);
		} else {
			searchParams.delete('city');
		}

		setSearchParams(searchParams);
	};

	return (
		<div
			style={{
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				overflow: 'hidden',
			}}
		>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					borderBottom: '1px solid #e0e0e0',
					boxShadow:
						scrollPosition !== 0 ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
				}}
			>
				<div style={{ flex: 1, maxWidth: '1200px' }}>
					<Header collapsed={scrollPosition !== 0} />
					<Filters
						dashboardState={dashboardState}
						setDashboardState={setDashboardState}
					/>
				</div>
			</div>
			<div
				style={{
					flex: 1,
					overflowY: 'auto',
					display: 'flex',
					justifyContent: 'center',
				}}
				onScroll={(e) => {
					const target = e.target as HTMLDivElement;
					const scrollY = target.scrollTop;
					setScrollPosition(scrollY);
				}}
			>
				<div style={{ flex: 1, maxWidth: '1200px' }}>
					<AnimatePresence>
						<motion.div
							key={`matrix-view-${dashboardState.year ?? 'null'}`}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							{dashboardState.year ? (
								<DetailView
									dashboardState={dashboardState}
									setDashboardState={setDashboardState}
								/>
							) : (
								<MatrixView
									dashboardState={dashboardState}
									setDashboardState={setDashboardState}
								/>
							)}
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;

import { FC, useEffect, useState } from 'react';
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

	useEffect(() => {
		// right and left key => change month
		// up and down key => change year
		// escape key => clear year and month

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'ArrowRight') {
				if (dashboardState.month && dashboardState.month < 12) {
					setDashboardState({
						...dashboardState,
						month: dashboardState.month + 1,
					});
				}
			} else if (e.key === 'ArrowLeft') {
				if (dashboardState.month && dashboardState.month > 1) {
					setDashboardState({
						...dashboardState,
						month: dashboardState.month - 1,
					});
				}
			} else if (e.key === 'ArrowUp') {
				if (dashboardState.year) {
					setDashboardState({
						...dashboardState,
						year: dashboardState.year + 1,
					});
				}
			} else if (e.key === 'ArrowDown') {
				if (dashboardState.year) {
					setDashboardState({
						...dashboardState,
						year: dashboardState.year - 1,
					});
				}
			} else if (e.key === 'Escape') {
				setDashboardState({
					...dashboardState,
					year: null,
					month: null,
				});
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [dashboardState]);

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
					<Header />
					<div style={{ height: '16px' }} />
					<Filters
						dashboardState={dashboardState}
						setDashboardState={setDashboardState}
					/>
					<div style={{ height: '16px' }} />
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

import { useData } from '@data/useData';
import { FC, ReactElement, useState } from 'react';
import Heatmaps from './views/Heatmaps';
import { Button, Tab, TabGroup, TabList } from '@headlessui/react';
import Filters from './components/Filters';

export type DashboardView = 'heatmaps' | 'pulse';

const Dashboard: FC = () => {
	const { data, loading } = useData();

	const [view, setView] = useState<DashboardView>('heatmaps');

	const components: Record<DashboardView, ReactElement> = {
		heatmaps: <Heatmaps data={data} />,
		pulse: <div />,
	};

	if (loading) return null;

	return (
		<div className="flex flex-col h-screen overflow-hidden">
			<div className="flex justify-between border-b border-gray-500  pl-12 pr-12 py-2">
				<div className="flex gap-2">
					<Button
						onClick={() => setView('heatmaps')}
						className={`py-1 px-4 justify-start rounded-full ${
							view === 'heatmaps'
								? 'hover:bg-gray-900 bg-gray-800 text-white'
								: 'hover:bg-slate-100'
						}`}
					>
						Heatmaps
					</Button>
					<Button
						onClick={() => setView('pulse')}
						className={`py-1 px-4 justify-start rounded-full ${
							view === 'pulse'
								? 'hover:bg-gray-900 bg-gray-800 text-white'
								: 'hover:bg-slate-100'
						}`}
					>
						Pulse
					</Button>
				</div>
				<Filters />
			</div>
			<div className="flex-1 overflow-y-auto overflow-x-hidden">
				{components[view]}
			</div>
		</div>
	);
};

export default Dashboard;

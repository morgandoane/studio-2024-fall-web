/* eslint-disable @typescript-eslint/no-unused-vars */
import { DashboardState } from '@scenes/Dashboard';
import { FC } from 'react';
import { JSONTree } from 'react-json-tree';

export interface DetailViewProps {
	dashboardState: DashboardState;
	setDashboardState: (dashboardState: DashboardState) => void;
}

const DetailView: FC<DetailViewProps> = ({
	dashboardState,
	setDashboardState,
}) => {
	return (
		<div>
			<JSONTree data={dashboardState} hideRoot />
		</div>
	);
};

export default DetailView;

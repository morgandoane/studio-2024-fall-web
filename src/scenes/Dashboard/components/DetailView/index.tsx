/* eslint-disable @typescript-eslint/no-unused-vars */
import { DashboardState } from '@scenes/Dashboard';
import { FC } from 'react';

export interface DetailViewProps {
	dashboardState: DashboardState;
	setDashboardState: (dashboardState: DashboardState) => void;
}

const DetailView: FC<DetailViewProps> = ({
	dashboardState,
	setDashboardState,
}) => {
	return <div></div>;
};

export default DetailView;

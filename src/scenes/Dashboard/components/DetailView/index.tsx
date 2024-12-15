/* eslint-disable @typescript-eslint/no-unused-vars */
import { DashboardState } from '@scenes/Dashboard';
import { FC } from 'react';
import placeholder from './placeholder.jpg';
import Balancer from '@components/Balancer';
export interface DetailViewProps {
	dashboardState: DashboardState;
	setDashboardState: (dashboardState: DashboardState) => void;
}

const DetailView: FC<DetailViewProps> = ({
	dashboardState,
	setDashboardState,
}) => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			<img
				src={placeholder}
				alt="placeholder"
				style={{
					width: '700px',
				}}
			/>
		</div>
	);
};

export default DetailView;

import { BalancerProps } from '@components/Balancer';
import BalancerRow from '@components/BalancerRow';
import { FC } from 'react';

export interface BalancerMatrixProps {
	data: {
		year: number;
		data: Omit<BalancerProps, 'width' | 'maxEvents' | 'thk'>[];
	}[];
	showStem?: boolean;
	showGrid?: boolean;
	thk: number;
	onClick?: (year: number, month: number) => void;
}

const BalancerMatrix: FC<BalancerMatrixProps> = ({
	data,
	showStem = true,
	showGrid = false,
	thk,
	onClick,
}) => {
	const sorted = data.sort((a, b) => a.year - b.year);
	const maxEvents = Math.max(
		...sorted.flatMap((item) =>
			item.data.map((balancer) => balancer.events.length)
		)
	);

	return (
		<div
			style={{
				position: 'relative',
			}}
		>
			<div
				style={{
					paddingTop: '8px',
				}}
			>
				{[
					'Jan',
					'Feb',
					'Mar',
					'Apr',
					'May',
					'Jun',
					'Jul',
					'Aug',
					'Sep',
					'Oct',
					'Nov',
					'Dec',
				].map((month, index) => (
					<div
						key={`balancer-month-${index}`}
						style={{
							display: 'inline-block',
							width: `${100 / 12}%`,
							textAlign: 'center',
						}}
					>
						{month}
					</div>
				))}
			</div>
			{sorted.map((item, index) => (
				<BalancerRow
					year={item.year}
					balancers={item.data}
					maxEvents={maxEvents}
					key={`balancer-row-${index}`}
					showStem={showStem}
					showGrid={showGrid}
					thk={thk}
					onClick={(month) => onClick?.(item.year, month)}
				/>
			))}
		</div>
	);
};

export default BalancerMatrix;

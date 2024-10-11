import { BalancerProps } from '@components/Balancer';
import CanvasRow from '@components/CanvasRow';
import { FC, useMemo } from 'react';

export interface CanvasMatrixProps {
	onClick: (year: number, month: number) => void;
	data: {
		year: number;
		data: Omit<BalancerProps, 'width' | 'maxEvents' | 'thk'>[];
	}[];
}

const CanvasMatrix: FC<CanvasMatrixProps> = ({ data, onClick }) => {
	const sorted = useMemo(() => data.sort((a, b) => a.year - b.year), [data]);
	const maxEvents = useMemo(
		() =>
			Math.max(
				...sorted.flatMap((item) =>
					item.data.map((balancer) => balancer.events.length)
				)
			),
		[sorted]
	);
	return (
		<div>
			{sorted.map((item, index) => (
				<CanvasRow
					onClick={(month) => onClick(item.year, month)}
					year={item.year}
					key={index}
					balancers={item.data}
					maxEvents={maxEvents}
				/>
			))}
		</div>
	);
};

export default CanvasMatrix;

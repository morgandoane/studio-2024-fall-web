import { BalancerProps } from '@components/Balancer';
import BalancerRow from '@components/BalancerRow';
import { FC, useRef } from 'react';

export interface BalancerMatrixProps {
	data: {
		year: number;
		data: Omit<BalancerProps, 'width' | 'maxEvents'>[];
	}[];
}

const BalancerMatrix: FC<BalancerMatrixProps> = ({ data }) => {
	const sorted = data.sort((a, b) => a.year - b.year);
	const maxEvents = Math.max(
		...sorted.flatMap((item) => item.data.map((balancer) => balancer.events))
	);

	const ref = useRef<HTMLDivElement>(null);

	return (
		<div
			ref={ref}
			style={{
				position: 'relative',
			}}
		>
			{sorted.map((item, index) => (
				<BalancerRow
					balancers={item.data}
					maxEvents={maxEvents}
					key={`balancer-row-${index}`}
				/>
			))}
		</div>
	);
};

export default BalancerMatrix;

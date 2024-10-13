import { FC, useRef } from 'react';
import Balancer, { BalancerProps } from '../Balancer';
import { useSize } from '@hooks/useSize';

export interface BalancerRowProps {
	balancers: BalancerProps['value'][];
	max: BalancerProps['max'];
	min: BalancerProps['min'];
	index: number;
	label: string;
}

const BalancerRow: FC<BalancerRowProps> = ({
	balancers,
	max,
	min,
	index: rowIndex,
	label,
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const { width } = useSize(ref);
	return (
		<div
			ref={ref}
			className="flex"
			style={{
				height: `${width / balancers.length}px`,
				position: 'relative',
			}}
		>
			<p
				className="text-body-small"
				style={{
					position: 'absolute',
					left: 0,
					top: '50%',
					transform: 'translateY(-50%) translateX(calc(-100% - 8px))',
				}}
			>
				{label}
			</p>
			{balancers.map((balancer, colIndex) => (
				<Balancer
					key={`balancer-${colIndex}`}
					width={width / balancers.length}
					value={balancer}
					max={max}
					min={min}
					index={{ row: rowIndex, col: colIndex }}
				/>
			))}
		</div>
	);
};

export default BalancerRow;

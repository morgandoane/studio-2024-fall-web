import { FC, useEffect, useRef, useState } from 'react';
import Balancer, { BalancerProps } from '../Balancer';
import { useSize } from '@hooks/useSize';
import { motion } from 'framer-motion';

export interface BalancerRowProps {
	balancers: BalancerProps['value'][];
	max: BalancerProps['max'];
	min: BalancerProps['min'];
	index: number;
	label: string;
	onClick: (index: number) => void;
}

const BalancerRow: FC<BalancerRowProps> = ({
	balancers,
	max,
	min,
	index: rowIndex,
	label,
	onClick,
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const { width } = useSize(ref, 'row');

	const [entered, setEntered] = useState(false);

	useEffect(() => {
		if (width > 50) {
			setEntered(true);
		}
	}, [width]);

	return (
		<motion.div
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
					onClick={() => onClick(colIndex)}
					key={`balancer-${colIndex}`}
					width={width / balancers.length}
					value={balancer}
					max={max}
					min={min}
					index={{ row: rowIndex, col: colIndex }}
				/>
			))}
		</motion.div>
	);
};

export default BalancerRow;

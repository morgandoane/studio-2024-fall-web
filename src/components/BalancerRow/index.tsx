import Balancer, { BalancerProps, getStemHeight } from '@components/Balancer';
import { useSize } from '@hooks/useSize';
import { motion } from 'framer-motion';
import { FC, useRef } from 'react';

export interface BalancerRowProps {
	balancers: Omit<BalancerProps, 'width' | 'maxEvents' | 'thk'>[];
	maxEvents: number;
	showStem?: boolean;
	showGrid?: boolean;
	thk: number;
	onClick?: (index: number) => void;
}

const BalancerRow: FC<BalancerRowProps> = ({
	balancers,
	maxEvents,
	showStem = true,
	showGrid = true,
	thk,
	onClick,
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const { width } = useSize(ref);

	const splinePoints = balancers.map((balancer, index) => {
		const stemHeight = getStemHeight(
			balancer.events,
			maxEvents,
			width / balancers.length
		);

		const x =
			(width / balancers.length) * (index + 1) - width / balancers.length / 2;
		const y =
			stemHeight === 0
				? width / balancers.length - thk / 2
				: width / balancers.length - stemHeight;
		return { x, y };
	});

	// Function to generate the 'd' attribute for the cubic Bezier path
	const generateCubicPath = (
		points: { x: number; y: number }[],
		closePath = false
	) => {
		if (points.length < 2) return '';

		let path = `M ${points[0].x},${points[0].y}`;

		for (let i = 1; i < points.length; i++) {
			const prev = points[i - 1];
			const current = points[i];
			const controlPointX = (prev.x + current.x) / 2; // Midpoint for control point
			path += ` C ${controlPointX},${prev.y} ${controlPointX},${current.y} ${current.x},${current.y}`;
		}

		if (closePath) {
			// Extend the path to close the shape by connecting it to the bottom
			path += ` L ${points[points.length - 1].x},${width / balancers.length}`; // Line down to bottom right
			path += ` L ${points[0].x},${width / balancers.length}`; // Line across bottom to left
			path += ' Z'; // Close the path
		}

		return path;
	};

	// Generate path data for the stroke and the filled area
	const pathData = generateCubicPath(splinePoints);
	const filledPathData = generateCubicPath(splinePoints, true); // Closed path for fill

	return (
		<motion.div
			ref={ref}
			style={{
				display: 'flex',
				position: 'relative',
				maxWidth: '100%',
			}}
		>
			<svg
				width={width}
				height={width / balancers.length}
				style={{ position: 'absolute' }}
			>
				{/* Filled area under the curve */}
				<motion.path
					d={filledPathData}
					fill="rgba(0, 0, 0, 0.04)"
					stroke="none"
					animate={{ d: filledPathData }} // Animate the 'd' attribute
					transition={{
						duration: 1, // Duration of the animation
						ease: 'easeInOut', // Smoothing the animation
					}}
				/>
				{/* Animate the path shape */}
				<motion.path
					d={pathData}
					fill="none"
					stroke="grey"
					strokeWidth={1}
					strokeLinecap="round"
					strokeDasharray="5"
					animate={{ d: pathData }} // Animate the 'd' attribute
					transition={{
						duration: 1, // Duration of the animation
						ease: 'easeInOut', // Smoothing the animation
					}}
				/>
				{/* Vertical lines at centers of balancers */}
				{showGrid &&
					balancers.map((_, index) => (
						<line
							x1={
								(width / balancers.length) * (index + 1) -
								width / balancers.length / 2 +
								2
							}
							y1={0}
							x2={
								(width / balancers.length) * (index + 1) -
								width / balancers.length / 2 +
								2
							}
							y2={width / balancers.length}
							stroke="rgba(0, 0, 0, 0.2)"
							strokeWidth={1}
							key={`line-${index}`}
						/>
					))}
				<line
					// across bottom
					x1={0}
					y1={width / balancers.length}
					x2={width}
					y2={width / balancers.length}
					stroke="rgba(0, 0, 0, 0.2)"
					strokeWidth={1}
				/>
			</svg>
			{balancers.map((balancer, index) => (
				<Balancer
					{...balancer}
					width={width / balancers.length}
					maxEvents={maxEvents}
					key={`balancer-${index}`}
					showStem={showStem}
					thk={thk}
					onClick={() => {
						if (onClick) onClick(index + 1);
					}}
				/>
			))}
		</motion.div>
	);
};

export default BalancerRow;

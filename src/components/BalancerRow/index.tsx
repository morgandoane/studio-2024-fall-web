import Balancer, { BalancerProps, getStemHeight } from '@components/Balancer';
import { motion } from 'framer-motion';
import { FC, useEffect, useRef, useState } from 'react';

export interface BalancerRowProps {
	balancers: Omit<BalancerProps, 'width' | 'maxEvents'>[];
	maxEvents: number;
	showStem?: boolean;
	showGrid?: boolean;
}

const BalancerRow: FC<BalancerRowProps> = ({
	balancers,
	maxEvents,
	showStem = false,
	showGrid = false,
}) => {
	const ref = useRef<HTMLDivElement>(null);

	const [width, setWidth] = useState(() => {
		return ref.current?.offsetWidth ?? 0;
	});

	useEffect(() => {
		if (ref.current) {
			// attach a resize observer to the ref

			const observer = new ResizeObserver((entries) => {
				for (const entry of entries) {
					setWidth(entry.contentRect.width);
				}
			});

			observer.observe(ref.current);

			// return a cleanup function to disconnect the observer
			return () => {
				observer.disconnect();
			};
		}
	}, []);

	const splinePoints = balancers.map((balancer, index) => {
		const stemHeight = getStemHeight(
			balancer.events,
			maxEvents,
			width / balancers.length
		);

		const x =
			(width / balancers.length) * (index + 1) - width / balancers.length / 2;
		const y = width / balancers.length - stemHeight;
		return { x, y };
	});

	// Function to generate the 'd' attribute for the cubic Bezier path
	const generateCubicPath = (points: { x: number; y: number }[]) => {
		if (points.length < 2) return '';

		let path = `M ${points[0].x},${points[0].y}`;

		for (let i = 1; i < points.length; i++) {
			const prev = points[i - 1];
			const current = points[i];
			const controlPointX = (prev.x + current.x) / 2; // Midpoint for control point
			path += ` C ${controlPointX},${prev.y} ${controlPointX},${current.y} ${current.x},${current.y}`;
		}

		return path;
	};

	const pathData = generateCubicPath(splinePoints);

	return (
		<motion.div
			ref={ref}
			style={{
				display: 'flex',
				position: 'relative',
			}}
		>
			<svg
				width={width}
				height={width / balancers.length}
				style={{ position: 'absolute' }}
			>
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
				/>
			))}
		</motion.div>
	);
};

export default BalancerRow;

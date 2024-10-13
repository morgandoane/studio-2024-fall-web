import { getGradientColor } from '@utils/getGradientColor';
import { motion } from 'framer-motion';
import { FC, useState } from 'react';
import Rings from './components/Rings';

export interface BalancerProps {
	width: number;
	value: {
		events: number;
		supply: number;
		demand: number;
	};
	max: {
		supply: number;
		demand: number;
		events: number;
		ratio: number;
	};
	min: {
		supply: number;
		demand: number;
		events: number;
		ratio: number;
	};
	index: {
		row: number;
		col: number;
	};
}

const Balancer: FC<BalancerProps> = ({ width, value, max, min, index }) => {
	const thk = width / 6;

	const [hovered, setHovered] = useState(false);

	const hoverScale = hovered ? 1.2 : 1;

	const ratio = value.supply / value.demand;
	const ratioPosition = (ratio - min.ratio) / (max.ratio - min.ratio);
	const angle = ratioPosition * -90;

	const minTabLength = 18;
	const maxTabLength = width * 0.475;

	// tab length is based on supply
	const tabLength = Math.min(
		minTabLength + (maxTabLength - minTabLength) * ratio,
		maxTabLength
	);
	const tickLength = Math.min(
		minTabLength + ((maxTabLength - minTabLength) * 1) / ratio,
		maxTabLength
	);

	const color = getGradientColor(
		['#3c8a1f', '#50b011', '#dfd73b', '#e39d42', '#d55940'].reverse(),
		ratio,
		min.ratio,
		max.ratio
	);

	const transition = {
		type: 'spring',
		stiffness: 100,
		damping: 10,
	};

	return (
		<div
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			className="relative"
			style={{
				width: `${width}px`,
				height: `${width}px`,
				cursor: 'pointer',
			}}
		>
			<div className="absolute top-1/2 w-full border" />
			<Rings
				count={value.events}
				base={thk + 4}
				offset={10}
				color={color}
				delay={index.col * 0.1}
				scale={hoverScale}
			/>
			{/* Tab */}
			<motion.div
				style={{
					height: thk,
					width: tabLength,
					background: color,
					position: 'absolute',
					top: `calc(50% - ${thk / 2}px)`,
					right: `calc(50% - ${thk / 2}px)`,
					transformOrigin: `calc(100% - ${thk / 2}px) center`,
					borderRadius: `${thk}px`,
				}}
				animate={{ rotate: angle, scale: hoverScale }}
				transition={transition}
			/>
			{/* Tick */}
			<motion.div
				className="bg-gray-700"
				style={{
					height: thk / 3,
					width: tickLength,
					position: 'absolute',
					top: `calc(50% - ${thk / 6}px)`,
					left: `calc(50% - ${thk / 6}px)`,
					transformOrigin: `calc(0% + ${thk / 6}px) center`,
					borderRadius: `${thk / 3}px`,
				}}
				animate={{ rotate: angle, scale: hoverScale }}
				transition={transition}
			/>
			<motion.div
				className="border-2 border-gray-700"
				style={{
					height: thk + 4,
					width: thk + 4,
					background: 'white',
					position: 'absolute',
					top: `calc(50% - ${thk / 2 + 2}px)`,
					right: `calc(50% - ${thk / 2 + 2}px)`,
					borderRadius: `${thk}px`,
				}}
				animate={{ scale: hoverScale }}
				transition={transition}
			/>
		</div>
	);
};

export default Balancer;

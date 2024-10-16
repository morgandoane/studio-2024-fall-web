import { getGradientColor } from '@utils/getGradientColor';
import { motion } from 'framer-motion';
import { FC, useCallback, useMemo, useState } from 'react';
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
	onClick: () => void;
}

const Balancer: FC<BalancerProps> = ({
	width,
	value,
	max,
	min,
	index,
	onClick,
}) => {
	const thk = width / 6;
	const [hovered, setHovered] = useState(false);
	const hoverScale = hovered ? 1.2 : 1;

	const ratio = useMemo(
		() => value.supply / value.demand,
		[value.supply, value.demand]
	);
	const ratioPosition = useMemo(
		() => (ratio - min.ratio) / (max.ratio - min.ratio),
		[ratio, min.ratio, max.ratio]
	);
	const angle = useMemo(
		() => Math.max(ratioPosition * -90, -90),
		[ratioPosition]
	);

	const minTabLength = 18;
	const maxTabLength = width * 0.475;

	const tabLength = useMemo(
		() =>
			Math.min(
				minTabLength + (maxTabLength - minTabLength) * ratio,
				maxTabLength
			),
		[ratio, minTabLength, maxTabLength]
	);

	const tickLength = useMemo(
		() =>
			Math.min(
				minTabLength + ((maxTabLength - minTabLength) * 1) / ratio,
				maxTabLength
			),
		[ratio, minTabLength, maxTabLength]
	);

	const color = useMemo(
		() =>
			getGradientColor(
				['#3c8a1f', '#50b011', '#dfd73b', '#e39d42', '#d55940'].reverse(),
				ratio,
				min.ratio,
				max.ratio
			),
		[ratio, min.ratio, max.ratio]
	);

	const transition = {
		type: 'spring',
		stiffness: 100,
		damping: 10,
	};

	const handleMouseEnter = useCallback(() => setHovered(true), []);
	const handleMouseLeave = useCallback(() => setHovered(false), []);

	return (
		<motion.div
			onClick={onClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
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
		</motion.div>
	);
};

export default Balancer;

import { FC } from 'react';
import { motion } from 'framer-motion';

export interface BalancerProps {
	/**
	 * Width of the Balancer's container
	 */
	width: number;
	/*
	 * How much supply was available for this Balancer?
	 */
	supply: number;
	/**
	 * How much demand was there for this Balancer?
	 */
	demand: number;
	/**
	 * How many events were took place in this Balancer?
	 */
	events: number;
	/**
	 * The maximum number of events in any Balancer in the matrix
	 */
	maxEvents: number;
	/**
	 * Whether to show the stem or not
	 */
	showStem?: boolean;
	/**
	 * Thickness of the Balancer
	 */
	thk: number;
	/**
	 * Function to call when the Balancer is clicked
	 */
	onClick?: () => void;
}

const toDegrees = (radians: number) => {
	return (radians * 180) / Math.PI;
};

export const getStemHeight = (
	events: number,
	maxEvents: number,
	width: number
) => {
	// return 0;
	return (((events / maxEvents) * width) / 2) * 1.25;
};

const Balancer: FC<BalancerProps> = ({
	width,
	supply: supplyInput,
	demand: demandInput,
	events,
	maxEvents,
	showStem = true,
	thk,
	onClick,
}) => {
	const stroke = 2;

	const stemHeight = getStemHeight(events, maxEvents, width);
	const max = Math.max(Math.round(supplyInput), Math.round(demandInput));
	const min = Math.round(max / 10);
	const supply = Math.max(min, Math.round(supplyInput));
	const demand = Math.max(min, Math.round(demandInput));

	const supplyRatio = supply / (supply + demand);
	const demandRatio = demand / (supply + demand);
	const supplyWidth = (width / 2) * supplyRatio * 1.125;
	const demandWidth = (width / 2) * demandRatio * 1.125;

	const getAngle = () => {
		if (events === 0) return 0;
		else if (supply === demand) return 0;
		else if (supply > demand) {
			if (stemHeight >= supplyWidth) return -90;
			else {
				const angle = Math.asin(stemHeight / supplyWidth);
				return -toDegrees(angle);
			}
		} else {
			if (stemHeight >= demandWidth) return 90;
			else {
				const angle = Math.asin(stemHeight / demandWidth);
				return toDegrees(angle);
			}
		}
	};

	const angle = getAngle();

	return (
		<motion.div
			style={{
				position: 'relative',
				height: `${width}px`,
				width: `${width}px`,
				zIndex: 4,
			}}
		>
			<motion.div
				style={{
					position: 'absolute',
					left: `calc(50% + ${stroke}px)`,
					zIndex: 10,
					bottom: 0,
					perspective: '1000px',
				}}
				animate={{
					bottom: Math.max(stemHeight, thk / 2),
				}}
				transition={{ duration: 1, ease: 'easeInOut' }}
			>
				{/* Handle */}
				{/* <motion.div
					style={{
						position: 'absolute',
						height: `${thk * 1.5}px`,
						width: `${thk * 1.5}px`,
						borderRadius: '50%',
						border: `${stroke}px solid black`,
						left: `${-thk * 0.75 - stroke}px`,
						top: `${-thk * 0.75 - stroke}px`,
						zIndex: 5,
					}}
					animate={{
						background: getColorAlongGradient(
							0,
							1,
							supplyRatio,
							['#2D7D41', '#3BA556', '#D5D052', '#E43B3B'].reverse()
						),
					}}
					transition={{ duration: 1, ease: 'easeInOut' }}
				/> */}
				<motion.div
					style={{
						position: 'relative',
						height: '0px',
						width: '0px',
					}}
					animate={{
						rotate: angle,
					}}
					transition={{ duration: 1, ease: 'easeInOut' }}
				>
					<motion.div
						onClick={onClick}
						style={{
							width: `${supplyWidth + demandWidth - 2 * stroke}px`,
							height: `${thk - 2 * stroke}px`,
							position: 'absolute',
							top: `-${thk / 2}px`,
							// borderRadius: `${thk / 2}px`,
							overflow: 'hidden',
							border: `${stroke}px solid black`,
						}}
						animate={{
							left: `${-supplyWidth}px`,
							background:
								demand > supply
									? getColorAlongGradient(
											0,
											1,
											supplyRatio,
											['#D5D052', '#DD8647', '#E43B3B'].reverse()
									  )
									: 'rgb(255, 255, 255)',
						}}
						transition={{ duration: 1, ease: 'easeInOut' }}
					>
						{/* Supply */}
						<motion.div
							style={{
								height: '100%',
							}}
							animate={{
								width: `${supplyWidth}px`,
								background:
									supply > demand
										? getColorAlongGradient(
												0,
												1,
												supplyRatio,
												['#2D7D41', '#3BA556', '#D5D052', '#D5D052'].reverse()
										  )
										: 'rgb(255, 255, 255)',
							}}
							transition={{ duration: 1, ease: 'easeInOut' }}
						/>
					</motion.div>
				</motion.div>
			</motion.div>
			{/* Stem */}
			<motion.div
				style={{
					width: `${thk}px`,
					background: `rgb(50, 50, 50)`,
					position: 'absolute',
					left: `${width / 2 - (thk - 2 * stroke) / 2}px`,
					bottom: 0,
					// borderTopLeftRadius: `${thk / 2}px`,
					// borderTopRightRadius: `${thk / 2}px`,
				}}
				animate={{
					height: showStem ? `${stemHeight}px` : '0px',
					opacity: showStem ? 1 : 0,
				}}
				transition={{ duration: 1, ease: 'easeInOut' }}
			></motion.div>
		</motion.div>
	);
};

export default Balancer;

const getColorAlongGradient = (
	min: number,
	max: number,
	value: number,
	colors: string[]
): string => {
	// Ensure value is within range
	const clampedValue = Math.max(min, Math.min(value, max));

	// Normalize the value between 0 and 1
	const normalizedValue = (clampedValue - min) / (max - min);

	// Calculate index in the color stops array
	const stops = colors.length - 1;
	const stopIndex = Math.floor(normalizedValue * stops);
	const nextStopIndex = Math.min(stopIndex + 1, stops);

	const percentage = normalizedValue * stops - stopIndex;

	// Interpolate between the two nearest colors
	const interpolateColor = (color1: string, color2: string, factor: number) => {
		const hexToRgb = (hex: string) => {
			const bigint = parseInt(hex.slice(1), 16);
			return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
		};

		const rgbToHex = (rgb: number[]) => {
			return `#${rgb.map((x) => x.toString(16).padStart(2, '0')).join('')}`;
		};

		const rgb1 = hexToRgb(color1);
		const rgb2 = hexToRgb(color2);

		const interpolatedRgb = rgb1.map((c, i) =>
			Math.round(c + (rgb2[i] - c) * factor)
		);

		return rgbToHex(interpolatedRgb);
	};

	return interpolateColor(colors[stopIndex], colors[nextStopIndex], percentage);
};

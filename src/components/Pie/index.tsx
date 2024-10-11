/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import VisPie, { ProvidedProps, PieArcDatum } from '@visx/shape/lib/shapes/Pie';
import { Group } from '@visx/group';
import { animated, useTransition, interpolate } from '@react-spring/web';

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };

export type PieProps<T> = {
	data: T[];
	getKey: (d: T) => string;
	getValue: (d: T) => number;
	getColor?: (d: T) => string;
	width: number;
	height: number;
	margin?: typeof defaultMargin;
	animate?: boolean;
};

const Pie = <T,>({
	width,
	height,
	margin = defaultMargin,
	animate = true,
	data,
	getKey,
	getValue,
	getColor = () => 'grey',
}: PieProps<T>) => {
	if (width < 10) return null;

	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;
	const radius = Math.min(innerWidth, innerHeight) / 2;
	const centerY = innerHeight / 2;
	const centerX = innerWidth / 2;
	const donutThickness = 50;

	return (
		<svg width={width} height={height}>
			<Group top={centerY + margin.top} left={centerX + margin.left}>
				<VisPie
					data={data}
					pieValue={getValue}
					outerRadius={radius}
					innerRadius={radius - donutThickness}
					cornerRadius={3}
					padAngle={0.005}
				>
					{(pie) => (
						<AnimatedPie<T>
							{...pie}
							animate={animate}
							getKey={(arc) => getKey(arc.data)}
							onClickDatum={(e) => {
								console.log(e);
							}}
							getColor={(arc) => getColor(arc.data)}
						/>
					)}
				</VisPie>
			</Group>
		</svg>
	);
};

export default Pie;

// react-spring transition definitions
type AnimatedStyles = { startAngle: number; endAngle: number; opacity: number };

const fromLeaveTransition = ({ endAngle }: PieArcDatum<any>) => ({
	// enter from 360° if end angle is > 180°
	startAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
	endAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
	opacity: 0,
});
const enterUpdateTransition = ({ startAngle, endAngle }: PieArcDatum<any>) => ({
	startAngle,
	endAngle,
	opacity: 1,
});

type AnimatedPieProps<Datum> = ProvidedProps<Datum> & {
	animate?: boolean;
	getKey: (d: PieArcDatum<Datum>) => string;
	getColor: (d: PieArcDatum<Datum>) => string;
	onClickDatum: (d: PieArcDatum<Datum>) => void;
	delay?: number;
};

function AnimatedPie<Datum>({
	animate,
	arcs,
	path,
	getKey,
	getColor,
	onClickDatum,
}: AnimatedPieProps<Datum>) {
	const transitions = useTransition<PieArcDatum<Datum>, AnimatedStyles>(arcs, {
		from: animate ? fromLeaveTransition : enterUpdateTransition,
		enter: enterUpdateTransition,
		update: enterUpdateTransition,
		leave: animate ? fromLeaveTransition : enterUpdateTransition,
		keys: getKey,
	});
	return transitions((props, arc, { key }) => {
		const [centroidX, centroidY] = path.centroid(arc);
		const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;

		return (
			<g key={key}>
				<animated.path
					// compute interpolated path d attribute from intermediate angle values
					d={interpolate(
						[props.startAngle, props.endAngle],
						(startAngle, endAngle) =>
							path({
								...arc,
								startAngle,
								endAngle,
							})
					)}
					fill={getColor(arc)}
					onClick={() => onClickDatum(arc)}
					onTouchStart={() => onClickDatum(arc)}
				/>
				{hasSpaceForLabel && (
					<animated.g style={{ opacity: props.opacity }}>
						<text
							fill="white"
							x={centroidX}
							y={centroidY}
							dy=".33em"
							fontSize={9}
							textAnchor="middle"
							pointerEvents="none"
						>
							{getKey(arc)}
						</text>
					</animated.g>
				)}
			</g>
		);
	});
}

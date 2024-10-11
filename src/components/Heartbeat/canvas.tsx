import P5 from 'p5';
import React, { FC, useEffect, useMemo, useRef } from 'react';
import { HeartbeatRenderer } from './renderer';
import { Event } from '@data/events/Event';

interface HeartbeatCanvasProps {
	width: number;
	supply: number;
	demand: number;
	events: Event[];
	maxEvents: number;
}

const HeartbeatCanvas: FC<HeartbeatCanvasProps> = ({ width }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const heartbeatRenderer = useRef<HeartbeatRenderer>();

	const p5Canvas = useMemo(() => {
		return new P5((p5: P5) => {
			p5.setup = () => {
				p5.background(0);
			};
			p5.draw = () => {
				p5.background(255);
				p5.fill(255);
				p5.ellipse(p5.width / 2, p5.height / 2, 50, 50);
				// draw occurs for each frame
			};
		}, canvasRef.current as HTMLCanvasElement);
	}, [canvasRef]);

	useEffect(() => {
		if (!p5Canvas) {
			return;
		}
		if (heartbeatRenderer.current) {
			// heartbeatRenderer.current.width = width;
		} else {
			// heartbeatRenderer.current = new HeartbeatRenderer(p5Canvas, width, width);
		}
	}, [p5Canvas]);

	return <canvas ref={canvasRef} width={width} height={width} />;
};

export default HeartbeatCanvas;

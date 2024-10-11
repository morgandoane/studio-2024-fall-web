import { BalancerProps } from '@components/Balancer';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import P5 from 'p5';
import { MultiBeatCanvas } from './multiBeatCanvas';

interface CanvasRowProps {
	balancers: Omit<BalancerProps, 'width' | 'maxEvents' | 'thk'>[];
	maxEvents: number;
}

const CanvasRow: FC<CanvasRowProps> = ({ balancers, maxEvents }) => {
	const [container, setContainer] = useState<HTMLDivElement | null>(null);
	const multiBeatCanvasRef = useRef<MultiBeatCanvas | null>(null);

	const gotContainer = useCallback((element: HTMLDivElement) => {
		if (!element) {
			return;
		}
		setContainer(element);
	}, []);

	useEffect(() => {
		if (!container) {
			return;
		}
		const maxSupply = Math.max(...balancers.map((b) => b.supply));
		const maxDemand = Math.max(...balancers.map((b) => b.demand));
		const normalizedSupply = balancers.map((b) => b.supply / maxSupply);
		const normalizedDemand = balancers.map((b) => b.demand / maxDemand);
		const canvas = new P5((p5: P5) => {
			const width = container.clientWidth;
			const height = width / 12;
			const multiBeatCanvas = new MultiBeatCanvas(p5, width, height, balancers);
			multiBeatCanvasRef.current = multiBeatCanvas;
			const setup = () => {
				p5.createCanvas(width, height);
			};
			p5.setup = () => {
				setup();
			};
			p5.draw = () => {
				multiBeatCanvas.render();
			};
		}, container);
		return () => {
			canvas.remove();
		};
	}, [container]);

	useEffect(() => {
		multiBeatCanvasRef.current?.setData(balancers);
	}, [balancers]);

	return (
		<div
			ref={gotContainer}
			style={{
				width: '100%',
				height: 100,
			}}
		></div>
	);
};

export default CanvasRow;

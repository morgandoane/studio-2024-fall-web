import { BalancerProps } from '@components/Balancer';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import P5 from 'p5';
import { MultiBeatCanvas } from './multiBeatCanvas';

interface CanvasRowProps {
	year: number;
	balancers: Omit<BalancerProps, 'width' | 'maxEvents' | 'thk'>[];
	maxEvents: number;
	onClick: (month: number) => void;
}

const CanvasRow: FC<CanvasRowProps> = ({ year, balancers, onClick }) => {
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
			onClick={(e) => {
				// index is 0-11, relative to the size of the div
				const index = Math.floor((e.clientX / container!.clientWidth) * 12);
				onClick(index + 1);
			}}
			style={{
				width: '100%',
				height: 100,
				position: 'relative',
			}}
		>
			<div className="absolute top-1/2 left-0">
				<p className="text-body-small text-gray-400">{year}</p>
			</div>
		</div>
	);
};

export default CanvasRow;

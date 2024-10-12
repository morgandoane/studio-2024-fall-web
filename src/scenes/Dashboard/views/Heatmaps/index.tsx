import { FC, useState } from 'react';
import { Event } from '@data/events/Event';
import { Demand } from '@data/demand/Demand';
import { Supply } from '@data/supply/Supply';
import Heatmap from '@components/Heatmap';

export interface HeatmapsProps {
	data: {
		supply: Supply[];
		demand: Demand[];
		events: Event[];
	};
}

const Heatmaps: FC<HeatmapsProps> = ({ data: { supply, demand, events } }) => {
	const size = 320;
	const exponent = 1;

	const [focused, setFocused] = useState<{
		row: number | null;
		col: number | null;
	}>({
		row: null,
		col: null,
	});

	const labels = {
		row: (index: number) => (2006 + index).toString(),
		col: (index: number) =>
			[
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'May',
				'Jun',
				'Jul',
				'Aug',
				'Sep',
				'Oct',
				'Nov',
				'Dec',
			][index],
	};

	return (
		<div className="flex gap-16 p-12">
			<div>
				<p className="text-heading-3">Blood Supply</p>
				<div className="h-4" />
				<Heatmap
					columns={12}
					onHover={(row, col) => setFocused({ row, col })}
					hovered={focused}
					data={supply}
					color="#009688"
					width={size}
					accessor={(d) => ({
						x: d.month - 1,
						y: d.year,
						value: d.total_unit,
					})}
					opacityExponent={exponent}
					labels={labels}
				/>
			</div>
			<div>
				<p className="text-heading-3">Blood Demand</p>
				<div className="h-4" />
				<Heatmap
					columns={12}
					onHover={(row, col) => setFocused({ row, col })}
					hovered={focused}
					data={demand}
					color="#FF6F61"
					width={size}
					accessor={(d) => ({
						x: d.month - 1,
						y: d.year,
						value: d.unit,
					})}
					opacityExponent={exponent}
					labels={labels}
				/>
			</div>
			<div>
				<p className="text-heading-3">Red Cross Events</p>
				<div className="h-4" />
				<Heatmap
					columns={12}
					onHover={(row, col) => setFocused({ row, col })}
					hovered={focused}
					data={events}
					color="#FFC107"
					width={size}
					accessor={(d) => ({
						x: d.month - 1,
						y: d.year,
						value: 1,
					})}
					opacityExponent={exponent}
					labels={labels}
				/>
			</div>
		</div>
	);
};

export default Heatmaps;

import { Demand } from '@data/demand/Demand';
import { capFirst } from '@utils/capFirst';
import { FC } from 'react';
import { JSONTree } from 'react-json-tree';

export interface DemandDetailProps {
	demand: Demand[];
}

const DemandDetail: FC<DemandDetailProps> = ({ demand }) => {
	const surgeryUnitTotals = demand.reduce<{
		[surgeryName: string]: { units: number; count: number };
	}>((acc, d) => {
		for (const key of Object.keys(d)) {
			if (key.includes(' unit')) {
				const surgeryName = key.split(' unit')[0];

				if (!acc[surgeryName]) {
					acc[surgeryName] = { units: 0, count: 0 };
				}

				acc[surgeryName].units += (d as any)[key];
			} else if (key.includes(' patients')) {
				const surgeryName = key.split(' patients')[0];

				if (!acc[surgeryName]) {
					acc[surgeryName] = { units: 0, count: 0 };
				}

				acc[surgeryName].count += (d as any)[key];
			}
		}

		return acc;
	}, {});

	const topSurgeriesByUnit = Object.entries(surgeryUnitTotals)
		.sort((a, b) => b[1].units - a[1].units)
		.slice(0, 5);

	const topSurgeriesByCount = Object.entries(surgeryUnitTotals)
		.sort((a, b) => b[1].count - a[1].count)
		.slice(0, 5);

	return (
		<div className="flex flex-col gap-4">
			<div>
				<p className="text-heading-6 pb-2">Top 5 Surgeries by blood demand:</p>
				<ul>
					{topSurgeriesByUnit.map(([key, value]) => (
						<li key={key} className="text-body-medium">
							{key.split(' ').map(capFirst).join(' ')} (
							{parseInt(value.units.toFixed(0)).toLocaleString()} units){' '}
						</li>
					))}
				</ul>
			</div>
			<div>
				<p className="text-heading-6 pb-2">Top 5 Surgeries by patient count:</p>
				<ul>
					{topSurgeriesByCount.map(([key, value]) => (
						<li key={key} className="text-body-medium">
							{key.split(' ').map(capFirst).join(' ')} (
							{Math.round(value.count).toLocaleString()} patients){' '}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default DemandDetail;

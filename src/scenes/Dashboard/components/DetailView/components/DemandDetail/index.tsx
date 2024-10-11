import { Demand } from '@data/demand/Demand';
import { FC } from 'react';

export interface DemandDetailProps {
	demand: Demand[];
	year: number;
	city: string | null;
}

const DemandDetail: FC<DemandDetailProps> = ({ demand, year, city }) => {
	const surgeryTotal = demand.reduce((acc, curr) => acc + curr.patients, 0);
	return (
		<div>
			<p className="text-heading-5">
				{`In ${year}, there were ${surgeryTotal.toLocaleString()} surgeries performed ${
					city ? `in ${city}` : 'across South Korea'
				}.`}
			</p>
		</div>
	);
};

export default DemandDetail;

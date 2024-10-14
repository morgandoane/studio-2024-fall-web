import { months } from '@utils/months';
import { FC } from 'react';

export interface HeadlineProps {
	year: number;
	month: number;
	city: string | null;
	supply: number;
	demand: number;
}

const Headline: FC<HeadlineProps> = ({ supply, demand, city, year, month }) => {
	const mode = supply > demand ? 'surplus' : 'shortage';

	const monthName = months[month - 1].long;

	return (
		<p className="text-heading-5">
			Blood {mode === 'surplus' ? 'supply' : 'demand'} in{' '}
			{city ?? 'South Korea'} exceeded{' '}
			{mode === 'surplus' ? 'demand' : 'supply'} by{' '}
			<em className={mode === 'surplus' ? 'text-green-500' : 'text-red-500'}>
				{mode === 'surplus'
					? (((supply - demand) / demand) * 100).toFixed(1)
					: (((demand - supply) / supply) * 100).toFixed(1)}
				%
			</em>
		</p>
	);
};

export default Headline;

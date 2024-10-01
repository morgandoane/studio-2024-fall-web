import { useData } from '../useData';
import { Population } from './Population';

export const usePopulation = () => {
	const res = useData<Population[]>([
		{
			$match: { type: 'city_donation_rates' },
		},
		{
			$project: {
				_id: false,
				year: true,
				city: '$payload.city',
				population: '$payload.population',
				donations: '$payload.donations',
			},
		},
	]);

	return res;
};

import { useData } from '../useData';
import { Demand } from './Demand';

export const useDemand = () => {
	const res = useData<Demand[]>([
		{
			$match: {
				type: 'demand',
			},
		},
		{
			$group: {
				_id: {
					year: '$year',
					month: '$month',
				},
				units: {
					$sum: '$payload.units',
				},
			},
		},
		{
			$group: {
				_id: '$_id.year',
				total: {
					$sum: '$units',
				},
				months: {
					$push: {
						month: '$_id.month',
						units: '$units',
					},
				},
			},
		},
		{
			$project: {
				_id: false,
				year: '$_id',
				total: true,
				months: true,
			},
		},
	]);

	return res;
};

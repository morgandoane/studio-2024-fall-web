import { useData } from '../useData';
import { Supply } from './Supply';

export const useSupply = () => {
	const res = useData<Supply[]>([
		{
			$match: {
				type: 'transfusion_supply',
				year: {
					$gte: 2006,
				},
			},
		},
		{
			$group: {
				_id: {
					year: '$year',
					month: '$month',
				},
				red_blood_cells: {
					$avg: '$payload.red_blood_cells',
				},
				platelet: {
					$avg: '$payload.platelet',
				},
				fresh_frozen_plasma: {
					$avg: '$payload.fresh_frozen_plasma',
				},
				leukocyte_filtered_apheresis_platelets: {
					$avg: '$payload.leukocyte_filtered_apheresis_platelets',
				},
			},
		},
		{
			$group: {
				_id: '$_id.year',
				red_blood_cells_avg: {
					$avg: '$red_blood_cells',
				},
				platelet_avg: {
					$avg: '$platelet',
				},
				fresh_frozen_plasma_avg: {
					$avg: '$fresh_frozen_plasma',
				},
				leukocyte_filtered_apheresis_platelets_avg: {
					$avg: '$leukocyte_filtered_apheresis_platelets',
				},
				months: {
					$push: {
						month: '$_id.month',
						red_blood_cells_avg: '$red_blood_cells',
						platelet_avg: '$platelet',
						fresh_frozen_plasma_avg: '$fresh_frozen_plasma',
						leukocyte_filtered_apheresis_platelets_avg:
							'$leukocyte_filtered_apheresis_platelets',
					},
				},
			},
		},
		{
			$project: {
				_id: false,
				year: '$_id',
				red_blood_cells_avg: true,
				platelet_avg: true,
				fresh_frozen_plasma_avg: true,
				leukocyte_filtered_apheresis_platelets_avg: true,
				months: true,
			},
		},
	]);

	return res;
};

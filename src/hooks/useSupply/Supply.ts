export class Supply {
	year!: number;
	red_blood_cells_avg!: number;
	platelet_avg!: number;
	fresh_frozen_plasma_avg!: number;
	leukocyte_filtered_apheresis_platelets_avg!: number;
	months!: {
		month: number;
		red_blood_cells_avg: number;
		platelet_avg: number;
		fresh_frozen_plasma_avg: number;
		leukocyte_filtered_apheresis_platelets_avg: number;
	}[];
}

import { Month } from '../data/Datapoint';

export interface PolicyFilter {
	start: { month: Month; year: number } | null;
	end: { month: Month; year: number } | null;
	region: string | null;
}

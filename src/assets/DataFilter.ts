import { Gender, Month } from './Datapoint';

export interface Datafilter {
	start: { month: Month; year: number } | null;
	end: { month: Month; year: number } | null;
	gender: Gender;
	source: string | null;
}

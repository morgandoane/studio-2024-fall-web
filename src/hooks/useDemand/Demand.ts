export class Demand {
	year!: number;
	total!: number;
	months!: {
		month: number;
		units: number;
	}[];
}

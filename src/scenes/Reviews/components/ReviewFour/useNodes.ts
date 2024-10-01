import { Demand } from '../../../../hooks/useDemand/Demand';
import { Population } from '../../../../hooks/usePopulation/Population';
import { Supply } from '../../../../hooks/useSupply/Supply';

export interface Node {
	year: number;
	month: number;
	city: string;
	population: Omit<Population, 'year' | 'city'> | null;
	supply: Omit<Supply['months'][number], 'month'> | null;
	demand: number | null;
}

const getNodePopulation = (
	year: number,
	month: number,
	city: string,
	populationData: Population[]
): Node['population'] => {
	const cityData = populationData.find(
		(p) => p.city === city && p.year === year
	);

	if (!cityData) {
		console.error(`No population data for ${city} in ${year}`);
		return null;
	} else {
		return {
			population: cityData.population,
			donations: cityData.donations,
		};
	}
};

const getNodeSupply = (
	year: number,
	month: number,
	city: string,
	supplyData: Supply[],
	populationData: Population[]
): Node['supply'] => {
	const yearPopulation = populationData.filter((p) => p.year === year);

	const totalPopulation = yearPopulation.reduce(
		(acc, p) => acc + p.population,
		0
	);

	const cityPopulation = yearPopulation.find((p) => p.city === city);

	if (!cityPopulation) {
		console.error(`No population data for ${city} in ${year}`);
		return null;
	}

	if (!yearPopulation) {
		console.error(`No population data for ${year}`);
		return null;
	}

	const yearData = supplyData.find((p) => p.year === year);

	if (!yearData) {
		console.error(`No supply data for ${year}`);
		return null;
	}

	const monthData = yearData.months.find((p) => p.month === month);

	if (!monthData) {
		console.error(`No supply data for ${year} month ${month}`);
		return null;
	}

	return {
		red_blood_cells_avg: Math.round(
			monthData.red_blood_cells_avg *
				(cityPopulation.population / totalPopulation)
		),
		platelet_avg: Math.round(
			monthData.platelet_avg * (cityPopulation.population / totalPopulation)
		),
		fresh_frozen_plasma_avg: Math.round(
			monthData.fresh_frozen_plasma_avg *
				(cityPopulation.population / totalPopulation)
		),
		leukocyte_filtered_apheresis_platelets_avg: Math.round(
			monthData.leukocyte_filtered_apheresis_platelets_avg *
				(cityPopulation.population / totalPopulation)
		),
	};
};

const getNodeDemand = (
	year: number,
	month: number,
	city: string,
	demandData: Demand[],
	populationData: Population[]
): Node['demand'] => {
	// Our demand data is scoped to a year and month
	// It therefore needs to be normalized to the cities, with their population share as a guide
	// It also need to handle missing data, using the last and next available data as a guide

	const yearPopulation = populationData.filter((p) => p.year === year);

	const cityPopulation = yearPopulation.find((p) => p.city === city);

	if (!cityPopulation) {
		console.error(`No population data for ${city} in ${year}`);
		return null;
	}

	const yearData = demandData.find((p) => p.year === year);

	const totalPopulation = yearPopulation.reduce(
		(acc, p) => acc + p.population,
		0
	);

	if (!yearData) {
		console.error(`No demand data for ${year}`);
		return null;
	}

	const monthData = yearData.months.find((p) => p.month === month);

	if (!monthData) {
		console.error(`No demand data for ${year} month ${month}`);
		return null;
	}

	return Math.round(
		monthData.units * (cityPopulation.population / totalPopulation)
	);
};

export const useNodes = (
	supply: Supply[],
	demand: Demand[],
	population: Population[]
): Node[] => {
	const res: Node[] = [];

	const years = [
		...new Set([...supply.map((p) => p.year), ...demand.map((p) => p.year)]),
	];
	const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
	const cities = [...new Set(population.map((p) => p.city))];

	for (const year of years) {
		for (const month of months) {
			for (const city of cities) {
				const node: Node = {
					year,
					month,
					city,
					supply: getNodeSupply(year, month, city, supply, population),
					population: getNodePopulation(year, month, city, population),
					demand: getNodeDemand(year, month, city, demand, population),
				};

				res.push(node);
			}
		}
	}

	return res;
};

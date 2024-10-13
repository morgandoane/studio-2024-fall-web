import { useDemand } from './demand/useDemand';
import { useEvents } from './events/useEvents';
import { useSupply } from './supply/useSupply';
export interface Filter {
	month: number | null;
	year: number | null;
	city: string | null;
}

const useData = (filter: Filter) => {
	const minYear = 2006;
	const maxYear = 2022;

	const { data: supply, loading: supplyLoading } = useSupply((s) => {
		const month = filter.month ? s.month === filter.month : true;
		const year = filter.year ? s.year === filter.year : true;
		const city = filter.city ? s.city === filter.city : true;

		return month && year && city && s.year >= minYear && s.year <= maxYear;
	});

	const { data: demand, loading: demandLoading } = useDemand((d) => {
		const month = filter.month ? d.month === filter.month : true;
		const year = filter.year ? d.year === filter.year : true;
		const city = filter.city ? d.city === filter.city : true;

		return month && year && city && d.year >= minYear && d.year <= maxYear;
	});

	const { data: events, loading: eventsLoading } = useEvents((e) => {
		const month = filter.month ? e.month === filter.month : true;
		const year = filter.year ? e.year === filter.year : true;
		const city = filter.city ? e.city === filter.city || !e.city : true;

		return month && year && city && e.year >= minYear && e.year <= maxYear;
	});

	const loading = supplyLoading || demandLoading || eventsLoading;
	const data = { supply, demand, events };

	return { data, loading };
};

export { useData };

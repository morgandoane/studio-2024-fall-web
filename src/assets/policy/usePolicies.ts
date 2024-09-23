import { useState, useEffect, useRef } from 'react';
import { Policy } from './Policy';
import { PolicyFilter } from './PolicyFilter';

export const usePolicies = (filter: PolicyFilter) => {
	const [data, setData] = useState<Policy[]>([]);
	const datasetRef = useRef<Policy[] | null>(null); // Cache dataset in memory

	useEffect(() => {
		const loadDataset = async () => {
			if (!datasetRef.current) {
				// Load dataset only once
				const dataset = (await import('./policies.json')).default as Policy[];
				datasetRef.current = dataset;
			}
			const filtered = datasetRef.current.filter((d) => {
				// Apply filtering based on start and end date (if provided)
				const withinDateRange =
					(!filter.start ||
						d.affective_year > filter.start.year ||
						(d.affective_year === filter.start.year &&
							d.affective_month >= filter.start.month)) &&
					(!filter.end ||
						d.affective_year < filter.end.year ||
						(d.affective_year === filter.end.year &&
							d.affective_month <= filter.end.month));

				// Apply filtering based on source (if provided)
				const matchesSource = !filter.region || d.region === filter.region;

				// Return true only if all filter criteria are met
				return withinDateRange && matchesSource;
			});

			setData(filtered);
		};

		loadDataset();
	}, [filter]);

	return data;
};

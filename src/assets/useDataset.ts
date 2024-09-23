import { useState, useEffect, useRef } from 'react';
import { Datapoint } from './Datapoint';
import { Datafilter } from './DataFilter';

export const useDataset = (filter: Datafilter) => {
	const [data, setData] = useState<Datapoint[]>([]);
	const datasetRef = useRef<Datapoint[] | null>(null); // Cache dataset in memory

	useEffect(() => {
		const loadDataset = async () => {
			if (!datasetRef.current) {
				// Load dataset only once
				const dataset = (await import('./dataset.json')).default as Datapoint[];
				datasetRef.current = dataset;
			}
			const filtered = datasetRef.current.filter((d) => {
				// Apply filtering based on start and end date (if provided)
				const withinDateRange =
					(!filter.start ||
						d.year > filter.start.year ||
						(d.year === filter.start.year && d.month >= filter.start.month)) &&
					(!filter.end ||
						d.year < filter.end.year ||
						(d.year === filter.end.year && d.month <= filter.end.month));

				// Apply filtering based on gender (if provided)
				const matchesGender =
					filter.gender === 'Combined' || d.gender === filter.gender;

				// Apply filtering based on source (if provided)
				const matchesSource = !filter.source || d.source === filter.source;

				// Return true only if all filter criteria are met
				return withinDateRange && matchesGender && matchesSource;
			});

			setData(filtered);
		};

		loadDataset();
	}, [filter]);

	return data;
};

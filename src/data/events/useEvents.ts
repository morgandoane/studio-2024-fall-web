import { useEffect, useRef, useState } from 'react';
import { Event } from './Event';

export const useEvents = (filter?: (event: Event) => boolean) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<Event[]>([]);
	const datasetRef = useRef<Event[] | null>(null);

	useEffect(() => {
		const loadDataset = async () => {
			try {
				if (!datasetRef.current) {
					const dataset = (await import('./events.json')).default as Event[];
					datasetRef.current = dataset;
				}

				const filtered = datasetRef.current?.filter((d: Event) =>
					filter ? filter(d) : true
				);
				setData(filtered || []);
			} catch (error) {
				console.error('Failed to load dataset:', error);
			} finally {
				setLoading(false);
			}
		};

		loadDataset();
	}, [filter]);

	return { data, loading };
};

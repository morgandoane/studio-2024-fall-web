import { useEffect, useRef, useState } from 'react';
import { Demand } from './Demand';

export const useDemand = (filter?: (demand: Demand) => boolean) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<Demand[]>([]);
	const datasetRef = useRef<Demand[] | null>(null);

	useEffect(() => {
		const loadDataset = async () => {
			try {
				if (!datasetRef.current) {
					const dataset = (await import('./demand.json')).default as Demand[];
					datasetRef.current = dataset;
				}

				const filtered = datasetRef.current?.filter((d: Demand) =>
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

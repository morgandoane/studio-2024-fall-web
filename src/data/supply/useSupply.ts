import { useEffect, useRef, useState } from 'react';
import { Supply } from './Supply';

export const useSupply = (filter?: (supply: Supply) => boolean) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<Supply[]>([]);
	const datasetRef = useRef<Supply[] | null>(null);

	useEffect(() => {
		const loadDataset = async () => {
			try {
				if (!datasetRef.current) {
					const dataset = (await import('./supply.json')).default as Supply[];
					datasetRef.current = dataset;
				}

				const filtered = datasetRef.current?.filter((d: Supply) =>
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

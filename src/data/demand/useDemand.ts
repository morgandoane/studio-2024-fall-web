import { useEffect, useState } from 'react';
import { Demand } from './Demand';

export const useDemand = (filter?: (demand: Demand) => boolean) => {
	const [data, setData] = useState<Demand[]>([]);

	const getData = async () => {
		setData((await import('./demand.json')).default as Demand[]);
	};

	useEffect(() => {
		getData();
	}, []);

	const filtered = filter ? data.filter(filter) : data;

	return { data: filtered, loading: data.length === 0 };
};

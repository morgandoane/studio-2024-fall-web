import { useEffect, useState } from 'react';
import { Supply } from './Supply';

export const useSupply = (filter?: (supply: Supply) => boolean) => {
	const [data, setData] = useState<Supply[]>([]);

	const getData = async () => {
		setData((await import('./supply.json')).default as Supply[]);
	};

	useEffect(() => {
		getData();
	}, []);

	const filtered = filter ? data.filter(filter) : data;

	return { data: filtered, loading: data.length === 0 };
};

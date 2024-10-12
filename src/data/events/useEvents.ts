import { useEffect, useState } from 'react';
import { Event } from './Event';

export const useEvents = (filter?: (event: Event) => boolean) => {
	const [data, setData] = useState<Event[]>([]);

	const getData = async () => {
		setData((await import('./events.json')).default as Event[]);
	};

	useEffect(() => {
		getData();
	}, []);

	const filtered = filter ? data.filter(filter) : data;

	return { data: filtered, loading: data.length === 0 };
};

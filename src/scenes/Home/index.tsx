import { Filter } from '@data/useData';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from './components/Header';
import Body from './components/Body';
import Filters from './components/Filters';

const Home: FC = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const filter: Filter = {
		year: searchParams.get('year') ? parseInt(searchParams.get('year')!) : null,
		month: searchParams.get('month')
			? parseInt(searchParams.get('month')!)
			: null,
		city: searchParams.get('city'),
	};

	const setFilter = (newFilter: Filter) => {
		const params = new URLSearchParams();
		if (newFilter.year) {
			params.set('year', newFilter.year.toString());
		}
		if (newFilter.month) {
			params.set('month', newFilter.month.toString());
		}
		if (newFilter.city) {
			params.set('city', newFilter.city);
		}

		setSearchParams(params);
	};

	return (
		<div className="h-screen overflow-y-auto overflow-x-hidden">
			<Header />
			<Filters filter={filter} setFilter={setFilter} />
			<Body filter={filter} setFilter={setFilter} />
		</div>
	);
};

export default Home;

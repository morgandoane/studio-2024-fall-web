import { FC } from 'react';
import YearFilter from './components/YearFilter';
import CityFilter from './components/CityFilter';
import { useSearchParams } from 'react-router-dom';

const Filters: FC = () => {
	const [searchParams, setSeacrhParams] = useSearchParams();

	return (
		<div className="flex gap-2 items-center">
			<p>Filters:</p>
			<YearFilter
				value={
					searchParams.get('year') ? parseInt(searchParams.get('year')!) : null
				}
				onChange={(value) =>
					setSeacrhParams({
						...searchParams,
						year: value ? value.toString() : '',
					})
				}
			/>
			<CityFilter
				value={searchParams.get('city')}
				onChange={(value) =>
					setSeacrhParams({
						...searchParams,
						city: value ? value : '',
					})
				}
			/>
		</div>
	);
};

export default Filters;

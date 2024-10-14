import { Filter, useData } from '@data/useData';
import { FC } from 'react';

export interface NavigatorProps {
	filter: Filter;
	setFilter: (newFilter: Filter) => void;
}

const Navigator: FC<NavigatorProps> = ({ filter, setFilter }) => {
	// This is ALL the data
	const { loading: allDataLoading, data: allData } = useData({
		year: null,
		month: null,
		city: null,
	});

	// This is the FILTERED data
	const { loading: filteredDataLoading, data: filteredData } = useData(filter);

	// call setFilter to change the data in the Matrix and Detail

	return (
		<div className="sticky top-0 h-full border-r border-gray-200">
			<div className=" p-16 h-full min-w-72 flex justify-center">
				(Navigator)
			</div>
		</div>
	);
};

export default Navigator;

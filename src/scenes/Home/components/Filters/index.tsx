import { Filter } from '@data/useData';
import { Select } from '@headlessui/react';
import cities from '@utils/cities';
import { FC } from 'react';

export interface FiltersProps {
	filter: Filter;
	setFilter: (newFilter: Filter) => void;
}

const Filters: FC<FiltersProps> = ({ filter, setFilter }) => {
	return (
		<div className="sticky top-0 bg-white z-50 flex items-center gap-2 border-b border-gray-400 py-2">
			<div className="flex justify-center flex-1">
				<div className="flex gap-2">
					<Select
						name="city"
						value={filter.city || ''}
						onChange={(e) => setFilter({ ...filter, city: e.target.value })}
					>
						<option value="">All Cities</option>
						{cities.map((city) => (
							<option key={city} value={city}>
								{city}
							</option>
						))}
					</Select>
				</div>
			</div>
		</div>
	);
};

export default Filters;

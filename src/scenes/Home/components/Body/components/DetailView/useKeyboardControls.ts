import { Filter } from '@data/useData';
import { useEffect } from 'react';

const minYear = 2006;
const maxYear = 2022;

const useKeyboardControls = (
	filter: Filter,
	setFilter: (newFilter: Filter) => void
) => {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'ArrowLeft') {
				e.preventDefault();
				e.stopPropagation();
				if (filter.month === 1) {
					if (filter.year === minYear) return;
					else setFilter({ ...filter, month: 12, year: filter.year! - 1 });
				} else {
					setFilter({ ...filter, month: filter.month! - 1 });
				}
			} else if (e.key === 'ArrowRight') {
				e.preventDefault();
				e.stopPropagation();
				if (filter.month === 12) {
					if (filter.year === maxYear) return;
					else setFilter({ ...filter, month: 1, year: filter.year! + 1 });
				} else {
					setFilter({ ...filter, month: filter.month! + 1 });
				}
			} else if (e.key === 'ArrowUp') {
				e.preventDefault();
				e.stopPropagation();
				if (filter.year === minYear) return;
				setFilter({ ...filter, year: filter.year! - 1 });
			} else if (e.key === 'ArrowDown') {
				e.preventDefault();
				e.stopPropagation();
				if (filter.year === maxYear) return;
				setFilter({ ...filter, year: filter.year! + 1 });
			} else if (e.key === 'Escape') {
				e.preventDefault();
				e.stopPropagation();
				setFilter({ month: null, year: null, city: filter.city });
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [filter]);
};

export default useKeyboardControls;

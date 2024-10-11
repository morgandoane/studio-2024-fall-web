import {
	Button,
	Popover,
	PopoverButton,
	PopoverPanel,
} from '@headlessui/react';
import { FC } from 'react';
import { XCircleIcon } from '@heroicons/react/24/solid';
import CityMap from './components/CityMap';

const cities = [
	'Busan',
	'Chungbuk',
	'Daegu/Gyeongbuk',
	'Daejeon/Chungnam',
	'Gangwon',
	'Gyeonggi',
	'Gyeongnam',
	'Incheon',
	'Jeju',
	'Jeonam',
	'Jeonbuk',
	'Jeonnam',
	'Seoul',
	'Ulsan',
];

export interface CityFilterProps {
	value: string | null;
	onChange: (value: string | null) => void;
}

const CityFilter: FC<CityFilterProps> = ({ value, onChange }) => {
	return (
		<Popover className="relative">
			{({ close }) => (
				<>
					<PopoverButton
						className={`flex gap-2 items-center rounded-full px-3 py-0.5 pr-1 ${
							value ? 'bg-red-400 text-white' : 'bg-white'
						} border`}
					>
						{value ? `City: ${value}` : 'Select a city'}
						{!value ? (
							<div />
						) : (
							<XCircleIcon
								onClick={(e) => {
									e.stopPropagation();
									onChange(null);
								}}
								className="fill-white h-6"
							/>
						)}
					</PopoverButton>
					<PopoverPanel
						anchor="top start"
						className="bg-white z-10 shadow-xl rounded-md border-slate-400 border"
					>
						<div className="flex">
							<div className="flex flex-col">
								<Button
									className="py-1 px-2 hover:bg-slate-100 justify-start"
									onClick={() => {
										onChange(null);
										close();
									}}
								>
									All Cities
								</Button>
								{cities.map((city, i) => (
									<Button
										className={
											city === value
												? 'bg-slate-100 py-1 px-2 hover:bg-slate-100 justify-start'
												: 'py-1 px-2 hover:bg-slate-100 justify-start'
										}
										key={`city-${i}`}
										onClick={() => {
											onChange(city);
											close();
										}}
									>
										{city}
									</Button>
								))}
							</div>
							<div className="flex-1">
								<CityMap value={value} onChange={onChange} />
							</div>
						</div>
					</PopoverPanel>
				</>
			)}
		</Popover>
	);
};

export default CityFilter;

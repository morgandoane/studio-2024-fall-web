import {
	Button,
	Popover,
	PopoverButton,
	PopoverPanel,
} from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { FC } from 'react';

// 2006 through 2022
const years = Array.from({ length: 17 }, (_, i) => i + 2006);

export interface YearFilterProps {
	value: number | null;
	onChange: (value: number | null) => void;
}

const YearFilter: FC<YearFilterProps> = ({ value, onChange }) => {
	return (
		<Popover className="relative">
			{({ close }) => (
				<>
					<PopoverButton
						className={`flex gap-2 items-center rounded-full px-3 py-0.5 pr-1 ${
							value ? 'bg-red-400 text-white' : 'bg-white'
						} border`}
					>
						{value ? `Year: ${value}` : 'Select a year'}
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
									All Years
								</Button>
								{years.map((year, i) => (
									<Button
										className={
											year === value
												? 'bg-slate-100 py-1 px-2 hover:bg-slate-100 justify-start'
												: 'py-1 px-2 hover:bg-slate-100 justify-start'
										}
										key={`year-${i}`}
										onClick={() => {
											onChange(year);
											close();
										}}
									>
										{year}
									</Button>
								))}
							</div>
							<div className="flex-1"></div>
						</div>
					</PopoverPanel>
				</>
			)}
		</Popover>
	);
};

export default YearFilter;

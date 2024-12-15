import Balancer, { BalancerProps } from '@components/Balancer';
import { FC, useState } from 'react';

const Control: FC<{
	value: number;
	min: number;
	max: number;
	onChange: (value: number) => void;
	label: string;
}> = ({ value, min, max, onChange, label }) => {
	return (
		<div>
			<p>
				{label} ({value})
			</p>
			<input
				type="range"
				min={min}
				max={max}
				value={value}
				onChange={(e) => onChange(Number(e.target.value))}
			/>
		</div>
	);
};

const Testing: FC = () => {
	const [state, setState] = useState<BalancerProps>({
		width: 200,
		supply: 100,
		demand: 100,
		events: 6,
		maxEvents: 10,
		thk: 12,
	});

	return (
		<div
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				alignItems: 'center',
				justifyContent: 'center',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<div
				style={{
					display: 'flex',
				}}
			>
				<Balancer {...state} />
			</div>
			<div>
				<Control
					label="Width"
					value={state.width}
					min={100}
					max={500}
					onChange={(width) => setState({ ...state, width })}
				/>
				<Control
					label="Supply"
					value={state.supply}
					min={0}
					max={200}
					onChange={(supply) => setState({ ...state, supply })}
				/>
				<Control
					label="Demand"
					value={state.demand}
					min={0}
					max={200}
					onChange={(demand) => setState({ ...state, demand })}
				/>
				<Control
					label="Events"
					value={state.events}
					min={0}
					max={state.maxEvents}
					onChange={(events) => setState({ ...state, events })}
				/>
				<Control
					label="Max Events"
					value={state.maxEvents}
					min={0}
					max={100}
					onChange={(maxEvents) => setState({ ...state, maxEvents })}
				/>
			</div>
		</div>
	);
};

export default Testing;

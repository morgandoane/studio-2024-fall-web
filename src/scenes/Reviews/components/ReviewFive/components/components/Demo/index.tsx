import { Box, Slider, Typography } from '@mui/joy';
import { FC, useState } from 'react';
import Windmill from '../../../../../../../components/display/Windmill';

const Demo: FC = () => {
	const [state, setState] = useState({ t: 12, r: 24, l: 56, s: 36 });

	return (
		<Box
			sx={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					gap: 14,
					alignItems: 'flex-end',
				}}
			>
				<Windmill {...state} />
			</Box>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					p: 6,
				}}
			>
				<Box sx={{ width: '320px' }}>
					<Typography>Supply</Typography>
					<Slider
						sx={{ p: 0 }}
						color="neutral"
						value={state.l}
						onChange={(e, v) => setState({ ...state, l: v as number })}
						min={0}
						max={100}
					/>
					<Box p={2} />
					<Typography>Demand</Typography>
					<Slider
						sx={{ p: 0 }}
						color="neutral"
						value={state.r}
						onChange={(e, v) => setState({ ...state, r: v as number })}
						min={0}
						max={100}
					/>
					<Box p={2} />
					<Typography>Events</Typography>
					<Slider
						sx={{ p: 0 }}
						color="neutral"
						value={state.s}
						onChange={(e, v) => setState({ ...state, s: v as number })}
						min={0}
						max={100}
					/>
					<Box p={2} />
					<Typography>Thickness</Typography>
					<Slider
						sx={{ p: 0 }}
						color="neutral"
						value={state.t}
						onChange={(e, v) => setState({ ...state, t: v as number })}
						min={0}
						max={100}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default Demo;

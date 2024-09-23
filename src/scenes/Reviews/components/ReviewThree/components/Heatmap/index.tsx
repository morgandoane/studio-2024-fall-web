import { Box, Slider, Switch, Typography, useTheme } from '@mui/joy';
import { FC, useState } from 'react';
import { Datafilter } from '../../../../../../assets/data/DataFilter';
import Viz from '../../../../../../components/display/Viz';
import { useDataset } from '../../../../../../assets/data/useDataset';
import Controls from './components/Controls';
import { Month } from '../../../../../../assets/data/Datapoint';
import { FaArrowRight } from 'react-icons/fa';

const Heatmap: FC<{ p: number }> = ({ p }) => {
	const { palette } = useTheme();
	const [showPolicies, setShowPolicies] = useState(true);

	const [start, setStart] = useState<{ month: Month; year: number }>({
		month: 0,
		year: 2004,
	});

	const [end, setEnd] = useState<{ month: Month; year: number }>({
		month: 11,
		year: 2023,
	});

	const [filter1, setFilter1] = useState<Datafilter>({
		gender: 'Combined',
		start: null,
		end: null,
		source: null,
	});

	const allData = useDataset({
		gender: 'Combined',
		start: null,
		end: null,
		source: null,
	});

	const sources = [...new Set(allData.map((d) => d.source))].sort();
	const yearMin = Math.min(...allData.map((d) => d.year));
	const yearMax = Math.max(...allData.map((d) => d.year));

	return (
		<Box
			sx={{
				flex: 1,
				display: 'flex',
				flexDirection: 'column',
				p,
				gap: 4,
			}}
		>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Typography level="h1">Korea's Blood Supply, Over Time</Typography>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 3,
					}}
				>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						<Typography level="body-xs">Policy Initiatives</Typography>
						<Box
							sx={{
								width: '16px',
								height: '16px',
								borderRadius: '50%',
								border: `2px dashed ${palette.neutral[700]}`,
							}}
						></Box>
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						<Typography level="body-xs">Donations</Typography>
						<Box
							sx={{
								width: '16px',
								height: '16px',
								borderRadius: '4px',
								background: palette.primary[500],
								opacity: 0.2,
							}}
						></Box>
						<FaArrowRight />
						<Box
							sx={{
								width: '16px',
								height: '16px',
								borderRadius: '4px',
								background: palette.primary[500],
							}}
						></Box>
					</Box>
				</Box>
			</Box>
			<Box sx={{ flex: 1, display: 'flex', alignItems: 'stretch' }}>
				<Viz.Heatmap
					filter={{ ...filter1, start, end }}
					showPolicies={showPolicies}
				/>
			</Box>
			<Box
				sx={{
					display: 'flex',
					gap: 3,
				}}
			>
				<Controls value={filter1} onChange={setFilter1} sources={sources} />
				<Box>
					<Typography level="body-xs">
						{start.year} - {end.year}
					</Typography>
					<Box sx={{ paddingLeft: 1 }}>
						<Slider
							sx={{ width: '120px' }}
							min={yearMin}
							max={yearMax}
							value={[start.year ?? yearMin, end.year ?? yearMax]}
							onChange={(e, v) => {
								if (Array.isArray(v)) {
									setStart({ ...start, year: v[0] });
									setEnd({ ...end, year: v[1] });
								}
							}}
						/>
					</Box>
				</Box>
				<Box sx={{ flex: 1 }} />
				<Box>
					<Box p={2} />
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 1,
						}}
					>
						<Typography level="body-xs">Show Policies</Typography>
						<Switch
							checked={showPolicies}
							onChange={() => setShowPolicies(!showPolicies)}
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Heatmap;

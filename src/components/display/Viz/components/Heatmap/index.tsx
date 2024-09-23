import { FC } from 'react';
import { Datafilter } from '../../../../../assets/DataFilter';
import { useDataset } from '../../../../../assets/useDataset';
import { Box, Tooltip, useTheme } from '@mui/joy';
import { motion } from 'framer-motion';

const abbreviations = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

export interface HeatmapProps {
	filter: Datafilter;
}

const Heatmap: FC<HeatmapProps> = ({ filter }) => {
	const { palette } = useTheme();
	const data = useDataset(filter);

	const years = [...new Set(data.map((d) => d.year))].sort();

	const notNull = data.filter((d) => d.value !== null);

	const min = Math.min(...(notNull.map((d) => d.value) as number[]));
	const max = Math.max(...(notNull.map((d) => d.value) as number[]));

	return (
		<Box
			sx={{
				flex: 1,
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<Box
				sx={{
					display: 'flex',
				}}
			>
				<Box sx={{ width: '50px' }} />
				{Array.from({ length: 12 }).map((_, month) => {
					return (
						<Box
							key={`month-${month}`}
							sx={{
								flex: 1,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							{abbreviations[month]}
						</Box>
					);
				})}
			</Box>
			{years.map((year, yearIndex) => {
				return (
					<Box
						key={`year-${yearIndex}`}
						sx={{ flex: 1, display: 'flex', flexDirection: 'row' }}
					>
						<Box
							sx={{
								width: '50px',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							{year}
						</Box>
						{Array.from({ length: 12 }).map((_, month) => {
							const value =
								data.find((d) => d.year === year && d.month === month)?.value ??
								0;

							const ratio = max === min ? 0 : (value - min) / (max - min);
							const exagerated = Math.pow(ratio, 4);

							return (
								<Box
									key={`year-${yearIndex}-month-${month}`}
									sx={{
										flex: 1,
										p: '4px',
										display: 'flex',
										flexDirection: 'column',
									}}
								>
									<Tooltip arrow title={`${value.toLocaleString()} donations`}>
										<motion.div
											style={{
												flex: 1,
												background: palette.primary[500],
												borderRadius: '2px',
												cursor: 'pointer',
											}}
											initial={{ opacity: 0 }}
											whileInView={{
												opacity: exagerated,
											}}
											whileHover={{
												scale: 1.1,
											}}
											transition={{
												delay: (yearIndex + month) * 0.02,
											}}
										/>
									</Tooltip>
								</Box>
							);
						})}
					</Box>
				);
			})}
		</Box>
	);
};

export default Heatmap;

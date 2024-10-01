import { Box, Slider, Typography, useTheme } from '@mui/joy';
import { FC, useState } from 'react';
import { useSupply } from '../../../../../../hooks/useSupply/useSupply';
import { useDemand } from '../../../../../../hooks/useDemand/useDemand';
import { usePopulation } from '../../../../../../hooks/usePopulation/usePopulation';
import { useNodes } from '../../useNodes';

const V3: FC = () => {
	const { palette } = useTheme();
	const { data: supplyData } = useSupply();
	const { data: demandData } = useDemand();
	const { data: populationData } = usePopulation();

	const nodes = useNodes(
		supplyData ?? [],
		demandData ?? [],
		populationData ?? []
	);

	const years = [...new Set(nodes.map((n) => n.year))].sort();

	const [year, setYear] = useState<number>(years[0]);

	const supplies = nodes.map((n) => n.demand ?? 0);
	const demands = nodes.map((n) => n.supply?.red_blood_cells_avg ?? 0);

	const maxDemand = Math.max(...demands);
	const minDemand = Math.min(...demands);

	const maxSupply = Math.max(...supplies);
	const minSupply = Math.min(...supplies);

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
				justifyContent: 'center',
			}}
		>
			<Box>
				<Box
					sx={{
						display: 'flex',
						maxWidth: '1200px',
					}}
				>
					{Array.from({ length: 12 }, (_, i) => i).map((month) => {
						const cellNodes = nodes.filter(
							(n) => n.year === year && n.month === month
						);

						const cellSupply = cellNodes.reduce(
							(acc, n) => acc + (n.demand ?? 0),
							0
						);

						const cellDemand = cellNodes.reduce(
							(acc, n) => acc + (n.supply?.red_blood_cells_avg ?? 0),
							0
						);

						const supplyRatio =
							(cellSupply - minSupply) / (maxSupply - minSupply);
						const demandRatio =
							(cellDemand - minDemand) / (maxDemand - minDemand);

						// get a position between 0 and 90 degrees

						// 1 supplyRatio is vertical (0 degrees)
						// 1 demandRatio is horizontal (90 degrees)
						// 0 supplyRatio is horizontal (90 degrees)
						// 0 demandRatio is vertical (0 degrees)

						const angle =
							Math.atan2(supplyRatio, demandRatio) * (180 / Math.PI);

						const minLength = 24;
						const maxLength = 72;

						const length = demandRatio * (maxLength - minLength) + minLength;

						return (
							<Box
								key={`cell-${month}`}
								sx={{
									flex: 1,
								}}
							>
								<Box
									sx={{
										position: 'relative',
										height: '100px',
										width: '100px',
									}}
								>
									<Box
										sx={{
											borderRadius: '4px',
											width: '8px',
											height: `${length}px`,
											background: palette.neutral[700],
											position: 'absolute',
											top: '50%',
											left: '50%',
											transform: `rotate(${angle}deg)`,
											transformOrigin: '50% -50%',
											// animate the length and the angle
											transition: 'all 0.3s ease',
										}}
									/>
								</Box>
								<Typography>{month}</Typography>
								<Typography>{Math.round(angle)}</Typography>
							</Box>
						);
					})}
				</Box>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						padding: 4,
						paddingTop: 18,
					}}
				>
					<Box sx={{ flex: 1, maxWidth: '400px' }}>
						<Slider
							min={Math.min(...years)}
							max={Math.max(...years)}
							value={year}
							onChange={(_, value) => setYear(value as number)}
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default V3;

import { FC, useState } from 'react';
import { useDemand } from '../../../../../../hooks/useDemand/useDemand';
import { useSupply } from '../../../../../../hooks/useSupply/useSupply';
import { usePopulation } from '../../../../../../hooks/usePopulation/usePopulation';
import { useNodes } from '../../useNodes';
import { Box, Typography, useTheme } from '@mui/joy';

const monthWidth = 48;
const monthNames = [
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

const V1: FC = () => {
	const { palette } = useTheme();
	const { data: supplyData } = useSupply();
	const { data: demandData } = useDemand();
	const { data: populationData } = usePopulation();

	const [focusedCity] = useState<string | null>(null);
	const [hoveredCity] = useState<string | null>(null);

	const activeCity = hoveredCity ?? focusedCity;

	const nodes = useNodes(
		supplyData ?? [],
		demandData ?? [],
		populationData ?? []
	);

	const filteredNodes = nodes.filter((n) =>
		activeCity === null ? true : n.city === activeCity
	);

	const years = [...new Set(nodes.map((n) => n.year))].sort();
	const months = Array.from({ length: 12 }, (_, i) => i);
	// const cities = [...new Set(nodes.map((n) => n.city))].sort();

	// const maxDemand = Math.max(...filteredNodes.map((n) => n.demand ?? 0));
	const maxSupply = Math.max(
		...filteredNodes.map((n) => n.supply?.red_blood_cells_avg ?? 0)
	);

	return (
		<Box
			sx={{
				height: '100vh',
				overflow: 'hidden',
				alignItems: 'stretch',
				display: 'flex',
			}}
		>
			{/* <Box sx={{ p: 2 }}> */}
			{/* <Typography level="h4">Stabaility of a Blood System</Typography> */}
			{/* <Box sx={{ display: 'flex', flexDirection: 'column' }}>
					{cities.map((city) => (
						<Box
							onMouseEnter={() => setHoveredCity(city)}
							onMouseLeave={() => setHoveredCity(null)}
							onClick={() => {
								if (focusedCity === city) {
									setFocusedCity(null);
								} else {
									setFocusedCity(city);
								}
							}}
							key={`button-${city}`}
						>
							<Typography>{city}</Typography>
						</Box>
					))}
				</Box> */}
			{/* </Box> */}
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
					<Box sx={{ width: `${monthWidth}px`, minWidth: `${monthWidth}px` }} />
					<Box
						sx={{
							display: 'flex',
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
							background: palette.neutral[800],
						}}
					>
						<Typography sx={{ color: 'white' }}>Stability</Typography>
					</Box>
				</Box>
				{months.map((month, monthIndex) => {
					return (
						// Month Row
						<Box
							key={`month-${month}`}
							sx={{ display: 'flex', flex: 1, maxHeight: 'calc(100% / 12)' }}
						>
							<Box
								sx={{ width: `${monthWidth}px`, minWidth: `${monthWidth}px` }}
							>
								<Typography>{monthNames[month]}</Typography>
							</Box>
							<Box sx={{ flex: 1, display: 'flex' }}>
								{/* Year Cells */}
								{years.map((year, yearIndex) => {
									const cellNodes = filteredNodes.filter(
										(n) => n.year === year && n.month === month
									);

									const totalDemand = cellNodes.reduce(
										(acc, n) => acc + (n.demand ?? 0),
										0
									);

									const totalSupply = cellNodes.reduce(
										(acc, n) => acc + (n.supply?.red_blood_cells_avg ?? 0),
										0
									);

									const ratio = totalSupply / totalDemand;

									// ratio of 1.5 is considered stable (vertical up)
									// ratio of 1 is considered somewhat unstable (horizontal)
									// ratio of 0.5 is considered very unstable (vertical down)

									const ratioTop = 1.5;
									const ratioBottom = 0;

									const getRotationAngle = (ratio: number) => {
										if (ratio >= ratioTop) {
											return 0;
										} else {
											// return a value between 0 and 180
											return (
												(1 - (ratio - ratioBottom) / (ratioTop - ratioBottom)) *
												90
											);
										}
									};

									const getColor = (ratio: number) => {
										return colorScale(
											[
												palette.danger[500],
												palette.danger[400],
												// yellow
												'#FFD700',
												palette.success[400],
												palette.success[500],
											],
											ratioBottom,
											ratioTop,
											ratio
										);
									};

									return (
										<Box
											key={`month-${month}-year-${year}`}
											sx={{
												flex: 1,
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
												gap: 1,
												flexDirection: 'column',
												border: `1px solid ${palette.neutral[100]}`,
												position: 'relative',
											}}
										>
											<Box
												sx={{
													position: 'absolute',
													left: '50%',
													top: '50%',
													height: `${(totalSupply / maxSupply) * 24}px`,
													width: `12px`,
													// background: palette.neutral[700],
													background: getColor(ratio),
													transform: `translate(-50%, -50%) rotate(${getRotationAngle(
														ratio
													)}deg)`,
													borderRadius: '4px',
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center',
													zIndex: (yearIndex + 1) * 10 + monthIndex,
													opacity: 0.8,
												}}
											>
												<Typography
													sx={{
														color: 'white',
													}}
												>
													{/* {ratio.toFixed(2)} */}
												</Typography>
											</Box>
										</Box>
									);
								})}
							</Box>
						</Box>
					);
				})}
				{/* Year axis labels */}
				<Box sx={{ display: 'flex' }}>
					<Box sx={{ width: `${monthWidth}px`, minWidth: `${monthWidth}px` }} />
					{years.map((year) => {
						return (
							<Box
								key={`year-${year}`}
								sx={{
									flex: 1,
									display: 'flex',
									justifyContent: 'center',
								}}
							>
								<Typography>{year}</Typography>
							</Box>
						);
					})}
				</Box>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						background: palette.neutral[800],
					}}
				>
					<Typography sx={{ color: 'white', transform: 'rotate(-90deg)' }}>
						Crisis
					</Typography>
				</Box>
				<Box sx={{ width: '12px' }} />
			</Box>
		</Box>
	);
};

export default V1;

const colorScale = (
	hexCodes: string[],
	min: number,
	max: number,
	value: number
): string => {
	const range = max - min;
	const step = range / hexCodes.length;
	const index = Math.floor((value - min) / step);
	return hexCodes[index];
};

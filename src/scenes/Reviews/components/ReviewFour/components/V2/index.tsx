import { Typography, useTheme } from '@mui/joy';
import { FC } from 'react';
import { useSupply } from '../../../../../../hooks/useSupply/useSupply';
import { useDemand } from '../../../../../../hooks/useDemand/useDemand';
import { usePopulation } from '../../../../../../hooks/usePopulation/usePopulation';
import { Box } from '@mui/joy';
import { useNodes } from '../../useNodes';

const labelWidths = {
	row: 36,
};

const V2: FC = () => {
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

	const monthYears = years.flatMap((year) => {
		return Array.from({ length: 12 }, (_, i) => i).map((month) => ({
			year,
			month,
		}));
	});

	const supplies = [
		...monthYears.map((my) => {
			const cellNodes = nodes.filter(
				(n) => n.year === my.year && n.month === my.month
			);

			const sum = cellNodes.reduce((acc, n) => acc + (n.demand ?? 0), 0);

			return sum;
		}),
	];

	const demands = [
		...monthYears.map((my) => {
			const cellNodes = nodes.filter(
				(n) => n.year === my.year && n.month === my.month
			);

			const sum = cellNodes.reduce(
				(acc, n) => acc + (n.supply?.red_blood_cells_avg ?? 0),
				0
			);

			return sum;
		}),
	];

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
			}}
		>
			{/* Header */}
			<Box></Box>
			{/* Content */}
			<Box sx={{ flex: 1, display: 'flex', alignItems: 'stretch' }}>
				{/* Sidebar */}
				<Box></Box>
				{/* Grid */}
				<Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
					{/* Header Row */}
					<Box
						sx={{
							display: 'flex',
							alignItems: 'stretch',
						}}
					>
						<Box
							sx={{
								width: `${labelWidths.row}px`,
								minWidth: `${labelWidths.row}px`,
							}}
						/>
						{years.map((year, yearIndex) => {
							return (
								<Box
									key={`year-${yearIndex}`}
									sx={{
										flex: 1,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<Typography>{year}</Typography>
								</Box>
							);
						})}
					</Box>
					{/* Content Rows */}
					{Array.from({ length: 12 }, (_, i) => i).map((month, monthIndex) => {
						// Month row
						return (
							<Box
								sx={{ flex: 1, display: 'flex', alignItems: 'stretch' }}
								key={`month-${monthIndex}`}
							>
								{/* Row Label */}
								<Box
									sx={{
										flex: 1,
										minWidth: `${labelWidths.row}px`,
										maxWidth: `${labelWidths.row}px`,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<Typography>{month}</Typography>
								</Box>
								{years.map((year, yearIndex) => {
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

									const supplyAngle = (90 - 90 * supplyRatio) * (Math.PI / 180);
									const demandAngle = (90 - 90 * demandRatio) * (Math.PI / 180);

									const angle = (supplyAngle + demandAngle) / 2;

									const minLength = 24;
									const maxLength = 72;

									const length =
										demandRatio * (maxLength - minLength) + minLength;

									return (
										<Box
											key={`cell-${yearIndex}-${monthIndex}`}
											sx={{
												flex: 1,
												position: 'relative',
											}}
										>
											<Box
												sx={{
													borderRadius: '5px',
													width: '10px',
													height: `${length}px`,
													background: palette.neutral[700],
													position: 'absolute',
													top: '50%',
													left: '50%',
													transform: `rotate(${angle}rad)`,
													transformOrigin: '50% -50%',
												}}
											/>
										</Box>
									);
								})}
							</Box>
						);
					})}
				</Box>
			</Box>
		</Box>
	);
};

export default V2;

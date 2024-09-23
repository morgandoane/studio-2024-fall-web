import { FC, useState } from 'react';
import { Datafilter } from '../../../../../assets/data/DataFilter';
import { useDataset } from '../../../../../assets/data/useDataset';
import { Box, Typography, useTheme } from '@mui/joy';
import { AnimatePresence, motion } from 'framer-motion';
import { usePolicies } from '../../../../../assets/policy/usePolicies';
import { Policy } from '../../../../../assets/policy/Policy';

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
	showPolicies: boolean;
}

const Heatmap: FC<HeatmapProps> = ({ filter, showPolicies }) => {
	const { palette, shadow } = useTheme();
	const data = useDataset(filter);

	const [hoveredPolicy, setHoveredPolicy] = useState<Policy | null>(null);

	const years = [...new Set(data.map((d) => d.year))].sort();

	const notNull = data.filter((d) => d.value !== null);

	const min = Math.min(...(notNull.map((d) => d.value) as number[]));
	const max = Math.max(...(notNull.map((d) => d.value) as number[]));

	const policies = usePolicies({
		start: filter.start,
		end: filter.end,
		region: filter.source,
	});

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
			<Box
				sx={{
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					position: 'relative',
				}}
			>
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
									data.find((d) => d.year === year && d.month === month)
										?.value ?? 0;

								const thisPolicies = policies.filter(
									(p) =>
										p.affective_year === year && p.affective_month - 1 === month
								);

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
											position: 'relative',
										}}
									>
										{showPolicies &&
											thisPolicies.map((policy, policyIndex) => {
												return (
													<motion.div
														key={`year-${yearIndex}-month-${month}-policy-${policyIndex}`}
														initial={{ opacity: 0 }}
														whileInView={{
															opacity: 1,
														}}
														transition={{
															delay: (yearIndex + month) * 0.02,
														}}
													>
														<Box
															sx={{
																zIndex: 5,
																position: 'absolute',
																height: `calc(${policyIndex * 24}px + (50vh / ${
																	years.length
																}))`,
																width: `calc(${policyIndex * 24}px + (50vh / ${
																	years.length
																}))`,
																borderRadius: '50%',
																border: `2px dashed ${palette.neutral[800]}`,
																top: '50%',
																left: '50%',
																transform: 'translate(-50%, -50%)',
															}}
															onMouseEnter={() => setHoveredPolicy(policy)}
															onMouseLeave={() => setHoveredPolicy(null)}
														/>
													</motion.div>
												);
											})}
										<AnimatePresence>
											{showPolicies &&
												hoveredPolicy &&
												hoveredPolicy.affective_year === year &&
												hoveredPolicy.affective_month - 1 === month && (
													<motion.div
														initial={{ opacity: 0 }}
														animate={{ opacity: 1 }}
														exit={{ opacity: 0 }}
														style={{
															zIndex: 10,
															position: 'absolute',
															top: '50%',
															left: '100%',
															transform: 'translate(-10%, -50%)',
														}}
													>
														<Box
															sx={{
																zIndex: 10,
																background: palette.primary[500],
																color: palette.neutral[50],
																borderRadius: '4px',
																padding: '8px',
																fontSize: '12px',
																width: '200px',
																boxShadow: shadow.lg,
															}}
														>
															<Typography
																level="body-sm"
																sx={{
																	color: 'white',
																}}
															>
																{hoveredPolicy.description}
															</Typography>
														</Box>
													</motion.div>
												)}
										</AnimatePresence>
										{/* <Tooltip
											arrow
											title={`${value.toLocaleString()} donations`}
										> */}
										<motion.div
											whileHover={{
												scale: 1.05,
											}}
											style={{
												flex: 1,
												display: 'flex',
												flexDirection: 'column',
											}}
										>
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
												transition={{
													delay: (yearIndex + month) * 0.02,
												}}
											/>
										</motion.div>
										{/* </Tooltip> */}
									</Box>
								);
							})}
						</Box>
					);
				})}
			</Box>
		</Box>
	);
};

export default Heatmap;

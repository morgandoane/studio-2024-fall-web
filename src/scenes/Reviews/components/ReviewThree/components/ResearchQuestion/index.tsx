import { Box, Grid, Typography } from '@mui/joy';
import { motion } from 'framer-motion';
import { FC } from 'react';

const questions = [
	'Is there a discoverable correlation between specific investments and campaigns held by Korea Red Cross and Korea’s overall blood donation supply?',
	'Are there some specific Korea Red Cross investments or campaigns that have more impact on the Korean blood donation supply?',
	'Do local efforts of regional Korea Red Cross have impact on regional Korean blood donation supply?',
	'Are there some specific Korea Red Cross investments or campaigns that is more effective to a specific subset of people?',
];

const ResearchQuestion: FC<{ p: number }> = ({ p }) => {
	return (
		<Box p={p}>
			<Box p={p / 2} />
			<Grid container spacing={18}>
				{questions.map((q, i) => (
					<Grid xs={6} key={`q-${i}`}>
						<div>
							<motion.div
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.5, delay: i * 0.1 }}
							>
								<Typography level="body-lg">RQ{i}.</Typography>
								<Box p={1} />
								<Typography level="h2">{q}</Typography>
							</motion.div>
						</div>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default ResearchQuestion;

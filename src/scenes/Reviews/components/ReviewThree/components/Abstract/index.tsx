import { Box, Typography } from '@mui/joy';
import { FC } from 'react';

const Abstract: FC<{ p: number }> = ({ p }) => {
	return (
		<Box
			p={p}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 3,
			}}
		>
			<Typography level="h1">Abstract</Typography>
			<Typography level="h3">
				Encouraging blood donation is a critical issue for many nations as blood
				supplies continue to decline each year. Motivating individuals to donate
				is a complex challenge, involving multiple stakeholders, and the impact
				of specific policies aimed at increasing blood supply is often difficult
				to measure.
			</Typography>
			<Typography level="h3">
				An intuitive visualization of these policies can provide policymakers
				with valuable insights, helping them plan more effective actions in the
				face of dwindling blood supplies. This study focuses on South Korea,
				where the Korean Red Cross centrally manages blood donation efforts. By
				visualizing the relationship between the Korean Red Cross’s policies,
				investments, and the country’s blood donation supply, we aim to
				demonstrate how data visualization can guide policy decisions.
			</Typography>
			<Typography level="h3">
				Moreover, this approach may serve as a model for addressing policy
				issues in other countries with similarly centralized systems. Our
				research addresses key questions about the correlation between specific
				investments, regional efforts, and their impact on blood donation
				supply, potentially offering a strategic framework for improving blood
				donation outcomes.
			</Typography>
		</Box>
	);
};

export default Abstract;

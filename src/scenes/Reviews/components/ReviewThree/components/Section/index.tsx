import { Box, useTheme } from '@mui/joy';
import { FC, PropsWithChildren } from 'react';

const Section: FC<PropsWithChildren<{ maxWidth?: number }>> = ({
	children,
	maxWidth = 1400,
}) => {
	const { palette } = useTheme();
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				height: '100vh',
				borderLeft: `1px solid ${palette.divider}`,
				borderRight: `1px solid ${palette.divider}`,
			}}
		>
			<Box
				sx={{
					flex: 1,
					maxWidth: `${maxWidth}px`,
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{children}
			</Box>
		</Box>
	);
};

export default Section;

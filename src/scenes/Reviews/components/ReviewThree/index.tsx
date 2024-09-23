import { FC, useRef } from 'react';
import Hero from './components/Hero';
import ResearchQuestion from './components/ResearchQuestion';
import Abstract from './components/Abstract';
import { Box, IconButton, useTheme } from '@mui/joy';
import Section from './components/Section';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import Heatmap from './components/Heatmap';

const p = 8;

const ReviewThree: FC = () => {
	const { palette } = useTheme();
	const ref = useRef<HTMLDivElement>(null);

	const onClickUp = () => {
		if (!ref.current) return;

		const currentScroll = ref.current.scrollTop;
		const sectionHeight = window.innerHeight;

		// Calculate the current section and target scroll position
		const targetScroll = Math.max(currentScroll - sectionHeight, 0);

		// If already partway through a section, scroll the full section height + offset
		if (currentScroll % sectionHeight !== 0) {
			ref.current.scrollTo({
				top: targetScroll - (currentScroll % sectionHeight),
				behavior: 'smooth',
			});
		} else {
			ref.current.scrollTo({ top: targetScroll, behavior: 'smooth' });
		}
	};

	const onClickDown = () => {
		if (!ref.current) return;

		const currentScroll = ref.current.scrollTop;
		const sectionHeight = window.innerHeight;
		const maxScroll = ref.current.scrollHeight - sectionHeight;

		// Calculate the current section and target scroll position
		const targetScroll = Math.min(currentScroll + sectionHeight, maxScroll);

		// If already partway through a section, scroll the full section height + offset
		if (currentScroll % sectionHeight !== 0) {
			ref.current.scrollTo({
				top: targetScroll + (sectionHeight - (currentScroll % sectionHeight)),
				behavior: 'smooth',
			});
		} else {
			ref.current.scrollTo({
				top: targetScroll,
				behavior: 'smooth',
			});
		}
	};

	return (
		<Box
			ref={ref}
			sx={{
				display: 'flex',
				justifyContent: 'center',
				background: palette.background.level1,
				height: '100vh',
				overflowY: 'auto',
				overflowX: 'hidden',
			}}
		>
			<Box>
				<Section>
					<Hero p={p} />
				</Section>
				<Section>
					<ResearchQuestion p={p} />
				</Section>
				<Section>
					<Abstract />
				</Section>
				<Section>
					<Heatmap p={p} />
				</Section>
			</Box>
			<Box
				sx={{
					position: 'fixed',
					bottom: '32px',
					right: '32px',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<IconButton onClick={onClickUp}>
					<FaArrowUp />
				</IconButton>
				<IconButton onClick={onClickDown}>
					<FaArrowDown />
				</IconButton>
			</Box>
		</Box>
	);
};

export default ReviewThree;

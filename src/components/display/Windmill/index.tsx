import { FC } from 'react';
import { Box, useTheme } from '@mui/joy';

interface WindmillProps {
	t: number;
	l: number;
	r: number;
	s: number;
}

const getRotation = ({ t, l, r, s }: WindmillProps) => {
	if (r === l) {
		return 0;
	} else if (r > l) {
		if (s >= r) {
			return Math.PI / 2;
		} else {
			// triangulate according to the ratio of s to r
			const ratio = s / r;
			const angle = (Math.PI / 2) * ratio;

			// it should move quicker in the beginning, then gradually slow down
			const exponential = Math.pow(ratio, 1.8);

			return angle * exponential;
		}
	} else {
		if (s >= l) {
			return -Math.PI / 2;
		} else {
			// triangulate according to the ratio of s to l
			const ratio = s / l;
			const angle = (Math.PI / 2) * ratio;

			const exponential = Math.pow(ratio, 1.8);

			return -angle * exponential;
		}
	}
};

const Windmill: FC<WindmillProps> = ({ t, l, r, s }) => {
	const { palette } = useTheme();

	const black = palette.neutral[800];

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{/* Stem Cap */}
			<Box
				sx={{
					width: `${t}px`,
					height: `${t / 2}px`,
					background: black,
					borderTopLeftRadius: `${t / 2}px`,
					borderTopRightRadius: `${t / 2}px`,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'flex-end',
				}}
			>
				{/* Joint Container */}
				<Box
					sx={{
						position: 'relative',
						height: 0,
						width: 0,
					}}
				>
					{/* Handle */}
					<Box
						sx={{
							height: `${t * 1.5}px`,
							width: `${t * 1.5}px`,
							background: l === r ? 'grey' : l > r ? 'green' : 'red',
							position: 'absolute',
							transform: `translate(-50%, -50%)`,
							borderRadius: `${t}px`,
							zIndex: 10,
							border: '2px solid black',
							transition: 'all 0.5s',
						}}
					/>
					<Box
						sx={{
							position: 'absolute',
							top: `-${t / 2}px`,
							display: 'flex',
							left: `-${l + t / 2}px`,
							transform: `rotate(${getRotation({ t, l, r, s })}rad)`,
							transformOrigin: `${l + t / 2}px ${t / 2}px`,
							borderRadius: `${t / 2 + 4}px`,
							transition: 'all 0.5s',
						}}
					>
						{/* Arm Cap */}
						<Box
							sx={{
								width: `${t / 2}px`,
								height: `${t}px`,
								background: black,
								borderTopLeftRadius: `${t / 2}px`,
								borderBottomLeftRadius: `${t / 2}px`,
							}}
						/>
						{/* Arm left */}
						<Box
							sx={{
								width: `${l}px`,
								background: black,
							}}
						/>
						{/* Arm right */}
						<Box
							sx={{
								width: `${r}px`,
								background: 'black',
								padding: '2px',
								paddingRight: 0,
							}}
						>
							<Box
								sx={{
									width: '100%',
									height: '100%',
									background: 'white',
								}}
							/>
						</Box>
						{/* Arm Cap */}
						<Box
							sx={{
								width: `${t / 2}px`,
								height: `${t}px`,
								background: 'black',
								borderTopRightRadius: `${t / 2}px`,
								borderBottomRightRadius: `${t / 2}px`,
							}}
						>
							<Box
								sx={{
									width: '100%',
									height: 'calc(100% - 4px)',
									background: 'white',
									borderTopRightRadius: `${t / 2}px`,
									borderBottomRightRadius: `${t / 2}px`,
									border: '2px solid black',
									borderLeft: 'none',
								}}
							></Box>
						</Box>
					</Box>
				</Box>
			</Box>
			{/* Stem */}
			<Box
				sx={{
					width: `${t}px`,
					height: `${s}px`,
					background: black,
				}}
			/>
			{/* Stem Cap */}
			<Box
				sx={{
					width: `${t}px`,
					height: `${t / 2}px`,
					background: black,
					borderBottomLeftRadius: `${t / 2}px`,
					borderBottomRightRadius: `${t / 2}px`,
				}}
			/>
		</Box>
	);
};

export default Windmill;

import { motion } from 'framer-motion';
import { FC } from 'react';

export interface RingsProps {
	count: number;
	base: number;
	offset: number;
	color: string;
	delay: number;
	scale: number;
}

const Rings: FC<RingsProps> = ({
	count,
	base,
	offset,
	color,
	delay,
	scale,
}) => {
	return (
		<motion.div
			style={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				zIndex: 10,
				fontSize: '.625rem',
				fontWeight: 700,
			}}
			animate={{ scale: scale }}
			transition={{
				duration: 0.3,
				ease: 'easeInOut',
			}}
		>
			<motion.p
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					zIndex: 10,
					fontSize: '.625rem',
					fontWeight: 700,
				}}
			>
				{count}
			</motion.p>
			{Array.from({ length: count }).map((_, index) => (
				<motion.div
					key={`ring-${index}`}
					style={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						borderRadius: '50%',
						height: `${(index + 1) * offset + base}px`,
						width: `${(index + 1) * offset + base}px`,
						transform: `translate(-50%, -50%)`,
						border: `1.5px solid ${color}`,
					}}
					animate={{
						opacity: [1, 0, 1], // Pulsing between full opacity and 0% opacity
					}}
					transition={{
						duration: 3.5, // Animation duration
						repeat: Infinity, // Loop the animation infinitely
						repeatType: 'mirror', // Mirrors the animation for a smooth loop
						delay: delay + index * 0.1, // Delay each ring by 0.1s
						ease: 'easeInOut', // Easing function
					}}
				/>
			))}
		</motion.div>
	);
};

export default Rings;

import { motion } from 'framer-motion';
import { FC, PropsWithChildren } from 'react';

export interface ArriveProps {
	duration?: number;
	scale?: number;
}

const Arrive: FC<PropsWithChildren<ArriveProps>> = ({
	children,
	duration = 0.3,
	scale = 0.9,
}) => {
	return (
		<motion.div
			whileInView={{ opacity: 1, scale: 1 }}
			initial={{ opacity: 0, scale }}
			transition={{ duration }}
		>
			{children}
		</motion.div>
	);
};

export default Arrive;

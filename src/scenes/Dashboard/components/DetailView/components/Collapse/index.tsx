import { FC, PropsWithChildren, useState } from 'react';
import { motion } from 'framer-motion';

export interface CollapseProps {
	title: string;
}

const Collapse: FC<PropsWithChildren<CollapseProps>> = ({
	title,
	children,
}) => {
	const [open, setOpen] = useState(true);
	return (
		<div>
			<div className="flex justify-between align-middle cursor-pointer py-2">
				<p className="text-heading-5">{title}</p>
			</div>
			<motion.div
				style={{
					overflow: 'hidden',
				}}
				initial={open ? 'open' : 'closed'}
				variants={{
					open: { height: 'auto', opacity: 1 },
					closed: { height: 0, opacity: 0 },
				}}
				animate={open ? 'open' : 'closed'}
			>
				<div className="h-4" />
				{children}
			</motion.div>
		</div>
	);
};

export default Collapse;

import { FC, PropsWithChildren, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

export interface CollapseProps {
	title: string;
	defaultOpen?: boolean;
}

const Collapse: FC<PropsWithChildren<CollapseProps>> = ({
	title,
	children,
	defaultOpen = true,
}) => {
	const [open, setOpen] = useState(defaultOpen);
	const toggle = () => setOpen(!open);
	return (
		<div>
			<div
				className="flex justify-between align-middle cursor-pointer px-4 py-2"
				onClick={toggle}
			>
				<p className="text-heading-5">{title}</p>
				<ChevronDownIcon
					className="h-8 mt-2"
					style={{
						transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
						transition: 'transform 0.3s ease',
					}}
				/>
			</div>
			<motion.div
				style={{
					overflow: 'hidden',
					paddingLeft: '16px',
					paddingRight: '16px',
				}}
				initial={defaultOpen ? 'open' : 'closed'}
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

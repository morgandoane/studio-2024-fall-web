import { AnimatePresence, motion } from 'framer-motion';
import { FC } from 'react';

export interface HeaderProps {
	collapsed: boolean;
}

const Header: FC<HeaderProps> = ({ collapsed }) => {
	return (
		<div
			style={{
				textAlign: 'center',
			}}
		>
			<h1
				className="display"
				style={{
					whiteSpace: 'pre-line',
				}}
			>
				{`Korea Red Cross Events
						and Their Impacts`}
			</h1>
			<motion.div
				style={{ overflow: 'hidden' }}
				variants={{
					collapsed: { height: 0 },
					expanded: { height: 'auto' },
				}}
				initial="expanded"
				animate={collapsed ? 'collapsed' : 'expanded'}
			>
				<h3>
					Discovering whether a policy was impactful is always a difficult task.
					In this data visualization we attempt to visualize the policy and its
					impact through a case study in Korea Red Cross.
				</h3>
			</motion.div>
		</div>
	);
};

export default Header;

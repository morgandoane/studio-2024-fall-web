import { FC } from 'react';

const Header: FC = () => {
	return (
		<div
			style={{
				textAlign: 'center',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				position: 'relative',
			}}
		>
			<div style={{ height: '16px' }} />
			<h1
				className="display"
				style={{
					whiteSpace: 'pre-line',
				}}
			>
				{`Korea Red Cross Events
						and Their Impacts`}
			</h1>
			<div style={{ height: '16px' }} />
			<h5
				style={{
					maxWidth: '800px',
				}}
			>
				Discovering whether a policy was impactful is always a difficult task.
				In this data visualization we attempt to visualize the policy and its
				impact through a case study in Korea Red Cross.
			</h5>
		</div>
	);
};

export default Header;

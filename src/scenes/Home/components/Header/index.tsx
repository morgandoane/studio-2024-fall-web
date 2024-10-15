import { FC } from 'react';

const Header: FC = () => {
	return (
		<div className="flex justify-center border-b">
			<div className="flex-1 max-w-screen-lg flex flex-col justify-center text-center items-center">
				<div className="h-8" />
				<h1 className="text-heading-1 whitespace-pre-line">
					{`Korean Red Cross
					Events & Their Impacts`}
				</h1>
				<div className="h-2" />
				<p className="max-w-prose text-body-medium">
					Discovering whether a policy was impactful is always a difficult task.
					In this data visualization we attempt to visualize the policy and its
					impact through a case study in Korea Red Cross.
				</p>
				<div className="h-4" />
			</div>
		</div>
	);
};

export default Header;

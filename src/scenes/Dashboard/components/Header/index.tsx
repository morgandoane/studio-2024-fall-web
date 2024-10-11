import { FC } from 'react';

const Header: FC = () => {
	return (
		<div className="flex flex-col text-center">
			<div className="h-8" />
			<h1 className="text-heading-2 whitespace-pre-line">
				{`Korea Red Cross Events
						and Their Impacts`}
			</h1>
			<div className="h-4" />
			<div className="flex justify-center">
				<p className="text-body-medium max-w-prose">
					Discovering whether a policy was impactful is always a difficult task.
					In this data visualization we attempt to visualize the policy and its
					impact through a case study in Korea Red Cross.
				</p>
			</div>
			<div className="h-4" />
		</div>
	);
};

export default Header;

import { FC } from 'react';

const Header: FC = () => {
	return (
		<div className="flex justify-center border-b">
			<div className="flex-1 max-w-screen-lg flex flex-col justify-center text-center items-center">
				<div className="h-8" />
				<h1 className="text-heading-1 whitespace-pre-line">
					{`Visualizing The Blood
					System of South Korea`}
				</h1>
				<div className="h-2" />
				<p className="max-w-prose text-body-medium">
					Visualize the delicate balance of blood supply and demand in South
					Korea. Dive into key data on donations, transfusion requirements, and
					the influence of Korean Red Cross events on maintaining this essential
					system.
				</p>
				<div className="h-4" />
			</div>
		</div>
	);
};

export default Header;

import BalancerMatrix, {
	BalancerMatrixProps,
} from '@components/BalancerMatrix';
import { FC, useEffect, useState } from 'react';

const Dashboard: FC = () => {
	const [state, setState] = useState<BalancerMatrixProps['data']>(
		Array.from({ length: 15 }, (_, i) => {
			return {
				year: 2015 + i,
				data: Array.from({ length: 12 }, () => {
					return {
						supply: 100,
						demand: 100,
						events: Math.floor(Math.random() * 10),
					};
				}),
			};
		})
	);

	useEffect(() => {
		// randomize the data every 5 seconds
		const interval = setInterval(() => {
			setState((prev) => {
				return prev.map((item) => {
					return {
						...item,
						data: item.data.map(() => {
							return {
								supply: Math.floor(Math.random() * 200),
								demand: Math.floor(Math.random() * 200),
								events: Math.floor(Math.random() * 10),
							};
						}),
					};
				});
			});
		}, 2000);

		// return a cleanup function to clear the interval
		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div>
			<div></div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<div style={{ flex: 1, maxWidth: '900px' }}>
					<BalancerMatrix data={state} />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;

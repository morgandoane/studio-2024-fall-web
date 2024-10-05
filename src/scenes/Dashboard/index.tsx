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
		}, 5000);

		// return a cleanup function to clear the interval
		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div>
			<div style={{ height: '24px' }} />
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<div style={{ flex: 1, maxWidth: '1200px', textAlign: 'center' }}>
					<h1
						className="display"
						style={{
							whiteSpace: 'pre-line',
						}}
					>
						{`Korea Red Cross Events
						and Their Impacts`}
					</h1>
					<h3>
						Discovering whether a policy was impactful is always a difficult
						task. In this data visualization we attempt to visualize the policy
						and its impact through a case study in Korea Red Cross.
					</h3>
				</div>
			</div>
			<div style={{ height: '24px' }} />
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<div style={{ flex: 1, maxWidth: '1200px', overflow: 'hidden' }}>
					<BalancerMatrix data={state} thk={16} />
				</div>
			</div>
			<div style={{ height: '48px' }} />
		</div>
	);
};

export default Dashboard;

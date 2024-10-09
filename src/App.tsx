import Dashboard from '@scenes/Dashboard';
import { FC } from 'react';
import { Route, Routes } from 'react-router';

const App: FC = () => {
	return (
		<Routes>
			<Route index element={<Dashboard />} />
			<Route path="*" element={<div>Not Found</div>} />
		</Routes>
	);
};

export default App;

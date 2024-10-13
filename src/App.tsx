import Home from '@scenes/Home';
import { FC } from 'react';
import { Route, Routes } from 'react-router';

const App: FC = () => {
	return (
		<Routes>
			<Route index element={<Home />} />
			<Route path="*" element={<div>Not Found</div>} />
		</Routes>
	);
};

export default App;

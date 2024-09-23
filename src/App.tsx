import { Navigate, Route, Routes } from 'react-router-dom';
import Reviews from './scenes/Reviews';

function App() {
	return (
		<Routes>
			<Route index element={<Navigate to="reviews" />} />
			<Route path="reviews/*" element={<Reviews />} />
		</Routes>
	);
}

export default App;

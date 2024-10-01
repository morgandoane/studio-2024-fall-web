import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import V1 from './components/V1';
import V2 from './components/V2';
import V3 from './components/V3';

const ReviewFour: FC = () => {
	return (
		<Routes>
			<Route index element={<Navigate to="v3" />} />
			<Route path="v1" element={<V1 />} />
			<Route path="v2" element={<V2 />} />
			<Route path="v3" element={<V3 />} />
		</Routes>
	);
};

export default ReviewFour;

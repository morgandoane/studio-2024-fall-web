import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ReviewThree from './components/ReviewThree';

const Reviews: FC = () => {
	return (
		<Routes>
			<Route index element={<Navigate to="3" />} />
			<Route path="3" element={<ReviewThree />} />
			<Route path="*" element={<Navigate to="3" />} />
		</Routes>
	);
};

export default Reviews;

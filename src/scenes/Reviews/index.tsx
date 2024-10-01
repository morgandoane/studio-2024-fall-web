import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ReviewThree from './components/ReviewThree';
import ReviewFour from './components/ReviewFour';
import ReviewFive from './components/ReviewFive';

const Reviews: FC = () => {
	return (
		<Routes>
			<Route index element={<Navigate to="5" />} />
			<Route path="3" element={<ReviewThree />} />
			<Route path="4/*" element={<ReviewFour />} />
			<Route path="5/*" element={<ReviewFive />} />
			<Route path="*" element={<Navigate to="/reviews" />} />
		</Routes>
	);
};

export default Reviews;

import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Demo from './components/components/Demo';

const ReviewFive: FC = () => {
	return (
		<Routes>
			<Route index element={<Navigate to="demo" />} />
			<Route path="demo" element={<Demo />} />
		</Routes>
	);
};

export default ReviewFive;

import { FC } from 'react';
import {
	Button as BaseButton,
	ButtonProps as BaseProps,
} from '@headlessui/react';

export interface ButtonProps extends BaseProps {
	variant?: 'solid' | 'outlined';
}

const Button: FC<ButtonProps> = ({
	variant = 'solid',
	children,
	className,
	...rest
}) => {
	return (
		<BaseButton
			className={`${className ?? ''} px-4 py-1 rounded-full ${
				variant === 'solid'
					? 'bg-gray-800 text-white hover:bg-gray-900'
					: 'border border-gray-800 text-gray-800 hover:bg-gray-100'
			}`}
			{...rest}
		>
			{children}
		</BaseButton>
	);
};

export default Button;

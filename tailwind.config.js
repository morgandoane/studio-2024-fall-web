/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Satoshi', 'sans-serif'],
			},
			colors: {
				textPrimary: '#1a1a1a', // Dark text for good contrast
				textSecondary: '#4a4a4a', // Slightly lighter for secondary text
			},
			fontSize: {
				'heading-1': [
					'2.5rem',
					{ lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: 800 },
				], // 40px
				'heading-2': [
					'2.25rem',
					{ lineHeight: '1.3', letterSpacing: '-0.015em', fontWeight: 600 },
				], // 36px
				'heading-3': [
					'2rem',
					{ lineHeight: '1.35', letterSpacing: '-0.01em', fontWeight: 600 },
				], // 32px
				'heading-4': [
					'1.75rem',
					{ lineHeight: '1.4', letterSpacing: '-0.01em', fontWeight: 600 },
				], // 28px
				'heading-5': [
					'1.5rem',
					{ lineHeight: '1.45', letterSpacing: '-0.005em', fontWeight: 600 },
				], // 24px
				'heading-6': [
					'1.25rem',
					{ lineHeight: '1.5', letterSpacing: '0em', fontWeight: 600 },
				], // 20px
				'body-large': [
					'1.125rem',
					{ lineHeight: '1.75', letterSpacing: '0em' },
				], // 18px
				'body-medium': ['1rem', { lineHeight: '1.65', letterSpacing: '0em' }], // 16px
				'body-small': [
					'0.875rem',
					{ lineHeight: '1.55', letterSpacing: '0em' },
				], // 14px
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
};

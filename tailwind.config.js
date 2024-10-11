/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				display: ['Satoshi', 'sans-serif'],
				heading: ['Satoshi', 'sans-serif'],
				body: ['Satoshi', 'sans-serif'],
			},
			fontSize: {
				display: ['5rem', { lineHeight: '1.1' }], // Custom display size
				'heading-1': ['3.75rem', { lineHeight: '1.2', fontWeight: 900 }],
				'heading-2': ['3rem', { lineHeight: '1.3', fontWeight: 800 }],
				'heading-3': ['2.5rem', { lineHeight: '1.35', fontWeight: 800 }],
				'heading-4': ['2rem', { lineHeight: '1.4', fontWeight: 800 }],
				'body-large': ['1.125rem', { lineHeight: '1.75', fontWeight: 500 }],
				'body-medium': ['1rem', { lineHeight: '1.75', fontWeight: 500 }],
				'body-small': ['0.875rem', { lineHeight: '1.5', fontWeight: 500 }],
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
};

import { FC, PropsWithChildren } from 'react';
import { extendTheme, CssVarsProvider } from '@mui/joy';

// primary 50-900
// fbeeef-f4cdd0-ecacb2-e17a83-d95963-cd2e3a-a62630-851e27-430f13-21080a

const theme = extendTheme({
	fontFamily: {
		display: 'Greycliff',
		body: 'NovaletraSerif',
	},
	colorSchemes: {
		light: {
			palette: {
				text: {
					primary: 'var(--joy-palette-neutral-700, #171A1C)',
					secondary: 'var(--joy-palette-neutral-600, #6B6E70)',
					tertiary: 'var(--joy-palette-neutral-400, #B0B3B8)',
				},
				primary: {
					[50]: '#fbeeef',
					[100]: '#f4cdd0',
					[200]: '#ecacb2',
					[300]: '#e17a83',
					[400]: '#d95963',
					[500]: '#cd2e3a',
					[600]: '#a62630',
					[700]: '#851e27',
					[800]: '#430f13',
					[900]: '#21080a',
				},
			},
		},
	},
});

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
	return <CssVarsProvider theme={theme}>{children}</CssVarsProvider>;
};

export default ThemeProvider;

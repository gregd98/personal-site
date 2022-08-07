import { generateFontFaces } from './fonts';

const components = {
	MuiCssBaseline: {
		styleOverrides: generateFontFaces(),
	},
	MuiTypography: {
		styleOverrides: {
			body1: {
				fontFamily: 'poppins',
				fontSize: '16px',
			},
		},
		defaultProps: {
			variantMapping: {
				body1: 'div',
				heading1: 'div',
				heading2: 'div',
			},
		},
	},
	MuiButton: {
	},
	MuiCheckbox: {
		styleOverrides: {
			root: {
				'&.Mui-disabled': {
					opacity: 0.5,
				},
			},
		},
	},
	MuiPaper: {
		styleOverrides: {
			root: {
				boxShadow: 'unset',
				backgroundColor: '#FFF',
			},
		},
	},
};

export default components;

import { generateFontFaces } from 'utils/utils';
import { Components } from '@mui/material';

const components: Components = {
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

import { Components } from '@mui/material';

const getComponents = (bodyBackground: string): Components => ({
	MuiCssBaseline: {
		styleOverrides: `
		body {
				transition: background-color .3s;
		  background-color: ${bodyBackground};
		}
		`,
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
});

export default getComponents;

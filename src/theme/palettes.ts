import COLORS from 'theme/colors';

const defaultPalette = {
	error: {
		main: COLORS.error,
		contrastText: 'white',
	},
	warning: {
		main: COLORS.warning,
		contrastText: 'white',
	},
	success: {
		main: COLORS.success,
		contrastText: 'white',
	},
};

const palettes = [
	{
		primary: { main: COLORS.c1 },
		text: { primary: COLORS.c2 },
		...defaultPalette,
	},
	{
		primary: { main: COLORS.c3 },
		text: { primary: COLORS.c1 },
		...defaultPalette,
	},
	{
		primary: { main: COLORS.c4 },
		text: { primary: COLORS.c5 },
		...defaultPalette,
	},
	{
		primary: { main: COLORS.c6 },
		text: { primary: COLORS.c4 },
		...defaultPalette,
	},
	{
		primary: { main: COLORS.c2 },
		text: { primary: COLORS.c5 },
		...defaultPalette,
	},
];

export default palettes;

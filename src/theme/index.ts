import { createTheme, Theme } from '@mui/material';
import typography from './typography';
import palettes from './palettes';
import getComponents from './components';

const themes: Theme[] = [...Array(palettes.length).keys()].map((i) => {
	const currentPalette = palettes[i];
	return createTheme({
		typography,
		palette: currentPalette,
		components: getComponents(currentPalette.primary.main),
	});
});

const getTheme = (paletteIndex: number): Theme => themes[paletteIndex];

export default getTheme;

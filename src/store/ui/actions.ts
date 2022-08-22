import { AppThunk } from 'store/store';
import palettes from 'theme/palettes';
import { setPaletteIndex } from './slice';

export const changePalette = (): AppThunk => (dispatch, getState) => {
	const index = getState().ui.paletteIndex;
	dispatch(setPaletteIndex(index < palettes.length - 1 ? index + 1 : 0));
};

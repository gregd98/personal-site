import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import type { AppState } from 'store/store';

export interface UiState {
	paletteIndex: number,
}

const initialState: UiState = {
	paletteIndex: 0,
};

export const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setPaletteIndex: (state, action: PayloadAction<number>) => {
			state.paletteIndex = action.payload;
		},
	},
	extraReducers: {
		[HYDRATE]: (state, action) => ({
			...state,
			...action.payload.ui,
		}),
	},
});

export const { setPaletteIndex } = uiSlice.actions;

export const selectPaletteIndex = (state: AppState) => state.ui.paletteIndex;

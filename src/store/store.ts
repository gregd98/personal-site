import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { useDispatch } from 'react-redux';
// import axios, { AxiosInstance } from 'axios';
// import { interceptors } from 'store/interceptors';
import { uiSlice } from './ui/slice';

// const isServer = typeof window === 'undefined';
// const headers = { 'Content-Type': 'application/json' };
//
// const getJsonApi = (context: any): () => AxiosInstance => () => {
// 	const instance = axios.create({
// 		baseURL: isServer ? process.env.SSR_API_HOS : process.env.NEXT_PUBLIC_API_HOST,
// 		headers,
// 		withCredentials: true,
// 	});
// 	return interceptors(instance, context);
// };

export const makeStore = () => configureStore({
	reducer: {
		[uiSlice.name]: uiSlice.reducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
});

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch: () => AppDispatch = useDispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	Action
	>;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: process.env.NODE_ENV === 'development' });

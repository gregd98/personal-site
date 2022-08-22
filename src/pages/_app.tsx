import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import 'styles/globals.css';
import getTheme from 'theme';
import { wrapper } from 'store/store';
import { useSelector } from 'react-redux';
import { selectPaletteIndex } from 'store/ui/slice';

const App = ({ Component, pageProps }: AppProps) => {
	const paletteIndex = useSelector(selectPaletteIndex);
	return (
		<ThemeProvider theme={getTheme(paletteIndex)}>
			<CssBaseline />
			<Head>
				<meta name='theme-color' content='#FFFFFF' />
				<title>Personal Site</title>
			</Head>
			<Component {...pageProps} />
		</ThemeProvider>
	);
};

export default wrapper.withRedux(App);

import React from 'react';
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import 'styles/globals.css';
import theme from 'theme';

const App = ({ Component, pageProps }: AppProps) => (
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<Component {...pageProps} />
	</ThemeProvider>
);

export default App;

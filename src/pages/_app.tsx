import React from 'react';
import type { AppProps } from 'next/app';
import 'styles/globals.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from 'theme';

const App = ({ Component, pageProps }: AppProps) => (
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<Component {...pageProps} />
	</ThemeProvider>
);

export default App;

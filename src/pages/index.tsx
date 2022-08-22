import React from 'react';
import type { NextPage } from 'next';
import { Home } from 'views';
import { wrapper } from 'store/store';
import { setPaletteIndex } from 'store/ui/slice';
import palettes from 'theme/palettes';

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
	store.dispatch(setPaletteIndex(Math.floor(Math.random() * palettes.length)));
	return { props: {} };
});

const HomePage: NextPage = () => <Home />;

export default HomePage;

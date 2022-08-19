import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { PDFViewer } from '@react-pdf/renderer';
import { Style } from '@react-pdf/types';
import { CvDocument, CVData } from 'components';

const pdfViewerStyle: Style = {
	width: '100%',
	height: '100vh',
	border: 'unset',
};

const cvData: CVData = {
	name: 'Demény Gergely',
	role: 'Front End Developer',
	contactInfo: [
		{
			icon: 'email',
			value: 'gergodemeny@pm.me',
		},
		{
			icon: 'github',
			value: 'github.com/gregd98',
			url: 'https://github.com/gregd98',
		},
		{
			icon: 'linkedin',
			value: 'linkedin.com/in/gregd98',
			url: 'https://www.linkedin.com/in/gregd98',
		},
		{
			icon: 'location',
			value: 'Cluj-Napoca',
		},
	],
	experiences: [
		{
			role: 'Front End Developer',
			company: 'Smartitory',
			startingDate: new Date(2021, 1),
			location: 'Cluj-Napoca',
		},
		{
			role: 'Android Developer',
			company: 'Cosys Computer Systems',
			startingDate: new Date(2017, 9),
			endingDate: new Date(2018, 9),
			location: 'Sfântu Gheorghe',
		},
	],
};

const CvPage: NextPage = () => {
	const [loaded, setLoaded] = useState<boolean>(false);

	useEffect(() => {
		setLoaded(true);
	}, []);

	if (!loaded) {
		return <></>;
	}

	return (
		<PDFViewer style={pdfViewerStyle}>
			<CvDocument data={cvData} />
		</PDFViewer>
	);
};

export default CvPage;

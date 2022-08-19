import React, { FC } from 'react';
import {
	Document, Page, Text, View, StyleSheet, Font,
} from '@react-pdf/renderer';
import { generatePdfFont } from 'utils';
import {
	ContactBox, ExperienceBox, LanguageBox, SkillBox,
} from './components';
import { Variant } from './components/SvgIcon/SvgIcon';

Font.register(generatePdfFont('lato', [300, 400, 700]));
Font.register(generatePdfFont('poppins', '300-600'));

const styles = StyleSheet.create({
	page: {
		flexDirection: 'column',
		paddingHorizontal: '30px',
		paddingTop: '40px',
	},
	nameContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	nameText: {
		fontFamily: 'lato',
		fontWeight: 700,
		fontSize: '36px',
	},
	roleText: {
		fontFamily: 'lato',
		fontWeight: 400,
		fontSize: '16px',
		marginTop: '8px',
	},
	content: {
		display: 'flex',
		flexDirection: 'row',
		marginTop: '40px',
	},
	leftContainer: {
		flex: 3,
		marginRight: '40px',
	},
	rightContainer: {
		flex: 2,
	},
});

export interface IContactItem {
	icon: Variant,
	value: string,
	url?: string,
}

export interface IExperienceItem {
	role: string,
	company: string,
	startingDate: Date,
	endingDate?: Date,
	location?: string,
}

export interface ISkillItem {
	name: string,
	years?: number,
}

export interface ISkillCategory {
	name: string,
	skills: ISkillItem[]
}

export interface ILanguageItem {
	name: string
	score: number
}

export interface CVData {
	name: string
	role: string
	contactInfo: IContactItem[]
	experiences: IExperienceItem[]
	skillCategories: ISkillCategory[]
	languages: ILanguageItem[]
}

const CvDocument: FC<{ data: CVData }> = ({ data }) => (
	<Document>
		<Page size='A4' style={styles.page}>
			<View style={styles.nameContainer}>
				<Text style={styles.nameText}>{data.name}</Text>
				<Text style={styles.roleText}>{data.role}</Text>
			</View>
			<View style={styles.content}>
				<View style={styles.leftContainer}>
					<ExperienceBox data={data.experiences} />
					<SkillBox skillCategories={data.skillCategories} />
				</View>
				<View style={styles.rightContainer}>
					<ContactBox data={data.contactInfo} />
					<LanguageBox languages={data.languages} />
				</View>
			</View>
		</Page>
	</Document>
);

export default CvDocument;

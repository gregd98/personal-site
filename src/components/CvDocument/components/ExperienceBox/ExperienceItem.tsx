import React, { FC } from 'react';
import moment from 'moment';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { IExperienceItem } from '../../CvDocument';
import DetailItem from './DetailItem';

const primaryColor = '#008cff';

const styles = StyleSheet.create({
	root: {
		marginBottom: '20px',
	},
	role: {
		fontFamily: 'poppins',
		fontSize: '16px',
		fontWeight: 300,
	},
	company: {
		fontFamily: 'poppins',
		color: primaryColor,
		fontWeight: 600,
		fontSize: '14px',
		marginTop: '2px',
	},
	detailContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	locationDetail: {
		marginLeft: '8px',
	},
});

const formatDate = (d: Date): string => moment(d).format('MM/YYYY');

const formatInterval = ({ startingDate, endingDate }: IExperienceItem): string => `${formatDate(startingDate)} - ${endingDate ? formatDate(endingDate) : 'present'}`;

const ExperienceItem: FC<{ data: IExperienceItem }> = ({ data }) => (
	<View style={styles.root}>
		<Text style={styles.role}>{data.role}</Text>
		<Text style={styles.company}>{data.company}</Text>
		<View style={styles.detailContainer}>
			<DetailItem icon='calendar' value={formatInterval(data)} />
			{!!data.location && <DetailItem icon='location' value={data.location} style={styles.locationDetail} />}
		</View>
	</View>
);

export default ExperienceItem;

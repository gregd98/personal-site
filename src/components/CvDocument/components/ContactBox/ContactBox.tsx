import React, { FC } from 'react';
import { View } from '@react-pdf/renderer';
import { IContactItem } from '../../CvDocument';
import Title from '../Title';
import ContactItem from './ContactItem';

const ContactBox: FC<{ data: IContactItem[]}> = ({ data }) => (
	<View>
		<Title title='Contact info' />
		{data.map((item, i) => (
			<ContactItem key={i.toString()} data={item} />
		))}
	</View>
);

export default ContactBox;

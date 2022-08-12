interface IFontItem {
 name: string
 weights: number[] | string
 format: string
 extension: string
}

export const fonts: IFontItem[] = [
	{
		name: 'poppins',
		weights: '100-900',
		format: 'truetype',
		extension: '.ttf',
	},
	{
		name: 'lato',
		weights: [100, 300, 400, 700, 900],
		format: 'truetype',
		extension: '.ttf',
	},
	{
		name: 'raleway',
		weights: '100-900',
		format: 'truetype',
		extension: '.ttf',
	},
	{
		name: 'quicksand',
		weights: '300-700',
		format: 'truetype',
		extension: '.ttf',
	},
];

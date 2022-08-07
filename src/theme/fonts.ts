interface IFontItem {
 name: string
 weights: number[]
 format: string
 extension: string
}

export const fonts: IFontItem[] = [
	{
		name: 'poppins',
		weights: [300, 400, 500, 700, 900],
		format: 'truetype',
		extension: '.ttf',
	},
];

export const generateFontFaces = (): string => {
	const r: string[] = [];
	fonts.forEach(({
		name, weights, format, extension,
	}) => {
		weights.forEach((weight) => {
			r.push(`
			@font-face {
				font-family: "${name}";
				font-weight: ${weight};
				src: local("${name}"), url(/fonts/${name}/${weight}${extension}) format("${format}");
			}
			`);
		});
	});
	return r.join('\n');
};

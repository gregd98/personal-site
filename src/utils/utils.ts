import { FontName, fonts as themeFonts } from 'theme/fonts';
import { BulkLoad } from '@react-pdf/types';

export const px = (v: number | string): string => `${v}px`;
export const bp = (v: number | string): string => `@media (max-width: ${px(v)})`;

const getParsedFontWeights = (weights: number[] | string): number[] => {
	if (Array.isArray(weights)) {
		return weights;
	}
	const result: number[] = [];
	const [f, l] = weights.split('-');
	const first = Number.parseInt(f, 10);
	const last = Number.parseInt(l, 10);
	for (let i = first; i <= last; i += 100) {
		result.push(i);
	}
	return result;
};

export const generateFontFaces = (): string => {
	const r: string[] = [];
	themeFonts.forEach(({
		name, weights, format, extension,
	}) => {
		const w = getParsedFontWeights(weights);
		w.forEach((weight) => {
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

export const generatePdfFont = (name: FontName, weights: number[] | string): BulkLoad => {
	const f = themeFonts.find((font) => font.name === name);
	const fonts = getParsedFontWeights(weights).map((weight) => ({
		src: `/fonts/${name}/${weight}${f?.extension}`, fontWeight: weight,
	}));
	return { family: name, fonts };
};

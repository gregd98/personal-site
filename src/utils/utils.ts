import { fonts } from 'theme/fonts';

export const px = (v: number | string): string => `${v}px`;
export const bp = (v: number | string): string => `@media (max-width: ${px(v)})`;

export const generateFontFaces = (): string => {
	const r: string[] = [];
	fonts.forEach(({
		name, weights, format, extension,
	}) => {
		let w: number[] = [];
		if (Array.isArray(weights)) {
			w = weights;
		} else {
			const [f, l] = weights.split('-');
			const first = Number.parseInt(f, 10);
			const last = Number.parseInt(l, 10);
			for (let i = first; i <= last; i += 100) {
				w.push(i);
			}
		}
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

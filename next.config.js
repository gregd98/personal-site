module.exports = {
	reactStrictMode: true,
	swcMinify: true,
	publicRuntimeConfig: {
		PUBLIC_API: `${process.env.PUBLIC_HOST}`,
		LOCAL_API: `${process.env.LOCAL_HOST}`
	},
	eslint: {
		ignoreDuringBuilds: true
	},
	useFileSystemPublicRoutes: true,
	pageExtensions: ['tsx'],
	webpack: (config) => config,
	webpackDevMiddleware: (config) => {
		// eslint-disable-next-line no-param-reassign
		config.watchOptions = {
			poll: 1000,
			aggregateTimeout: 300
		};
		return config;
	},
	async redirects() {
		return [];
	},
	async rewrites() {
		return [
			{
				source: '/:path*',
				destination: `${process.env.PUBLIC_HOST}/:path*`
			}
		];
	}
};

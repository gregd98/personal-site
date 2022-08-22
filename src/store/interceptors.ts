import nookies from 'nookies';
import { AxiosInstance } from 'axios';

export const interceptors = (instance: AxiosInstance, context: any) => {
	instance.interceptors.request.use(
		(req) => {
			const cookies = nookies.get(context);
			if (req.headers && cookies?.token) {
				req.headers.jwttoken = `${cookies.token}`;
			}
			return req;
		},
		(error) => {
			console.log('Request error');
			console.log(error);
			return Promise.reject(error);
		},
	);

	// response interceptor
	instance.interceptors.response.use(
		(res) =>
			res.data,			// return res.data;
		(error) => {
			let errorCode = 'UNKNOWN_ERROR';
			let errorResponse = null;

			if (error) {
				if (error.response) {
					if (error.response.status) {
						if (error.response.status === 400) {
							errorCode = 'BAD_REQUEST';
						}

						if (error.response.status === 401) {
							errorCode = 'UNAUTHORIZED';
						}

						if (error.response.status === 403) {
							errorCode = 'FORBIDDEN';
						}

						if (error.response.status === 404) {
							errorCode = 'PAGE_NOT_FOUND';
						}

						if (error.response.status >= 500) {
							errorCode = 'INTERNAL_SERVER_ERROR';
						}
					}

					if (error.response.data?.error?.code) {
						errorResponse = error.response.data.error;
						errorCode = error.response.data.error.code;
					}
				} else {
					errorCode = 'NETWORK_ERROR';
				}
			}

			if (errorResponse) {
				return Promise.reject(errorResponse);
			}
			// eslint-disable-next-line prefer-promise-reject-errors
			return Promise.reject({ code: errorCode });
		},
	);

	return instance;
};

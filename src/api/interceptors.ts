import type {
	AxiosError,
	AxiosInstance,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios';

const onRequest = (
	config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
	// Add authorization header with access token if available
	const userStorage = localStorage.getItem('user');
	if (userStorage) {
		try {
			const user = JSON.parse(userStorage);
			const token = user?.token;

			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		} catch (e) {
			console.error('Error parsing the user from localStorage', e);
		}
	}
	console.info(`[Request] [${JSON.stringify(config)}]`);
	return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
	console.error(`[request error] [${JSON.stringify(error)}]`);
	return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
	console.info(`[response] [${JSON.stringify(response)}]`);
	return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
	const { data, status } = error.response || {};
	switch (status) {
		case 400:
			console.error(data);
			break;

		case 401:
			console.error('unauthorised');
			localStorage.removeItem('user');
			window.location.href = '/login';
			break;

		case 404:
			console.error('/not-found');
			break;

		case 500:
			console.error('/server-error');
			break;
	}
	console.error(`[response error] [${JSON.stringify(error)}]`);
	return Promise.reject(error);
};

export function setupInterceptorsTo(
	axiosInstance: AxiosInstance,
): AxiosInstance {
	axiosInstance.interceptors.request.use(onRequest, onRequestError);
	axiosInstance.interceptors.response.use(
		onResponse,
		onResponseError,
	);
	return axiosInstance;
}

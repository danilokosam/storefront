import type {
	AxiosError,
	AxiosInstance,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios';
import { refreshToken } from '../utils/authRefresh';

interface CustomRequestConfig extends InternalAxiosRequestConfig {
	_retry?: boolean;
}

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

const onResponseError = async (
	error: AxiosError,
	axiosInstance: AxiosInstance,
): Promise<AxiosResponse> => {
	const { data, status } = error.response || {};

	if (!error.config) {
		return Promise.reject(error);
	}
	const originalRequest = error.config as CustomRequestConfig;
	switch (status) {
		case 400:
			console.error(data);
			break;

		case 401:
			// --- REFRESH TOKEN LOGIC ---
			if (!originalRequest._retry) {
				originalRequest._retry = true;
				console.info(
					'Session expired. Attempting to refresh token...',
				);

				const newToken = await refreshToken();

				if (newToken) {
					console.info(
						'Token refreshed successfully. Retrying request...',
					);
					// Retry the original request with the instance that has the interceptors
					return axiosInstance(originalRequest);
				}
			}

			// If we got here, it's because the refresh failed or this is already the second 401 attempt.
			console.error(
				'Failed to refresh session. Redirecting to login...',
			);
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
		(error: AxiosError) => onResponseError(error, axiosInstance),
	);
	return axiosInstance;
}

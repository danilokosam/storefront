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

type RetryQueueItem = {
  resolve: (token: string | null) => void;
  reject: (error: Error | AxiosError) => void;
};

// --- QUEUE LOGIC (Variables outside the function to persist between calls) ---
let isRefreshing = false;
let failedQueue: RetryQueueItem[] = [];

const processQueue = (error: Error | AxiosError | null, token: string | null = null) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});
	failedQueue = [];
};

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
			// 1. If we are already refreshing the token, we queue this request.
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				})
					.then((_token) => {
						/**
             * We don't manually set the header here because calling axiosInstance(originalRequest)
             * triggers the request interceptor again, which will fetch the updated token 
             * from localStorage.
             */
						return axiosInstance(originalRequest);
					})
					.catch((err) => {
						return Promise.reject(err);
					});
			}

			// 2. If it is the first request that fails (no refresh in progress)
			if (!originalRequest._retry) {
				originalRequest._retry = true;
				isRefreshing = true; // We block the following requests

				console.info(
					'Session expired. Attempting to refresh token...',
				);

				try {
					const newToken = await refreshToken();

					if (newToken) {
						console.info(
							'Token refreshed successfully. Releasing queue...',
						);
						processQueue(null, newToken); // We released those who were waiting.
						return axiosInstance(originalRequest); // We are retrying the current request
					}
				} catch (refreshError) {
					processQueue(refreshError as AxiosError, null); // If the refresh fails, we reject the entire queue
					console.error('Refresh token failed.');
				} finally {
					isRefreshing = false; // Whatever happens, we release the lock for future errors
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

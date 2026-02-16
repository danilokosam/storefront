import type { AxiosResponse } from 'axios';
import type { AuthState } from '../types/auth';
import apiClient from './apiClient';

export type IUser = Omit<AuthState, 'token'>;
export type IUsers = Array<IUser>;

export interface IUpdateUserBody {
	name: string;
	email: string;
}

export interface IMakeAdminBody {
	isAdmin: boolean;
}

export interface IRegisterBody {
	name: string;
	email: string;
	password: string;
}

export interface ILoginBody {
	email: string;
	password: string;
}

// Utility for cleaning the response data
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
	get: <T>(url: string) => apiClient.get<T>(url).then(responseBody),
	post: <T, B>(url: string, body: B) =>
		apiClient.post<T>(url, body).then(responseBody),
	put: <T, B>(url: string, body: B) =>
		apiClient.put<T>(url, body).then(responseBody),
};

export const getProfile = () =>
	request.get<IUser>('/api/users/profile');

export const updateProfile = (data: IUpdateUserBody) =>
	request.put<IUser, IUpdateUserBody>('/api/users/profile', data);

export const getUsers = () => request.get<IUsers>('/api/users');

export const makeAdmin = (id: string) =>
	request.put<IUser, IMakeAdminBody>(`/api/users/${id}`, {
		isAdmin: true,
	});

export const registerUser = (data: IRegisterBody) =>
	request.post<AuthState, IRegisterBody>('/api/users/register', data);

export const loginUser = (data: ILoginBody) =>
	request.post<AuthState, ILoginBody>('/api/users/login', data);

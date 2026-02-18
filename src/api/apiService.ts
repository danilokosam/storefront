import type { AxiosResponse } from 'axios';
import type {
	AuthState,
	ILoginBody,
	IRegisterBody,
} from '../types/auth';
import type {
	IOrder,
	IOrderCreateBody,
	IPaymentResult,
} from '../types/order';
import type {
	ICreateProductBody,
	ICreateReviewBody,
	IProduct,
	ProductListRequest,
} from '../types/product';
import type {
	IMakeAdminBody,
	IUpdateUserBody,
	IUser,
	IUsers,
} from '../types/user';
import apiClient from './apiClient';

// Utility for cleaning the response data
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
	get: <T>(url: string) => apiClient.get<T>(url).then(responseBody),
	post: <T, B>(url: string, body: B) =>
		apiClient.post<T>(url, body).then(responseBody),
	put: <T, B>(url: string, body: B) =>
		apiClient.put<T>(url, body).then(responseBody),
	delete: <T>(url: string) =>
		apiClient.delete<T>(url).then(responseBody),
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

export const getProducts = (keyword = '', pageNumber = '') =>
	request.get<ProductListRequest>(
		`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`,
	);

export const createProduct = (data: ICreateProductBody) =>
	request.post<IProduct, ICreateProductBody>('/api/products', data);

// TODO: Validate with backend if delete returns the deleted object (IProduct)
// or a success message (e.g. { message: string })..
export const deleteProduct = (id: string) =>
	request.delete<IProduct>(`/api/products/${id}`);

export const getProductById = (id: string) =>
	request.get<IProduct>(`/api/products/${id}`);

export const createProductReview = (
	id: string,
	data: ICreateReviewBody,
) =>
	request.post<IProduct, ICreateReviewBody>(
		`/api/products/${id}/reviews`,
		data,
	);

export const createOrder = (data: IOrderCreateBody) =>
	request.post<IOrder, IOrderCreateBody>('/api/orders', data);

export const getOrderById = (id: string) =>
	request.get<IOrder>(`/api/orders/${id}`);

export const payOrder = (id: string, data: IPaymentResult) =>
	request.put<IOrder, IPaymentResult>(`/api/orders/${id}/pay`, data);

export const deliverOrder = (id: string) =>
	request.put<IOrder, Record<string, never>>(
		`/api/orders/${id}/deliver`,
		{},
	);

export const getOrders = () =>
	request.get<Array<IOrder>>('/api/orders');

export const getMyOrders = () =>
	request.get<Array<IOrder>>('/api/orders/myorders');

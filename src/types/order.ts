import type { IProduct } from './product';
import type { IUser } from './user';

export interface OrderItem {
	name: string;
	qty: number;
	image: string;
	price: number;
	product: IProduct;
}

export interface IOrder {
	_id: string;
	user: IUser;
	orderItems: Array<OrderItem>;
	shippingAddress: {
		address: string;
		city: string;
		postalCode: string;
		country: string;
	};
	paymentMethod: string;
	paymentResult: {
		message: string;
		reference: string;
		status: string;
		transactionId: string;
		user: IUser;
	};
	itemsPrice: number;
	taxPrice: number;
	shippingPrice: number;
	totalPrice: number;
	isPaid: boolean;
	paidAt: Date | number;
	isDelivered: boolean;
	deliveredAt: Date | number;
}

export interface IPaymentResult {
	message: string;
	reference: string;
	status: string;
	transactionId: string;
}

export type IOrderCreateBody = Omit<
	IOrder,
	'_id' | 'user' | 'isPaid' | 'isDelivered'
>;

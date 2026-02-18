import { atom, map } from 'nanostores';
import {
	createOrder,
	deliverOrder,
	getMyOrders,
	getOrderById,
	getOrders,
	payOrder,
} from '../api/apiService';
import type {
	IOrder,
	IOrderCreateBody,
	IPaymentResult,
} from '../types/order';
import { runAction } from '../utils/runAction';

// --- Place Order (Checkout) ---
export const loadingPlaceOrder = atom<boolean>(false);
export const errorPlaceOrder = atom<string | undefined>(undefined);

// --- Single Order Details (View & Payment) ---
export const loadingGetOrder = atom<boolean>(false);
export const errorGetOrder = atom<string | undefined>(undefined);
export const orderGetState = map<IOrder>();

// --- Payment & Delivery Actions ---
export const loadingPay = atom<boolean>(false);
export const errorPay = atom<string | undefined>(undefined);

export const loadingDelivery = atom<boolean>(false);
export const errorDelivery = atom<string | undefined>(undefined);

// --- Lists ---
export const loadingOrderList = atom<boolean>(false);
export const errorOrderList = atom<string | undefined>(undefined);
export const orderListState = atom<Array<IOrder>>([]);

export const loadingMyOrderList = atom<boolean>(false);
export const errorMyOrderList = atom<string | undefined>(undefined);
export const myOrderListState = atom<Array<IOrder>>([]);

/**
 * Creates a new order and redirects the user to the order page.
 */
export const placeOrderRequest = async (data: IOrderCreateBody) => {
	return await runAction(createOrder(data), {
		loadingStore: loadingPlaceOrder,
		errorStore: errorPlaceOrder,
		successAction(newOrder) {
			// Cleanup: Remove cart from local storage after successful purchase
			localStorage.removeItem('cart');
			// Navigation: Move user to the summary page of the created order
			window.location.href = `/order/${newOrder._id}`;
		},
		errorMessage: 'The order could not be placed.',
	});
};

/**
 * Fetches details for a single order and updates the global state.
 */
export const getOrderDetailsRequest = async (id: string) => {
	return await runAction(getOrderById(id), {
		loadingStore: loadingGetOrder,
		errorStore: errorGetOrder,
		successAction: (order) => {
			orderGetState.set(order);
		},
	});
};

/**
 * Processes payment and updates the current order state with the new 'isPaid' status.
 */
export const payOrderRequest = async (
	id: string,
	paymentResult: IPaymentResult,
) => {
	return await runAction(payOrder(id, paymentResult), {
		loadingStore: loadingPay,
		errorStore: errorPay,
		successAction: (updatedOrder) => {
			// Sync: Update the order details store so the UI reflects the payment status
			orderGetState.set(updatedOrder);
		},
	});
};

/**
 * (Admin Only) Marks an order as delivered.
 */
export const deliverOrderRequest = async (id: string) => {
	return await runAction(deliverOrder(id), {
		loadingStore: loadingDelivery,
		errorStore: errorDelivery,
		successAction: (updatedOrder) => {
			// Sync: Update the order details store to reflect delivery status
			orderGetState.set(updatedOrder);
		},
	});
};

/**
 * (Admin Only) Fetches the complete list of orders in the system.
 */
export const listOrdersRequest = async () => {
	return await runAction(getOrders(), {
		loadingStore: loadingOrderList,
		errorStore: errorOrderList,
		successAction: (orders) => {
			orderListState.set(orders);
		},
	});
};

/**
 * Fetches the order history for the currently logged-in user.
 */
export const listMyOrdersRequest = async () => {
	return await runAction(getMyOrders(), {
		loadingStore: loadingMyOrderList,
		errorStore: errorMyOrderList,
		successAction: (orders) => {
			myOrderListState.set(orders);
		},
	});
};

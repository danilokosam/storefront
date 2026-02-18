import {
	createOrder,
	deliverOrder,
	getMyOrders,
	getOrderById,
	getOrders,
	payOrder,
} from '../api/apiService';
import {
	errorDelivery,
	errorGetOrder,
	errorMyOrderList,
	errorOrderList,
	errorPay,
	errorPlaceOrder,
	loadingDelivery,
	loadingGetOrder,
	loadingMyOrderList,
	loadingOrderList,
	loadingPay,
	loadingPlaceOrder,
	myOrderListState,
	orderGetState,
	orderListState,
} from '../stores/orderStore';
import type {
	IOrderCreateBody,
	IPaymentResult,
} from '../types/order';
import { runAction } from '../utils/runAction';

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

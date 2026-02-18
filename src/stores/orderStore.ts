import { atom, map } from 'nanostores';
import type { IOrder } from '../types/order';

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

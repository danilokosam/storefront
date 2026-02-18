import { atom } from 'nanostores';
import type { ICartItem } from '../types/cart';

// We check if we are in the browser and if there is a saved cart
const getInitialCart = (): Array<ICartItem> => {
	if (typeof window === 'undefined') return []; // Safety check for SSR
	const savedCart = localStorage.getItem('cart');
	return savedCart ? JSON.parse(savedCart) : [];
};

export const loadingAddCart = atom<boolean>(false);
export const errorAddCart = atom<string | undefined>(undefined);

export const cart = atom<Array<ICartItem> | undefined>(
	getInitialCart(),
);

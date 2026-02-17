import { atom } from 'nanostores';
import { getProductById } from '../api/apiService';
import type { ICartItem } from '../types/cart';
import { runAction } from '../utils/runAction';

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

/**
 * Adds or updates a product in the local cart.
 * It fetches the latest product data to ensure price and stock accuracy.
 */
export const addToCart = async (id: string, qty: number) => {
	// 1. Define the internal "Action" (The business logic task)
	const action = async (): Promise<Array<ICartItem>> => {
		// Fetch fresh data from the server (Price/Stock check)
		const product = await getProductById(id);

		// Business Logic: Prevent adding more items than available in stock
		if (!product.countInStock || product.countInStock < qty) {
			throw new Error('Few items remaining... Reduce quantity');
		}

		// Get current items from the store (defaults to empty array if undefined)
		const cartItems = cart.get() || [];

		// Check if the product is already in the cart
		const existingItem = cartItems.find(
			(item) => item.product === product._id,
		);

		let updatedItems: Array<ICartItem>;

		if (existingItem) {
			// Scenario A: Product exists, so we create a new array with the updated quantity
			updatedItems = cartItems.map((item) =>
				item.product === existingItem.product
					? { ...item, qty }
					: item,
			);
		} else {
			// Scenario B: New product, we create a cart item object and append it
			const newItem: ICartItem = {
				product: product._id,
				name: product.name,
				image: product.image,
				price: product.price,
				countInStock: product.countInStock,
				qty,
			};
			updatedItems = [...cartItems, newItem];
		}

		// This returned value will be passed to 'successAction' by runAction
		return updatedItems;
	};

	// 2. Execute the task through the supervisor (runAction)
	// It automatically handles: loading (true/false) and error catching
	await runAction(action(), {
		loadingStore: loadingAddCart,
		errorStore: errorAddCart,
		// If the action is successful, update the global state and persistence
		successAction: (updatedCart) => {
			cart.set(updatedCart);
			localStorage.setItem('cart', JSON.stringify(updatedCart));
		},
		errorMessage: 'Could not add product to cart',
	});
};

/**
 * Removes a product from the local cart and updates persistence.
 * Since this is a local-only operation, runAction is not required.
 */
export const removeFromCart = (id: string) => {
	try {
		// 1. Get current cart items from the store
		const cartItems = cart.get() || [];

		// 2. Filter out the product that matches the provided ID
		const updatedCart = cartItems.filter(
			(item) => item.product !== id,
		);

		// 3. Update the global state with the new list
		cart.set(updatedCart);

		// 4. Sync the changes with localStorage for persistence
		localStorage.setItem('cart', JSON.stringify(updatedCart));
	} catch (error) {
		// Log unexpected local errors (e.g., localStorage full or quota issues)
		console.error('Error removing item from cart:', error);
	}
};

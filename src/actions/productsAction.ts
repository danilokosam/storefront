import {
	createProduct,
	createProductReview,
	deleteProduct,
	getProductById,
	getProducts,
} from '../api/apiService';
import {
	errorCreateProduct,
	errorDeleteProduct,
	errorGetProduct,
	errorProductList,
	errorReviewProduct,
	loadingCreateProduct,
	loadingDeleteProduct,
	loadingGetProduct,
	loadingProductList,
	loadingReviewProduct,
	productGetState,
	productListState,
	productReviewState,
} from '../stores/productsStore';
import type {
	ICreateProductBody,
	ICreateReviewBody,
	IProduct,
} from '../types/product';
import { runAction } from '../utils/runAction';

export const listProductRequest = async (
	keyword = '',
	pageNumber = '',
) => {
	await runAction(getProducts(keyword, pageNumber), {
		loadingStore: loadingProductList,
		errorStore: errorProductList,
		successAction: (data) => {
			productListState.set({ ...productListState.get(), ...data });
			console.log({ data });
		},
		errorMessage: 'The products could not be loaded.',
	});
};

export const createProductRequest = async (
	productData: ICreateProductBody,
) => {
	await runAction(createProduct(productData), {
		loadingStore: loadingCreateProduct,
		errorStore: errorCreateProduct,
		successAction: (newProduct) => {
			console.log('Created product:', newProduct);

			const currentList = productListState.get();
			if (currentList.products) {
				productListState.set({
					...currentList,
					products: [newProduct, ...currentList.products],
				});
			}
		},
		errorMessage: 'The product could not be created.',
	});
};

export const deleteProductRequest = async (id: string) => {
	await runAction(deleteProduct(id), {
		loadingStore: loadingDeleteProduct,
		errorStore: errorDeleteProduct,
		successAction: (data) => {
			console.log('Product successfully deleted', data);

			const currentList = productListState.get();
			if (currentList.products) {
				productListState.set({
					...currentList,
					products: currentList.products.filter((p) => p._id !== id),
				});
			}
		},
		errorMessage: 'The product could not be deleted.',
	});
};

export const getProductRequest = async (
	id: string,
	ui: boolean = true,
): Promise<IProduct | undefined> => {
	return await runAction(getProductById(id), {
		// If ui is false, we pass undefined and runAction will ignore the sets.
		loadingStore: ui ? loadingGetProduct : undefined,
		errorStore: ui ? errorGetProduct : undefined,
		successAction: (data) => {
			if (ui) productGetState.set(data);
		},
		errorMessage: 'Error al obtener los detalles del producto',
	}).catch(() => undefined); // If it fails, we return undefined to comply with the signature.
};

export const reviewProductRequest = async (
	id: string,
	rating: string,
	comment: string,
): Promise<IProduct | undefined> => {
	// We convert the rating to a number before sending it.
	const reviewData: ICreateReviewBody = {
		rating: Number(rating),
		comment,
	};

	return await runAction(createProductReview(id, reviewData), {
		loadingStore: loadingReviewProduct,
		errorStore: errorReviewProduct,
		successAction: (updatedProduct) => {
			// We update the status of the review/product.
			productReviewState.set(updatedProduct);

			productGetState.set(updatedProduct);

			console.log('Review successfully created');
		},
		errorMessage: 'Failed to submit the review',
	}).catch(() => undefined);
};

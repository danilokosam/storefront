import { atom, map } from 'nanostores';
import type { IProduct, ProductListRequest } from '../types/product';

export const loadingProductList = atom<boolean>(false);
export const errorProductList = atom<string | undefined>(undefined);
export const productListState = map<ProductListRequest>({
	page: 0,
	pages: 0,
	products: undefined,
});

export const loadingCreateProduct = atom<boolean>(false);
export const errorCreateProduct = atom<string | undefined>(undefined);

export const loadingDeleteProduct = atom<boolean>(false);
export const errorDeleteProduct = atom<string | undefined>(undefined);

export const loadingGetProduct = atom<boolean>(false);
export const errorGetProduct = atom<string | undefined>(undefined);
export const productGetState = map<IProduct>();

export const loadingReviewProduct = atom<boolean>(false);
export const errorReviewProduct = atom<string | undefined>(undefined);
export const productReviewState = map<IProduct>();

import type { IUser } from './user';

interface IReview {
	name: string;
	rating: number;
	comment: string;
	user: string;
}

export type IProduct = {
	_id: string;
	user: IUser | string;
	name: string;
	image: string;
	brand: string;
	category: string;
	description: string;
	reviews: Array<IReview>;
	rating: number;
	numReviews: number;
	price: number;
	countInStock: number;
};

export type ProductListRequest = {
	products?: Array<IProduct> | undefined;
	page?: number;
	pages?: number;
};

export interface ICreateProductBody {
	name: string;
	price: string; // Pending backend implementation
	brand: string;
	category: string;
	countInStock: string; // Pending backend implementation
	description: string;
	image: string;
}

export interface ICreateReviewBody {
	rating: number;
	comment: string;
}

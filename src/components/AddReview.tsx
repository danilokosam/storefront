import { useStore } from '@nanostores/react';
import { useCallback, useState } from 'react';
import {
	getProductRequest,
	reviewProductRequest,
} from '../actions/productsAction';
import {
	errorReviewProduct,
	loadingReviewProduct,
} from '../stores/productsStore';
import { Button } from './Button';
import { Message } from './Message';
import { Select } from './Select';

const TEXTAREA_CLASSES =
	'border-2 border-slate-400 p-2 rounded-lg w-full focus:border-slate-900 outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed';

type AddReviewProps = {
	id: string;
};

export const AddReview = ({ id }: AddReviewProps) => {
	const error = useStore(errorReviewProduct);
	const loading = useStore(loadingReviewProduct);

	const [comment, setComment] = useState<string>('');
	const [rating, setRating] = useState<string>('');

	const handleAddReview = useCallback(
		async (e: React.SubmitEvent<HTMLFormElement>) => {
			e.preventDefault();

			if (!comment || !rating) return;

			try {
				// We send the request to the API.
				await reviewProductRequest(id, rating, comment);

				// If successful, refresh the product data
				await getProductRequest(id);

				// Clear the form
				setComment('');
				setRating('');
			} catch (err) {
				// The error is already handled in the store (errorReviewProduct)
				console.error('Error submitting the review:', err);
			}
		},
		[id, rating, comment],
	);

	return (
		<div className="w-full max-w-2xl">
			<h2 className="text-xl pt-6 pb-4 uppercase font-bold tracking-wide">
				Add Reviews
			</h2>

			<form
				onSubmit={handleAddReview}
				className="flex flex-col gap-4"
			>
				{error && <Message variant="danger">{error}</Message>}

				<div className="flex flex-col gap-1">
					<label
						htmlFor="rating"
						className="font-medium text-slate-700"
					>
						Rating
					</label>
					<Select
						length={5}
						onChange={(e) => setRating(e.target.value)}
						value={rating}
						name="rating"
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label
						htmlFor="comment"
						className="font-medium text-slate-700"
					>
						Comment
					</label>
					<textarea
						name="comment"
						id="comment"
						placeholder="Write your review here..."
						className={TEXTAREA_CLASSES}
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						required
						rows={4}
						disabled={loading}
					/>
				</div>

				<div className="pt-2">
					<Button size="small" loading={loading} type="submit">
						Submit Review
					</Button>
				</div>
			</form>
		</div>
	);
};

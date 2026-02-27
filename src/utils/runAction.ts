import axios from 'axios';
import type { WritableAtom } from 'nanostores';

/**
 * Configuration options for the runAction utility.
 */
interface ActionOptions<T> {
	/** The store to toggle loading state (true during execution, false after). */
	loadingStore?: WritableAtom<boolean>;
	/** The store to update if an error occurs. */
	errorStore?: WritableAtom<string | undefined>;
	/** Callback executed upon successful promise resolution. */
	successAction: (data: T) => void;
	/** Custom error message if the promise fails and no API error message is found. */
	errorMessage?: string;
}

/**
 * A wrapper utility to handle asynchronous API calls, manage loading/error states,
 * and execute callbacks on success.
 *
 * @template T - The expected return type of the promise.
 * @param {Promise<T>} promise - The asynchronous API call to perform.
 * @param {ActionOptions<T>} options - The configuration object for stores and callbacks.
 * @returns {Promise<T>} - The result of the promise if successful.
 * @throws {unknown} - Re-throws the original error after updating the error store.
 */
export const runAction = async <T>(
	promise: Promise<T>,
	options: ActionOptions<T>,
): Promise<T> => {
	const { loadingStore, errorStore, successAction, errorMessage } =
		options;

	// Reset error state and start loading
	errorStore?.set(undefined);
	loadingStore?.set(true);

	try {
		const data = await promise;
		successAction(data);
		return data;
	} catch (error: unknown) {
		// Handle Axios-specific errors or fallback to default error message
		if (axios.isAxiosError(error)) {
			errorStore?.set(error.response?.data?.message || error.message);
		} else {
			errorStore?.set(errorMessage || 'An unexpected error occurred');
			console.error(error);
		}
		throw error;
	} finally {
		// Ensure loading state is cleared regardless of outcome
		loadingStore?.set(false);
	}
};

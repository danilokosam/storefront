import axios from "axios";
import type { WritableAtom } from "nanostores";

interface ActionOptions<T> {
  loadingStore: WritableAtom<boolean>;
  errorStore: WritableAtom<string | undefined>;
  successAction: (data: T) => void;
  errorMessage?: string;
}

export const runAction = async <T>(
  promise: Promise<T>,
  options: ActionOptions<T>,
) => {
  const { loadingStore, errorStore, successAction, errorMessage } = options;

  errorStore.set(undefined);
  loadingStore.set(true);

  try {
    const data = await promise;
    successAction(data);
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      errorStore.set(error.response?.data?.message || error.message);
    } else {
      errorStore.set(errorMessage || "An unexpected error occurred");
      console.error(error);
    }
    throw error;
  } finally {
    loadingStore.set(false);
  }
};

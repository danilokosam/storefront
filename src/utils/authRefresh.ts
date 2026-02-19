import axios from 'axios';

/**
 * This function is responsible for requesting a new token from the server.
 * A separate axios instance or the global one is used to avoid
 * entering the main instance's interceptor during refresh.
 */
export const refreshToken = async (): Promise<string | null> => {
	try {
		const userStorage = localStorage.getItem('user');
		if (!userStorage) return null;

		const user = JSON.parse(userStorage);

		// Call to the backend refresh endpoint
		// PENDING to change to the correct endpoint when available
		const response = await axios.post(
			`${import.meta.env.PUBLIC_API_URL}/api/users/refresh`,
			{
				token: user.token,
			},
		);

		const newToken = response.data.token;

		// We update the localStorage with the new token, retaining the user's data.
		localStorage.setItem(
			'user',
			JSON.stringify({ ...user, token: newToken }),
		);

		return newToken;
	} catch (error) {
		console.error('Critical error refreshing token:', error);
		return null;
	}
};

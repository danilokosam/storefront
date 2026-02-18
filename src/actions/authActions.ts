import { loginUser, registerUser } from '../api/apiService';
import {
	authState,
	errorLogin,
	errorRegister,
	loadingLogin,
	loadingRegister,
} from '../stores/authStore';
import { runAction } from '../utils/runAction';

export const registerRequest = async (
	name: string,
	email: string,
	password: string,
) => {
	await runAction(registerUser({ name, email, password }), {
		loadingStore: loadingRegister,
		errorStore: errorRegister,
		successAction: (data) => {
			authState.set({ ...authState.get(), ...data });

			localStorage.setItem('user', JSON.stringify(data));

			window.location.href = '/';
		},
		errorMessage: 'Error when attempting to register the user',
	});
};

export const loginRequest = async (
	email: string,
	password: string,
) => {
	await runAction(loginUser({ email, password }), {
		loadingStore: loadingLogin,
		errorStore: errorLogin,
		successAction: (data) => {
			authState.set({ ...authState.get(), ...data });

			localStorage.setItem('user', JSON.stringify(data));

			window.location.href = '/';
		},
		errorMessage: 'Incorrect credentials or connection error',
	});
};

import { atom, map } from 'nanostores';
import { loginUser, registerUser } from '../api/apiService';
import type { AuthState } from '../types/auth';
import { runAction } from '../utils/runAction';

export const authInitialState: AuthState = {
	id: '',
	name: '',
	email: '',
	isAdmin: false,
	token: '',
};

export const loadingRegister = atom<boolean>(false);
export const errorRegister = atom<string | undefined>(undefined);

export const loadingLogin = atom<boolean>(false);
export const errorLogin = atom<string | undefined>(undefined);

export const authState = map<AuthState>(authInitialState);

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

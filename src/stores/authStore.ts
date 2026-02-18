import { atom, map } from 'nanostores';
import type { AuthState } from '../types/auth';

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

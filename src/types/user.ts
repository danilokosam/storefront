import type { AuthState } from './auth';
export type IUser = Omit<AuthState, 'token'>;
export type IUsers = Array<IUser>;
export interface IUpdateUserBody {
	name: string;
	email: string;
}

export interface IMakeAdminBody {
	isAdmin: boolean;
}

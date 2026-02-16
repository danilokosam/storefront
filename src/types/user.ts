import type { AuthState } from './auth';
export type IUser = Omit<AuthState, 'token'>;
export type IUsers = Array<IUser>;

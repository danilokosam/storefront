import { atom, map } from 'nanostores';
import type { IUser, IUsers } from '../types/user';

export const loadingGetProfile = atom<boolean>(false);
export const errorGetProfile = atom<string | undefined>(undefined);
export const getProfileState = map<IUser>();

export const loadingUpdateProfile = atom<boolean>(false);
export const errorUpdateProfile = atom<string | undefined>(undefined);
export const updateProfileState = map<IUser>();

export const loadingUsers = atom<boolean>(false);
export const errorUsers = atom<string | undefined>(undefined);
export const usersState = atom<IUsers>([]);

export const loadingUpdateUser = atom<boolean>(false);
export const errorUpdateUser = atom<string | undefined>(undefined);

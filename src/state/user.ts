import axios from "axios";
import { atom, map } from "nanostores";
import type { AuthState } from "./auth";
import {
  getProfile,
  updateProfile,
  getUsers,
  makeAdmin,
} from "../api/apiService";
import { runAction } from "../utils/runAction";

export type IUser = Omit<AuthState, "token">;
export type IUsers = Array<IUser>;

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

export const loadProfileAction = () =>
  runAction(getProfile(), {
    loadingStore: loadingGetProfile,
    errorStore: errorGetProfile,
    successAction: (data) => getProfileState.set(data),
  });

export const updateProfileAction = (name: string, email: string) =>
  runAction(updateProfile({ name, email }), {
    loadingStore: loadingUpdateProfile,
    errorStore: errorUpdateProfile,
    successAction: (updatedUser) => getProfileState.set(updatedUser),
    errorMessage: "Error updating profile",
  });

export const loadUsersAction = () =>
  runAction(getUsers(), {
    loadingStore: loadingUsers,
    errorStore: errorUsers,
    successAction: (users) => usersState.set(users),
    errorMessage: "Error loading user list",
  });

export const makeAdminAction = (id: string) =>
  runAction(makeAdmin(id), {
    loadingStore: loadingUpdateUser,
    errorStore: errorUpdateUser,
    errorMessage: "Error updating administrator permissions",
    successAction: (updatedUser) => {
      const currentUsers = usersState.get();
      const newUsers = currentUsers.map((u) => (u.id === id ? updatedUser : u));
      usersState.set(newUsers);
    },
  });

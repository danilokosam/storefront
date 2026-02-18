import {
	getProfile,
	getUsers,
	makeAdmin,
	updateProfile,
} from '../api/apiService';
import {
	errorGetProfile,
	errorUpdateProfile,
	errorUpdateUser,
	errorUsers,
	getProfileState,
	loadingGetProfile,
	loadingUpdateProfile,
	loadingUpdateUser,
	loadingUsers,
	usersState,
} from '../stores/userStore';
import { runAction } from '../utils/runAction';

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
		errorMessage: 'Error updating profile',
	});

export const loadUsersAction = () =>
	runAction(getUsers(), {
		loadingStore: loadingUsers,
		errorStore: errorUsers,
		successAction: (users) => usersState.set(users),
		errorMessage: 'Error loading user list',
	});

export const makeAdminAction = (id: string) =>
	runAction(makeAdmin(id), {
		loadingStore: loadingUpdateUser,
		errorStore: errorUpdateUser,
		errorMessage: 'Error updating administrator permissions',
		successAction: (updatedUser) => {
			const currentUsers = usersState.get();
			const newUsers = currentUsers.map((u) =>
				u.id === id ? updatedUser : u,
			);
			usersState.set(newUsers);
		},
	});

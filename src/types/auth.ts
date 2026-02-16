export interface AuthState {
	id: string;
	_id?: string;
	name: string;
	email: string;
	isAdmin: boolean;
	token: string;
}

export interface IRegisterBody {
	name: string;
	email: string;
	password: string;
}

export interface ILoginBody {
	email: string;
	password: string;
}

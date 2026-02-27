import { useStore } from '@nanostores/react';
import { useCallback, useState } from 'react';
import { registerRequest } from '../actions/authActions';
import { errorRegister, loadingRegister } from '../stores/authStore';
import { Button } from './Button';
import { Input } from './Input';
import { Message } from './Message';

export const RegisterForm = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');

	const loading = useStore(loadingRegister);
	const error = useStore(errorRegister);

	const handleRegister = useCallback(
		async (e: React.SyntheticEvent) => {
			e.preventDefault();

			if (password !== confirmPassword) {
				setMessage('Passwords do not match');
				return;
			}

			setMessage('');
			await registerRequest(name, email, password);
		},
		[name, email, password, confirmPassword],
	);

	return (
		<form
			onSubmit={handleRegister}
			className="max-w-125 mx-auto py-6 flex flex-col gap-4"
		>
			<h2 className="text-2xl font-bold mb-2">Create Account</h2>

			{(message || error) && (
				<Message variant="danger">{message || error}</Message>
			)}

			<Input
				label="Name"
				id="name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="Enter name"
				required
			/>
			<Input
				label="Email"
				id="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Enter email"
				type="email"
				required
			/>
			<Input
				label="Password"
				id="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Enter password"
				type="password"
				required
			/>
			<Input
				label="Confirm Password"
				id="confirmPassword"
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
				placeholder="Confirm password"
				type="password"
				required
			/>

			<p className="text-right text-sm">
				Already have an account?{' '}
				<a href="/login" className="text-blue-500 hover:underline">
					Login
				</a>
			</p>

			<Button loading={loading} type="submit" className="w-full">
				Register
			</Button>
		</form>
	);
};

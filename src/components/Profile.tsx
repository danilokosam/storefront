import { useStore } from '@nanostores/react';
import { useEffect, useState } from 'react';
import { listMyOrdersRequest } from '../actions/orderActions';
import {
	loadProfileAction,
	updateProfileAction,
} from '../actions/userActions';
import {
	errorMyOrderList,
	loadingMyOrderList,
	myOrderListState,
} from '../stores/orderStore';
import {
	errorGetProfile,
	getProfileState,
	loadingGetProfile,
} from '../stores/userStore';
import { Button } from './Button';
import { Input } from './Input';
import { Loader } from './Loader';
import { Message } from './Message';

export const Profile = () => {
	const profile = useStore(getProfileState);
	const loadingProfile = useStore(loadingGetProfile);
	const errorProfile = useStore(errorGetProfile);

	const orders = useStore(myOrderListState);
	const loadingOrders = useStore(loadingMyOrderList);
	const errorOrders = useStore(errorMyOrderList);

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	useEffect(() => {
		loadProfileAction();
		listMyOrdersRequest();
	}, []);

	useEffect(() => {
		if (profile) {
			setName(profile.name || '');
			setEmail(profile.email || '');
		}
	}, [profile]);

	const handleUpdate = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		await updateProfileAction(name, email);
	};

	return (
		<div className="grid md:grid-cols-2 gap-10 p-6">
			{/* Section: Profile Editing */}
			<section>
				<h2 className="text-2xl font-bold mb-6">User Profile</h2>

				{errorProfile && (
					<Message variant="danger">{errorProfile}</Message>
				)}

				{loadingProfile ? (
					<Loader />
				) : (
					<form
						onSubmit={handleUpdate}
						className="flex flex-col gap-4 bg-slate-50 p-6 rounded-xl border"
					>
						<Input
							label="Name"
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<Input
							label="Email"
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Button type="submit">Update Profile</Button>
					</form>
				)}
			</section>

			{/* Section: Order List */}
			<section>
				<h2 className="text-2xl font-bold mb-6">My Orders</h2>

				{errorOrders && (
					<Message variant="danger">{errorOrders}</Message>
				)}

				{loadingOrders ? (
					<Loader />
				) : (
					<div className="overflow-x-auto">
						<table className="w-full text-left border-collapse">
							<thead>
								<tr className="border-b-2">
									<th className="p-2">ID</th>
									<th className="p-2">Total</th>
								</tr>
							</thead>
							<tbody>
								{orders.length > 0 ? (
									orders.map((order) => (
										<tr
											key={order._id}
											className="border-b hover:bg-slate-50"
										>
											<td className="p-2">{order._id}</td>
											<td className="p-2">${order.totalPrice}</td>
										</tr>
									))
								) : (
									<tr>
										<td
											colSpan={2}
											className="p-4 text-center text-slate-500"
										>
											No orders found
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				)}
			</section>
		</div>
	);
};

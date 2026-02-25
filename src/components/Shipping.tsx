import { useCallback, useEffect, useState } from 'react';
import { Button } from './Button';
import { Heading } from './Heading';
import { Input } from './Input';

export const Shipping = () => {
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [country, setCountry] = useState('');

	useEffect(() => {
		const savedAddress = localStorage.getItem('shippingAddress');
		if (savedAddress) {
			const { address, city, postalCode, country } =
				JSON.parse(savedAddress);
			setAddress(address || '');
			setCity(city || '');
			setPostalCode(postalCode || '');
			setCountry(country || '');
		}
	}, []);

	const handleSaveShippingAddress = useCallback(
		(e: React.SyntheticEvent) => {
			e.preventDefault();
			const shippingData = { address, city, postalCode, country };
			localStorage.setItem(
				'shippingAddress',
				JSON.stringify(shippingData),
			);
			window.location.replace('/checkout?segment=payment');
		},
		[address, city, postalCode, country],
	);

	return (
		<div className="w-full">
			<form
				onSubmit={handleSaveShippingAddress}
				className="max-w-125 mx-auto py-6 pb-28 flex flex-col gap-4"
			>
				<Heading text="Shipping Address" variant="h3" />

				<Input
					label="Address"
					id="address"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					placeholder="Enter address"
					required
				/>

				<Input
					label="City"
					id="city"
					value={city}
					onChange={(e) => setCity(e.target.value)}
					placeholder="Enter city"
					required
				/>

				<Input
					label="Postal Code"
					id="postalCode"
					value={postalCode}
					onChange={(e) => setPostalCode(e.target.value)}
					placeholder="Enter postal code"
					required
				/>

				<Input
					label="Country"
					id="country"
					value={country}
					onChange={(e) => setCountry(e.target.value)}
					placeholder="Enter country"
					required
				/>

				<div className="pt-4">
					<Button type="submit">Save and Continue</Button>
				</div>
			</form>
		</div>
	);
};

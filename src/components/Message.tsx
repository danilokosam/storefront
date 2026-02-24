type MessageProps = {
	variant: keyof typeof MESSAGE_VARIANTS;
	children: React.ReactNode;
};

const MESSAGE_VARIANTS = {
	secondary: {
		container: 'bg-gray-100 border-gray-400 text-gray-700',
		label: null,
	},
	danger: {
		container: 'bg-red-100 border-red-400 text-red-700',
		label: 'Error!',
	},
	info: {
		container: 'bg-blue-50 border-blue-300 text-blue-600',
		label: null,
	},
	success: {
		container: 'bg-green-100 border-green-400 text-green-700',
		label: 'Successful!',
	},
};

const BASE_CONTAINER_STYLES =
	'border px-4 py-3 rounded relative my-2';

export const Message = ({ variant, children }: MessageProps) => {
	const { container, label } = MESSAGE_VARIANTS[variant];

	return (
		<div
			className={`${BASE_CONTAINER_STYLES} ${container}`}
			role="alert"
		>
			{label && <strong className="font-bold mr-3">{label}</strong>}
			<span className="block sm:inline">{children}</span>
		</div>
	);
};

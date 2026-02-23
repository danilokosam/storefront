type LoaderProps = {
	variant?: 'small' | 'large';
};

const LOADER_SIZES = {
	small: 'h-6 w-6 border-t-2',
	large: 'h-12 w-12 border-t-4',
};

export const Loader = ({ variant = 'small' }: LoaderProps) => {
	return (
		<div className="flex items-center justify-center">
			<div
				className={`animate-spin rounded-full border-blue-500 border-solid border-r-transparent ${LOADER_SIZES[variant]}`}
			></div>
			<span className="sr-only">Loading...</span>
		</div>
	);
};

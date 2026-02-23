import { Loader } from './Loader';

type ButtonProps = {
	children: React.ReactNode;
	loading?: boolean;
	size?: 'small' | 'large';
	onClick?: () => void;
	type?: 'submit' | 'button' | 'reset';
	disabled?: boolean;
	className?: string;
};

const BUTTON_STYLES = {
	base: 'flex gap-3 justify-center items-center rounded-2xl px-5 py-2 font-medium transition-colors duration-200 mt-8 w-full text-lg md:text-xl text-white',
	sizes: {
		small: 'max-w-[250px]',
		large: 'max-w-[500px] mx-auto',
	},
	states: {
		active: 'bg-slate-900 hover:bg-slate-800 cursor-pointer',
		disabled: 'bg-slate-400 cursor-not-allowed',
	},
};

export const Button = ({
	children,
	loading,
	size = 'large',
	onClick,
	type = 'button',
	disabled,
	className = '',
}: ButtonProps) => {
	const isButtonDisabled = disabled || loading;
	const stateClass = isButtonDisabled
		? BUTTON_STYLES.states.disabled
		: BUTTON_STYLES.states.active;
	const sizeClass = BUTTON_STYLES.sizes[size];

	return (
		<button
			className={`${BUTTON_STYLES.base} ${sizeClass} ${stateClass} ${className}`}
			disabled={isButtonDisabled}
			onClick={onClick}
			type={type}
		>
			{children}
			{loading && <Loader variant="small" />}
		</button>
	);
};

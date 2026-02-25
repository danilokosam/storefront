type InputProps = {
	label: string;
	id: string;
	type?: string;
	placeholder?: string;
	required?: boolean;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const INPUT_CLASSES =
	'border-2 border-slate-400 p-2 rounded-lg w-full focus:border-slate-900 outline-none transition-colors';

export const Input = ({
	label,
	id,
	type = 'text',
	placeholder = '',
	required = false,
	value,
	onChange,
}: InputProps) => {
	return (
		<div className="flex flex-col gap-1">
			<label htmlFor={id} className="font-medium text-slate-700">
				{label}:
			</label>
			<input
				id={id}
				type={type}
				placeholder={placeholder}
				required={required}
				value={value}
				onChange={onChange}
				className={INPUT_CLASSES}
			/>
		</div>
	);
};

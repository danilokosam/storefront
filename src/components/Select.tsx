const SELECT_BASE_CLASSES =
	'border-2 border-slate-400 p-2 rounded-lg w-full focus:border-slate-900 outline-none transition-colors';

type SelectProps = {
	value: string | number;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	name?: string;
	length: number;
	maxWidth?: string;
};

export const Select = ({
	value,
	onChange,
	name = 'count in stock',
	length,
	maxWidth = '100px',
}: SelectProps) => {
	const options = Array.from({ length }, (_, i) => i + 1);

	return (
		<select
			name={name}
			onChange={onChange}
			value={value}
			className={SELECT_BASE_CLASSES}
			style={{ maxWidth }}
		>
			<option value="" disabled>
				Select...
			</option>

			{options.map((num) => (
				<option key={num} value={num}>
					{num}
				</option>
			))}
		</select>
	);
};

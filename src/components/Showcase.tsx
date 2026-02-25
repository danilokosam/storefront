const SHOWCASE_CONTAINER_CLASSES =
	'w-full max-w-[1800px] h-[300px] md:h-[500px] ' +
	'flex justify-center items-center text-center p-8 ' +
	'border-2 border-dashed border-slate-300 rounded-3xl ' +
	'bg-gradient-to-br from-slate-50 to-slate-200 ' +
	'text-slate-500 text-2xl md:text-4xl font-light';

export const Showcase = () => {
	return (
		<section className="w-full flex justify-center py-8">
			<div className={SHOWCASE_CONTAINER_CLASSES}>
				<p className="max-w-2xl balance">
					Showcase top products here or show any special ad here
				</p>
			</div>
		</section>
	);
};

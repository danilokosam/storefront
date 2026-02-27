import {
	IoMdStar,
	IoMdStarHalf,
	IoMdStarOutline,
} from 'react-icons/io';

type RatingProps = {
	value: number;
	text?: string;
};

export const Rating = ({ value, text }: RatingProps) => {
	const clampedValue = Math.min(Math.max(value, 0), 5);
	return (
		<div>
			<div className="flex text-yellow-500">
				{Array.from({ length: 5 }, (_, i) => {
					const starValue = i + 1;
					const key = `star-${starValue}`;

					if (clampedValue >= starValue)
						return <IoMdStar key={key} size={20} />;
					if (clampedValue >= starValue - 0.5)
						return <IoMdStarHalf key={key} size={20} />;
					return <IoMdStarOutline key={key} size={20} />;
				})}
			</div>

			{text && (
				<span className="text-sm block pl-1 capitalize">{text}</span>
			)}
		</div>
	);
};

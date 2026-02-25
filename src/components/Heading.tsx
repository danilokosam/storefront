const HEADING_VARIANTS = {
  h1: "text-xl md:text-3xl font-bold py-6",
  h2: "text-lg md:text-2xl font-bold",
  h3: "text-lg md:text-xl",
};

const TEXT_ALIGN = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

type HeadingProps = {
  text: string;
  variant?: keyof typeof HEADING_VARIANTS;
  textAlign?: keyof typeof TEXT_ALIGN;
};

export const Heading = ({
  text,
  variant = "h1",
  textAlign = "left",
}: HeadingProps) => {
  const Tag = variant;
  return (
    <Tag
      className={`${HEADING_VARIANTS[variant]} ${TEXT_ALIGN[textAlign]} mx-auto`}
    >
      {text}
    </Tag>
  );
};

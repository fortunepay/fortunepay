interface TitleHeadingProps {
  text: string;
  color?: string;
  align?: "left" | "center" | "right";
  marginTop?: string;
  marginBottom?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const alignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const sizeClasses = {
  // sm: "text-xl md:text-2xl",
  // md: "text-2xl md:text-3xl",
  // lg: "text-3xl md:text-4xl",
  // xl: "text-4xl md:text-5xl",
  sm: "text-xl",
  md: "text-3xl",
  lg: "text-4xl",
  xl: "text-5xl",
  xxl: "text-7xl",
};

export default function TitleHeading({
  text,
  color = "text-white",
  align = "left",
  marginTop = "mt-0",
  marginBottom = "mb-4",
  size = "xl",
}: TitleHeadingProps) {
  return (
    <h1
      className={`
            font-bold
            leading-tight tracking-tight
            ${color}
            ${alignClasses[align]}
            ${sizeClasses[size]}
            ${marginTop}
            ${marginBottom}
        `}
    >
      {text}
    </h1>
  );
}
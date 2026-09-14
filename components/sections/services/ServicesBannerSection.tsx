interface ServicesBannerSectionProps {
    heading: string;
    headingAccent?: string;
    subheading?: string;
    height?: string;
    backgroundColor?: string;
    backgroundImage?: string;
    image?: string;
    imageAlt?: string;
    textColor?: string;

    backgroundImagePosition?: string;
    backgroundImageSize?: string;
    backgroundImageHeight?: string;
    textPosition?: "left" | "right" | "center";
}

export default function ServicesBannerSection({
    heading,
    height = "100vh",
    headingAccent,
    subheading,
    backgroundColor,
    backgroundImage,
    textColor = "text-white",
    backgroundImagePosition = "center",
    backgroundImageSize = "cover",
    backgroundImageHeight,
    textPosition = "left",
}: ServicesBannerSectionProps) {
    const bgClass = backgroundImage
        ? ""
        : backgroundColor
            ? backgroundColor
            : `bg-gradient-to-br`;

    return (
        <section
            className="relative w-full overflow-hidden"
            style={{
                minHeight: height,
                background: backgroundColor,
            }}
        >
            {backgroundImage && (
                <div
                    className="absolute inset-0 priority" 
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: backgroundImagePosition,
                        backgroundSize: backgroundImageSize,
                        height: backgroundImageHeight || "100%",
                       
                    }}
                />
            )}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 flex items-center">
                <div
                    className={`flex w-full ${textColor} ${textPosition === "left"
                            ? "justify-start"
                            : "justify-end"
                        }`}
                >
                    <div className="max-w-lg lg:py-40 lg:pt-50">
                        <h5 className="text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-sm">
                            {heading}
                            {headingAccent && (
                                <>
                                    <br />
                                    <span>{headingAccent}</span>
                                </>
                            )}
                        </h5>
                        {subheading && (
                            <p className="mt-3 text-2xl leading-relaxed">
                                {subheading}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
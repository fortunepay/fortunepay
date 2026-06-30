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
    // image,
    // imageAlt = "illustration",
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
        // <section
        //     className={`
        //         relative min-h-50 w-full overflow-hidden
        //         ${bgClass}
        //     `}
        //     style={{ minHeight: height }}
        // >
        <section
            className="relative w-full overflow-hidden"
            style={{
                minHeight: height,
                background: backgroundColor,
            }}
        >
            {backgroundImage && (
                // <div className="absolute inset-0">
                //     <Image
                //         src={backgroundImage}
                //         alt="ServiceSend Background"
                //         fill
                //         loading="lazy"
                //         unoptimized
                //         className="object-cover"
                //     />
                // </div>
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: backgroundImagePosition,
                        backgroundSize: backgroundImageSize,
                        height: backgroundImageHeight || "100%",
                    }}
                />
            )}
            {/* <div className="absolute inset-0 bg-[linear-gradient(to_top,white_0%,rgba(255,255,255,0.6)_4%,transparent_25%)]" /> */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 flex items-center">
                {/* {image && (
                    <div className="hidden lg:flex shrink-0 items-end self-end">
                        <img
                            src={image}
                            alt={imageAlt}
                            className="w-56 xl:w-72 object-contain drop-shadow-2xl translate-y-6"
                        />
                    </div>
                )} */}
                <div
                    className={`flex w-full ${textColor} ${textPosition === "left"
                            ? "justify-start"
                            : "justify-end"
                        }`}
                >
                    <div className="max-w-lg py-16 lg:py-30">
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
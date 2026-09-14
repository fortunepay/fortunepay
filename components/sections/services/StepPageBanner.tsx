import { SectionBannerProps } from "@/types/public/userTypes";

export function SectionBanner({
    icon,
    label,
    title,
    backgroundColor = "",
    color = "",
    backgroundImage,
    backgroundImageAlt,
    imageClassName = "",
    className = "",
}: SectionBannerProps) {
    return (
        <div
            className={`relative mb-12 overflow-hidden rounded-2xl ${backgroundColor} px-5 py-10 sm:px-12 sm:py-14 md:py-16 ${className}`}
        >
            <div className="pointer-events-none absolute -bottom-20 -right-20 z-0 hidden h-100 w-150 sm:block">
                <div
                    className="absolute inset-0 z-10"
                    style={{
                        backgroundImage: `linear-gradient(to left, transparent, ${color}1A 80%, ${color} 100%)`,
                    }}
                />

                <img
                    src={backgroundImage}
                    alt={backgroundImageAlt}
                    className={`h-full w-full object-contain ${imageClassName}`}
                    draggable={false}
                />
            </div>

            <div className="relative z-10 flex items-center justify-between gap-6">
                <div className="flex max-w-xl flex-col items-start gap-3">
                    {(icon || label) && (
                        <div className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 backdrop-blur-sm">
                            {icon}
                            {label && (
                                <span className="text-xs font-semibold uppercase tracking-widest text-white">
                                    {label}
                                </span>
                            )}
                        </div>
                    )}
                    <h5 className="font-bold text-white text-4xl">{title}</h5>
                </div>
            </div>
        </div>
    );
}

export default SectionBanner;
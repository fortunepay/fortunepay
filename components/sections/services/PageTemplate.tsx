import ServicesBannerSection from "@/components/sections/services/ServicesBannerSection";
import { StackedSlider } from "@/components/carousel/StackedCardSlider";
import { StackedSliderItem } from "@/types/public/userTypes";
import { Send } from "@/components/icons/IconPacks";

interface CardsProps {
    label?: string;
    labelAccent?: string;
    accentColor?: string;
    items: StackedSliderItem[];
    cardWidth?: number;
    cardHeight?: number;
    gap?: number;
    stackOffset?: number;
    rotation?: number;
}

interface HeroProps {
    heading: string;
    height?: string;
    headingAccent?: string;
    subheading?: string;
    backgroundColor?: string;
    backgroundImage?: string;
    image?: string;
    imageAlt?: string;
    textColor?: string;
    textPosition?: "left" | "right" | "center";
    backgroundImagePosition?: string;
    backgroundImageSize?: string;
    backgroundImageHeight?: string;
}

interface ServicePageTemplateProps {
    hero: HeroProps;
    cards?: CardsProps;
    // bentoGrid?: BentoGridProps;
}

export default function ServicePageTemplate({
    hero,
    cards,
}: ServicePageTemplateProps) {

    const {
        label,
        labelAccent,
        accentColor = "text-yellow-400",
        items = [],
        cardWidth = 500,
        cardHeight = 300,
        gap = 24,
        stackOffset = 28,
    } = cards ?? {};
    return (
        <>
            <ServicesBannerSection {...hero} />
            {cards && (
                <section className=" w-full">
                    {/* bg-linear-to-t from-[#E7F7FF] */}
                    <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-20">
                        {(label || labelAccent) && (
                            <p className="text-2xl lg:text-4xl font-bold text-blue-600 mb-10 text-center">
                                {label && <span>{label} </span>}
                                {labelAccent && (
                                    <span className={accentColor}>{labelAccent}</span>
                                )}
                            </p>
                        )}

                        {items.length > 0 && (
                            <StackedSlider
                                items={items}
                                cardWidth={cardWidth}
                                cardHeight={cardHeight}
                                gap={gap}
                                stackOffset={stackOffset}
                            />
                        )}
                    </div>
                </section>
            )}
        </>
    );
}
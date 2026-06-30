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

interface BentoCard {
    icon: React.ReactNode;
    title: string;
    description: string;
    buttonLabel: string;
    buttonIcon?: React.ReactNode;
    accent?: boolean;
}

interface BentoGridProps {
    cards: [BentoCard, BentoCard, BentoCard, BentoCard];
}

interface ServicePageTemplateProps {
    hero: HeroProps;
    cards?: CardsProps;
    bentoGrid?: BentoGridProps;
}

const defaultBentoGrid: BentoGridProps = {
    cards: [
        {
            icon: <Send className="w-5 h-5" />,
            title: "Fast Transfers",
            description: "Send money instantly.",
            buttonLabel: "Learn More",
            buttonIcon: <Send className="w-4 h-4" />,
        },
        {
            icon: <Send className="w-5 h-5" />,
            title: "Secure Payments",
            description: "Protected transactions.",
            buttonLabel: "Explore",
            buttonIcon: <Send className="w-4 h-4" />,
        },
        {
            icon: <Send className="w-5 h-5" />,
            title: "Low Fees",
            description: "Competitive rates.",
            buttonLabel: "View",
            buttonIcon: <Send className="w-4 h-4" />,
        },
        {
            icon: <Send className="w-5 h-5" />,
            title: "Global Reach",
            description: "Available worldwide.",
            buttonLabel: "Get Started",
            buttonIcon: <Send className="w-4 h-4" />,
        },
    ],
};

export default function ServicePageTemplate({
    hero,
    cards,
    bentoGrid,
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

    const grid = bentoGrid ?? defaultBentoGrid;

    return (
        <>
            <ServicesBannerSection {...hero} />
            {cards && (
                <section className="bg-linear-to-t from-[#E7F7FF] w-full">
                    {/* Slider */}
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
                    
                    {/* Bento Grid */}
                    <div className="max-w-7xl mx-auto px-6 lg:px-16 pb-14 lg:pb-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div className="md:row-span-2 bg-white border border-gray-100 rounded-2xl p-6 flex flex-col justify-between min-h-80">
                                <div>
                                    <div className="w-10 h-7 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                                        {grid.cards[0].icon}
                                    </div>

                                    <h3 className="text-base font-bold text-blue-600 mb-2">
                                        {grid.cards[0].title}
                                    </h3>

                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {grid.cards[0].description}
                                    </p>
                                </div>

                                <button className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 border border-blue-200 rounded-full px-4 py-1.5 w-fit hover:bg-blue-50 transition-colors">
                                    {grid.cards[0].buttonIcon}
                                    {grid.cards[0].buttonLabel}
                                </button>
                            </div>

                            {/* Right column */}
                            <div className="flex flex-col gap-6">
                                {/* Accent card */}
                                
                                <div className="bg-blue-700 rounded-2xl p-6 flex flex-col justify-between min-h-40]">
                                    <div>
                                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                                            {grid.cards[1].icon}
                                        </div>

                                        <h3 className="text-lg font-medium text-white mb-2">
                                            {grid.cards[1].title}
                                        </h3>

                                        <p className="text-sm text-blue-200 leading-relaxed">
                                            {grid.cards[1].description}
                                        </p>
                                    </div>
                                    <button className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-700 bg-white rounded-full px-4 py-1.5 w-fit hover:bg-blue-50 transition-colors">
                                        {grid.cards[1].buttonIcon}
                                        {grid.cards[1].buttonLabel}
                                    </button>
                                </div>

                                {/* Bottom 2 cards */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {grid.cards.slice(2).map((card, i) => {
                                        return (
                                            <div
                                                key={i}
                                                className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col justify-between"
                                            >
                                                <div>
                                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
                                                        {card.icon}
                                                    </div>

                                                    <h3 className="text-sm font-medium text-gray-900 mb-1">
                                                        {card.title}
                                                    </h3>

                                                    <p className="text-xs text-gray-500 leading-relaxed">
                                                        {card.description}
                                                    </p>
                                                </div>

                                                <button className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-blue-600 border border-blue-200 rounded-full px-3 py-1.5 w-fit hover:bg-blue-50 transition-colors">
                                                    {card.buttonIcon}
                                                    {card.buttonLabel}
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="max-w-7xl mx-auto px-6 lg:px-16 pb-14 lg:pb-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:row-span-2 relative bg-white border border-gray-100 rounded-2xl p-6 flex flex-col justify-between min-h-80 overflow-hidden">
                                <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 400 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#0B42D3" d="M0,60 C80,20 160,100 240,60 C320,20 360,80 400,60 L400,120 L0,120 Z" />
                                </svg>

                                <div className="relative z-10">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                                        {grid.cards[0].icon}
                                    </div>
                                    <h3 className="text-base font-medium text-gray-900 mb-2">{grid.cards[0].title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{grid.cards[0].description}</p>
                                </div>

                                <button className="relative z-10 mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 border border-blue-200 rounded-full px-4 py-1.5 w-fit hover:bg-blue-50 transition-colors">
                                    {grid.cards[0].buttonIcon}
                                    {grid.cards[0].buttonLabel}
                                </button>
                            </div>

                            <div className="flex flex-col gap-4">

                                <div className="relative bg-blue-700 rounded-2xl p-6 flex flex-col justify-between min-h-[160px] overflow-hidden">
                                    <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 400 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="#1d4ed8" d="M0,50 C100,10 200,90 300,50 C350,30 380,60 400,50 L400,100 L0,100 Z" />
                                    </svg>

                                    <div className="relative z-10">
                                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                                            {grid.cards[1].icon}
                                        </div>
                                        <h3 className="text-lg font-medium text-white mb-2">{grid.cards[1].title}</h3>
                                        <p className="text-sm text-blue-200 leading-relaxed">{grid.cards[1].description}</p>
                                    </div>

                                    <button className="relative z-10 mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-700 bg-white rounded-full px-4 py-1.5 w-fit hover:bg-blue-50 transition-colors">
                                        {grid.cards[1].buttonIcon}
                                        {grid.cards[1].buttonLabel}
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {grid.cards.slice(2).map((card, i) => {
                                        return (
                                            <div
                                                key={i}
                                                className="relative bg-white border border-gray-100 rounded-2xl p-5 flex flex-col justify-between overflow-hidden"
                                            >
                                                <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 300 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill="#EFF6FF" d="M0,40 C60,10 120,70 180,40 C240,10 270,50 300,40 L300,80 L0,80 Z" />
                                                </svg>

                                                <div className="relative z-10">
                                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
                                                        {card.icon}
                                                    </div>
                                                    <h3 className="text-sm font-medium text-gray-900 mb-1">{card.title}</h3>
                                                    <p className="text-xs text-gray-500 leading-relaxed">{card.description}</p>
                                                </div>

                                                <button className="relative z-10 mt-3 inline-flex items-center gap-1 text-xs font-medium text-blue-600 border border-blue-200 rounded-full px-3 py-1.5 w-fit hover:bg-blue-50 transition-colors">
                                                    {card.buttonIcon}
                                                    {card.buttonLabel}
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div> */}
                </section>
            )}
        </>
    );
}
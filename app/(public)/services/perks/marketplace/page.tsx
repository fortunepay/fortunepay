import ServicePageTemplate from "@/components/sections/services/PageTemplate";
import { ScrollingCardServices } from "@/components/carousel/ScrollingCards";
import { SlideCardItem } from "@/types/public/userTypes";

const bankSlides: SlideCardItem[] = [
    {
        title: "1. Open Fortune Pay app and select Market",
        description: "Open the Fortune Pay app and tap “Market” on the homepage.",
        image: "/backgrounds/services/marketplace/step_1.webp",
    },
    {
        title: "2. Browse the dashboard",
        description: "Scroll down the homepage to find the Marketplace and tap on any item you want to buy.",
        image: "/backgrounds/services/marketplace/step_2.webp",
    },
    {
        title: "3. Redirect to the product page",
        description: "You will be automatically redirected to the item`s official product link to complete your purchase.",
        image: "/backgrounds/services/marketplace/step_3.webp",
    },
];

export default function MarketplacePage() {
    return (
        <>
            <ServicePageTemplate
                hero={{
                    heading: "Marketplace",
                    headingAccent: "",
                    subheading: "Discover high-quality finds and everyday essentials at unbeatable, budget-friendly prices!",
                    height: "min-h-full",
                    backgroundColor: "#6AF0E1",
                    backgroundImage: "/backgrounds/services/perks/marketplace.webp",
                    backgroundImagePosition: "right bottom",
                    backgroundImageSize: "700px auto",
                    imageAlt: "Buy Load",
                    textPosition: "left",
                }}
            />
            <ScrollingCardServices slides={bankSlides} />
        </>
    );
}
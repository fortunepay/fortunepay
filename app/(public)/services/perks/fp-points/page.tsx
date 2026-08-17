import ServicePageTemplate from "@/components/sections/services/PageTemplate";
import { ScrollingCardServices } from "@/components/carousel/ScrollingCards";
import { SlideCardItem } from "@/types/public/userTypes";

const bankSlides: SlideCardItem[] = [
    {
        title: "1. Open Fortune Pay and select “Gifts & Rewards” ",
        description: "Open the Fortune Pay app and tap “Gifts & Rewards” on the homepage.",
        image: "/backgrounds/services/perks/fp-points/step_1.webp",
    },
    {
        title: "2. Select Points",
        description: "Choose “Points” to view your current points dashboard.",
        image: "/backgrounds/services/perks/fp-points/step_2.webp",
    },
    {
        title: "3. Check-in daily ",
        description: "Tap the daily check-in button to claim your daily points, view your total balance, and use your points to play Balloon Blast!",
        image: "/backgrounds/services/perks/fp-points/step_3.webp",
    },
];

export default function FpPoints() {
    return (
        <>
            <ServicePageTemplate
                hero={{
                    heading: "FP Points",
                    headingAccent: "",
                    subheading: "Earn daily rewards and play exciting games!",
                    height: "min-h-full",
                    backgroundColor: "#FCBF33",
                    backgroundImage: "/backgrounds/services/perks/points.webp",
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
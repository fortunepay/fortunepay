import ServicePageTemplate from "@/components/sections/services/PageTemplate";
import { ScrollingCardServices } from "@/components/carousel/ScrollingCards";
import { SlideCardItem } from "@/types/public/userTypes";

const bankSlides: SlideCardItem[] = [
    {
        title: "1. Open Fortune Pay and select “Gifts & Rewards” ",
        description: "Open the Fortune Pay app and tap “Gifts & Rewards” on the homepage.",
        image: "/backgrounds/services/perks/voucher/step_1.webp",
    },
    {
        title: "2. Select My Vouchers",
        description: "Choose “My Vouchers” to see your available rewards.",
        image: "/backgrounds/services/perks/voucher/step_2.webp",
    },
    {
        title: "3. Scroll and redeem vouchers",
        description: "Browse through your list and select the voucher you want to use.",
        image: "/backgrounds/services/perks/voucher/step_3.webp",
    },
];

export default function VoucherPage() {
    return (
        <>
            <ServicePageTemplate
                hero={{
                    heading: "Voucher",
                    headingAccent: "",
                    subheading: "Find and use your personal discounts, freebies, and shopping rewards.",
                    height: "min-h-full",
                    backgroundColor: "#CE7BEC",
                    backgroundImage: "/backgrounds/services/perks/voucher.webp",
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
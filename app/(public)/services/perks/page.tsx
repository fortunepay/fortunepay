import ServicePageTemplate from "@/components/sections/services/PageTemplate";
import { StackedSliderItem } from "@/types/public/userTypes";

const items: StackedSliderItem[] = [
    {
        id: 1,
        image: "/backgrounds/services/perks/voucher.webp",
        alt: "Vouchers",
        title: "Vouchers",
        gradient: "linear-gradient(180deg, #CE7BEC 0%, #FFFFFF 100%)",
        href: "/services/perks/voucher",
    },
    {
        id: 2,
        image: "/backgrounds/services/perks/points.webp",
        alt: "FP Points",
        title: "Fp Points",
        gradient: "linear-gradient(180deg, #FCBF33 0%, #FFFFFF 100%)",
        href: "/services/perks/fp-points",
    },
    {
        id: 3,
        image: "/backgrounds/services/perks/inappgames.webp",
        alt: "In-App Games",
        title: "In-App Games",
        gradient: "linear-gradient(180deg, #FCBF33 0%, #FFFFFF 100%)",
        href: "/services/perks/in-app-games",
    },
    {
        id: 4,
        image: "/backgrounds/services/perks/cashback.webp",
        alt: "Cashback ",
        title: "Cashback ",
        gradient: "linear-gradient(180deg, #88D7F2 0%, #FFFFFF 100%)",
        href: "/services/perks/cashback",
    },

    {
        id: 5,
        image: "/backgrounds/services/perks/marketplace.webp",
        alt: "Marketplace",
        title: "Marketplace",
        gradient: "linear-gradient(180deg, #6AF0E1 0%, #FFFFFF 100%)",
        href: "/services/perks/marketplace",
    },
];

export default function PerkPage() {
    return (
        <ServicePageTemplate
            hero={{
                heading: "FP Perks",
                headingAccent: "",
                subheading: "Find and use your personal discounts, freebies, and shopping rewards.",
                backgroundImage: "/backgrounds/services/perks/perks_banner.webp",
                imageAlt: "Pay bills illustration",
                height: "min-h-full",
                textPosition: "right",
            }}
            cards={{
                label: "Earn daily rewards and play exciting ",
                labelAccent: "games!",
                accentColor: "text-yellow-400",
                items,
            }}
        />
    );
}
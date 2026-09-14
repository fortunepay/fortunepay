import ServicePageTemplate from "@/components/sections/services/PageTemplate";
import { StackedSliderItem } from "@/types/public/userTypes";

const items: StackedSliderItem[] = [
    {
        id: 1,
        image: "/backgrounds/services/pay/bills.webp",
        alt: "Pay Bills",
        title: "Pay Bills",
        gradient: "linear-gradient(180deg, #71EBFF 0%, #FFFFFF 100%)",
        href: "/services/pay/pay_bills",
    },
    {
        id: 2,
        image: "/backgrounds/services/pay/load.webp",
        alt: "Buy Load",
        title: "Buy Load",
        gradient: "linear-gradient(180deg, #0D4DFA 0%, #FFFFFF 100%)",
        href: "/services/pay/buy_load",
    },
    {
        id: 3,
        image: "/backgrounds/services/pay/pay_qr.webp",
        alt: "Pay via QR",
        title: "Pay via QR",
        gradient: "linear-gradient(180deg, #9EC9FF 0%, #FFFFFF 100%)",
        href: "/services/pay/pay_via_qr",
    },
    {
        id: 4,
        image: "/backgrounds/services/pay/transport.webp",
        alt: "Transport",
        title: "Transport",
        gradient: "linear-gradient(180deg, #FA1919 0%, #FFFFFF 100%)",
        href: "/services/pay/transport",
    },
];

export default function PayPage() {
    return (
        <ServicePageTemplate
            hero={{
                heading: "Easily pay your",
                headingAccent: "bills",
                subheading: "Settle your electricity, water, internet, and other utlities online in just a few taps!",
                backgroundImage: "/backgrounds/services/pay/pay_bills.webp",
                imageAlt: "Pay bills illustration",
                height: "min-h-full",
                textPosition: "right",
            }}
            cards={{
                label: "Your trusted way to",
                labelAccent: "Pay bills!",
                accentColor: "text-yellow-400",
                items,
            }}
        />
    );
}
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

        // bentoGrid={{
        //     cards: [
        //         {
        //             icon: <Send className="w-5 h-5 text-blue-600" />,
        //             title: "Bank Transfer",
        //             description:
        //                 "Send money directly to any local or international bank account quickly and reliably.",
        //             buttonLabel: "Learn More",
        //             buttonIcon: <Send className="w-4 h-4" />,
        //         },
        //         {
        //             icon: <Send className="w-5 h-5 text-white" />,
        //             title: "Secure Payments",
        //             description:
        //                 "Every transaction is protected with bank-grade encryption and fraud monitoring.",
        //             buttonLabel: "Explore",
        //             buttonIcon: <Send className="w-4 h-4" />,
        //             accent: true,
        //         },
        //         {
        //             icon: <Banknote className="w-5 h-5 text-blue-600" />,
        //             title: "Low Fees",
        //             description:
        //                 "Competitive rates with no hidden charges on every transfer.",
        //             buttonLabel: "View Rates",
        //             buttonIcon: <Banknote className="w-4 h-4" />,
        //         },
        //         {
        //             icon: <Banknote className="w-5 h-5 text-blue-600" />,
        //             title: "Global Reach",
        //             description:
        //                 "Send to 50+ countries worldwide, anytime.",
        //             buttonLabel: "Get Started",
        //             buttonIcon: <Banknote className="w-4 h-4" />,
        //         },
        //     ],
        // }}
        />
    );
}
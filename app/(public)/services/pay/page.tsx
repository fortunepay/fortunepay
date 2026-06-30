import ServicePageTemplate from "@/components/sections/services/PageTemplate";
import { StackedSliderItem } from "@/types/public/userTypes";
import { Send, Banknote, } from "@/components/icons/IconPacks";

const items: StackedSliderItem[] = [
    {
        id: 1,
        image: "/backgrounds/services/via_bank_transfer.webp",
        alt: "Via Bank Transfer",
        title: "Via Bank Transfer",
        gradient: "linear-gradient(180deg, #8911FA 0%, #FFFFFF 100%)",
        href: "/services/send/bank-transfer",
    },
    {
        id: 2,
        image: "/backgrounds/services/via_ewallet.webp",
        alt: "Via E-wallet",
        title: "Via E-wallet",
        gradient: "linear-gradient(180deg, #0D4DFA 0%, #FFFFFF 100%)",
        href: "/services/send/ewallet",
    },
    {
        id: 3,
        image: "/backgrounds/services/via_remmittance.webp",
        alt: "Via Remittance",
        title: "Via Remittance",
        gradient: "linear-gradient(180deg, #FBDD16 0%, #FFFFFF 100%)",
        href: "/services/send/remittance",
    },
    {
        id: 4,
        image: "/backgrounds/services/send_gc.webp",
        alt: "Send Gift Certificate",
        title: "Send Gift Certificate",
        gradient: "linear-gradient(180deg, #FA6E1E 0%, #FFFFFF 100%)",
        href: "/services/send/send-gift-cetificate",
    },
    {
        id: 5,
        image: "/backgrounds/services/send_angbao.webp",
        alt: "Send Angbao",
        title: "Send Angbao",
        gradient: "linear-gradient(180deg, #FA1919 0%, #FFFFFF 100%)",
        href: "/services/send/send-angbao",
    },
];

export default function PayPage() {
    return (
        <ServicePageTemplate
            hero={{
                heading: "Easily pay your",
                headingAccent: "bills",
                subheading: "Lorem ipsum dolor sir amet",
                backgroundImage: "/backgrounds/services/pay/pay_bills.webp",
                imageAlt: "Pay bills illustration",
                height: "min-h-full",
                textPosition: "right",
                // backgroundColor: "#1163FF",
                // backgroundImagePosition: "center",
                // backgroundImageSize: "500px auto",
            }}
            cards={{
                label: "Your trusted way to",
                labelAccent: "Pay bills!",
                accentColor: "text-yellow-400",
                items,
            }}

            bentoGrid={{
                cards: [
                    {
                        icon: <Send className="w-5 h-5 text-blue-600" />,
                        title: "Bank Transfer",
                        description:
                            "Send money directly to any local or international bank account quickly and reliably.",
                        buttonLabel: "Learn More",
                        buttonIcon: <Send className="w-4 h-4" />,
                    },
                    {
                        icon: <Send className="w-5 h-5 text-white" />,
                        title: "Secure Payments",
                        description:
                            "Every transaction is protected with bank-grade encryption and fraud monitoring.",
                        buttonLabel: "Explore",
                        buttonIcon: <Send className="w-4 h-4" />,
                        accent: true,
                    },
                    {
                        icon: <Banknote className="w-5 h-5 text-blue-600" />,
                        title: "Low Fees",
                        description:
                            "Competitive rates with no hidden charges on every transfer.",
                        buttonLabel: "View Rates",
                        buttonIcon: <Banknote className="w-4 h-4" />,
                    },
                    {
                        icon: <Banknote className="w-5 h-5 text-blue-600" />,
                        title: "Global Reach",
                        description:
                            "Send to 50+ countries worldwide, anytime.",
                        buttonLabel: "Get Started",
                        buttonIcon: <Banknote className="w-4 h-4" />,
                    },
                ],
            }}
        />
    );
}
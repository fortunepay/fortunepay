import ServicePageTemplate from "@/components/sections/services/PageTemplate";
import { StackedSliderItem } from "@/types/public/userTypes";
import { Send, Banknote, } from "@/components/icons/IconPacks";

const items: StackedSliderItem[] = [
    {
        id: 1,
        image: "/backgrounds/services/send/via_bank_transfer.webp",
        alt: "Via Bank Transfer",
        title: "Via Bank Transfer",
        gradient: "linear-gradient(180deg, #8911FA 0%, #FFFFFF 100%)",
        href: "/services/send/bank-transfer",
    },
    {
        id: 2,
        image: "/backgrounds/services/send/via_ewallet.webp",
        alt: "Via E-wallet",
        title: "Via E-wallet",
        gradient: "linear-gradient(180deg, #0D4DFA 0%, #FFFFFF 100%)",
        href: "/services/send/e-wallet",
    },
    {
        id: 3,
        image: "/backgrounds/services/send/via_remmittance.webp",
        alt: "Via Remittance",
        title: "Via Remittance",
        gradient: "linear-gradient(180deg, #FBDD16 0%, #FFFFFF 100%)",
        href: "/services/send/remittance",
    },
    {
        id: 4,
        image: "/backgrounds/services/send/send_gc.webp",
        alt: "Send Gift Certificate",
        title: "Send Gift Certificate",
        gradient: "linear-gradient(180deg, #FA6E1E 0%, #FFFFFF 100%)",
        href: "/services/send/send-gift-cetificate",
    },
    {
        id: 5,
        image: "/backgrounds/services/send/send_angbao.webp",
        alt: "Send Angbao",
        title: "Send Angbao",
        gradient: "linear-gradient(180deg, #FA1919 0%, #FFFFFF 100%)",
        href: "/services/send/send-angbao",
    },
];

export default function SendPage() {
    return (
        <ServicePageTemplate
            hero={{
                heading: "Send Money",
                headingAccent: "Easily",
                subheading: "Seamlessly send money to your family and friends.",
                backgroundImage: "/backgrounds/services/send/services_send.webp",
                imageAlt: "Send money illustration",
                height: "min-h-full",
                textPosition: "right",
                // backgroundColor: "#1163FF",
                // backgroundImagePosition: "center",
                // backgroundImageSize: "500px auto",
            }}
            cards={{
                label: "Your trusted way to",
                labelAccent: "Send!",
                accentColor: "text-yellow-400",
                items, 
            }}
        />
    );
}
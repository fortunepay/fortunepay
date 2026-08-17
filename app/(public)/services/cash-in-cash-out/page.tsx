import ServicePageTemplate from "@/components/sections/services/PageTemplate";
import { StackedSliderItem } from "@/types/public/userTypes";

const items: StackedSliderItem[] = [
    {
        id: 1,
        image: "/backgrounds/services/cashin-cashout/cash_out_online_banking.webp",
        alt: "Online Bank Cash in",
        title: "Online Bank Cash in",
        gradient: "linear-gradient(180deg, #6D3EFE 0%, #FFFFFF 100%)",
        href: "/services/cash-in-cash-out/online-banking",
    },
    {
        id: 2,
        image: "/backgrounds/services/cashin-cashout/cash_in_ewallet_qr.webp",
        alt: "E-Wallet using QR Code",
        title: "E-Wallet using QR Code",
        gradient: "linear-gradient(180deg, #FACE36 0%, #FFFFFF 100%)",
        href: "/services/cash-in-cash-out/cash-in-ewallet-qr",
    },
    {
        id: 3,
        image: "/backgrounds/services/cashin-cashout/cash_in_ewallet_non_qr.webp",
        alt: "E-Wallet using Non-QR Code",
        title: "E-Wallet using Non-QR Code",
        gradient: "linear-gradient(180deg, #1C28A0 0%, #FFFFFF 100%)",
        href: "/services/cash-in-cash-out/cash-in-non-qr",
    },
    {
        id: 4,
        image: "/backgrounds/services/cashin-cashout/cash_in_online_banking.webp",
        alt: "Online Bank",
        title: "Online Bank",
        gradient: "linear-gradient(180deg, #A9D5FC 0%, #FFFFFF 100%)",
        href: "/services/cash-in-cash-out/cashout",
    },
    {
        id: 5,
        image: "/backgrounds/services/cashin-cashout/cash_out_other_affiliates.webp",
        alt: "Other Affiliated Outlets",
        title: "Other Affiliated Outlets",
        gradient: "linear-gradient(180deg, #8EF0E3 0%, #FFFFFF 100%)",
        href: "/services/cash-in-cash-out/affiliated-outlets",
    },
];

export default function CashInCashOut() {
    return (
        <ServicePageTemplate
            hero={{
                heading: "Easy fund access",
                headingAccent: "",
                subheading: "Easily add funds to your Fortune Pay account anytime, anywhere! ",
                backgroundImage: "/backgrounds/services/cashin-cashout/cashin-cashout.webp",
                imageAlt: "Cash In Cash Out",
                height: "min-h-full",
                textPosition: "right",
            }}
            cards={{
                label: "Your trusted way to",
                labelAccent: "Cash In Cash Out",
                accentColor: "text-yellow-400",
                items,
            }}
        />
    );
}
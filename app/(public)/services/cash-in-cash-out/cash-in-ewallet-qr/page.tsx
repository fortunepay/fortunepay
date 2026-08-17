import ServicePageTemplate from "@/components/sections/services/PageTemplate";
import { ScrollingCardServices } from "@/components/carousel/ScrollingCards";
import { SlideCardItem } from "@/types/public/userTypes";

const bankSlides: SlideCardItem[] = [
    {
        title: "1. Open Fortune Pay app and select Cash In",
        description: "Open the Fortune Pay app and tap Cash In on the homepage.",
        image: "/backgrounds/services/cashin-cashout/cash-in-ewallet-qr/step_1.webp",
    },
    {
        title: "2. Tap E-Wallets",
        description: "Select your preferred e-wallet to transact.",
        image: "/backgrounds/services/cashin-cashout/cash-in-ewallet-qr/step_2.webp",
    },
    {
        title: "3. Save the generated QR code ",
        description: "Save or download the QR code that appears on your screen.",
        image: "/backgrounds/services/cashin-cashout/cash-in-ewallet-qr/step_3.webp",
    },
    {
        title: "4. Log in to your preferred e-wallet ",
        description: " Open your selected e-wallet app and log in to your account. ",
        image: "/backgrounds/services/cashin-cashout/cash-in-ewallet-qr/step_4.webp",
    },
    {
        title: "5. Open the QR scanner",
        description: "Tap the QR scanner icon and upload or scan the saved QR code.",
        image: "/backgrounds/services/cashin-cashout/cash-in-ewallet-qr/step_5.webp",
    },
    {
        title: "6. Enter amount",
        description: "Enter your preferred amount to cash in.",
        image: "/backgrounds/services/cashin-cashout/cash-in-ewallet-qr/step_6.webp",
    },
    {
        title: "7. Review",
        description: "Double-check your transaction summary and click Confirm to proceed.",
        image: "/backgrounds/services/cashin-cashout/cash-in-ewallet-qr/step_7.webp",

    },
    {
        title: "8. Check your balance ",
        description: "Check your Fortune Pay balance to ensure the funds have been successfully credited.",
        image: "/backgrounds/services/cashin-cashout/cash-in-ewallet-qr/step_8.webp",
    },
];

export default function EwalletQrCode() {
    return (
        <>
            <ServicePageTemplate
                hero={{
                    heading: " E-Wallet using",
                    headingAccent: "QR Code",
                    subheading: "Add funds instantly top up your balance securely through online banking and e-wallets!",
                    height: "min-h-full",
                    backgroundColor: "#8911FA",
                    backgroundImage: "/backgrounds/services/cashin-cashout/cash_out_online_banking.webp",
                    backgroundImagePosition: "right bottom",
                    backgroundImageSize: "700px auto",
                    imageAlt: "online bank Cashi in",
                    textPosition: "left",
                }}
            />
            <ScrollingCardServices slides={bankSlides} />
        </>
    );
}
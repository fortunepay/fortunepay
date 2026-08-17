import ServicePageTemplate from "@/components/sections/services/PageTemplate";
import { ScrollingCardServices } from "@/components/carousel/ScrollingCards";
import { SlideCardItem } from "@/types/public/userTypes";

const bankSlides: SlideCardItem[] = [
    {
        title: "1. Open Fortune Pay app and select Cash In",
        description: "Open the Fortune Pay app and tap Cash In on the homepage.",
        image: "/backgrounds/services/cashin-cashout/affiliated-outlets/step_1.webp",
    },
    {
        title: "2. Select your preferred remittance center",
        description: "Choose your preferred partner remittance center from the available list. ",
        image: "/backgrounds/services/cashin-cashout/affiliated-outlets/step_2.webp"
    },
    {
        title: "3. Enter information",
        description: "Fill out the necessary details and payment amount.",
        image: "/backgrounds/services/cashin-cashout/affiliated-outlets/step_3.webp",
    },
    {
        title: "4. Review",
        description: "Double-check your transaction summary.",
        image: "/backgrounds/services/cashin-cashout/affiliated-outlets/step_4.webp",
    },
    {
        title: "5. Enter TPIN",
        description: "Input your TPIN to proceed with the transaction.",
        image: "/backgrounds/services/cashin-cashout/affiliated-outlets/step_5.webp",
    },
    {
        title: "6. Successful screen",
        description: "A success screen with your claim reference number will appear once the transaction is processed.",
        image: "/backgrounds/services/cashin-cashout/affiliated-outlets/step_6.webp",
    },
];

export default function AffiliatedOutlets() {
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
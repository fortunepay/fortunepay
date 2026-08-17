import ServicePageTemplate from "@/components/sections/services/PageTemplate";
import { ScrollingCardServices } from "@/components/carousel/ScrollingCards";
import { SlideCardItem } from "@/types/public/userTypes";

const bankSlides: SlideCardItem[] = [
    {
        title: "1. Open Fortune Pay app and select Cash Out",
        description: "Open the Fortune Pay app and tap Cash Out on the homepage. ",
        image: "/backgrounds/services/cashin-cashout/cashout/step_1.webp",
    },
    {
        title: "2. Select destination bank",
        description: " Choose your preferred bank from the options.",
        image: "/backgrounds/services/cashin-cashout/cashout/step_2.webp",
    },
    {
        title: "3. Enter information",
        description: "Fill out the necessary details and payment amount.",
        image: "/backgrounds/services/cashin-cashout/cashout/step_3.webp",
    },
    {
        title: "4. Review",
        description: "Double-check your transaction summary.",
        image: "/backgrounds/services/cashin-cashout/cashout/step_4.webp",
    },
    {
        title: "5. Enter TPIN",
        description: "Input your TPIN to proceed with the transaction.",
        image: "/backgrounds/services/cashin-cashout/cashout/step_5.webp",
    },
    {
        title: "6. Successful screen",
        description: "A Fortune Pay success screen will appear once the cash-out is complete. ",
        image: "/backgrounds/services/cashin-cashout/cashout/step_6.webp",
    },
];

export default function CashOut() {
    return (
        <>
            <ServicePageTemplate
                hero={{
                    heading: "E-Wallet using Non-QR Code",
                    headingAccent: "",
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
import ServicePageTemplate from "@/components/sections/services/PageTemplate";
import { ScrollingCardServices } from "@/components/carousel/ScrollingCards";
import { SlideCardItem } from "@/types/public/userTypes";

const bankSlides: SlideCardItem[] = [
    {
        title: "1. Open Fortune Pay and select “Send Money” ",
        description: "Open the Fortune Pay app and tap “Send Money” on the homepage.",
        image: "/backgrounds/services/send/ewallet/step_1.webp",
    },
    {
        title: "2. Tap “Other e-Wallet” ",
        description: "Select your preferred e-wallet to transact.",
        image: "/backgrounds/services/send/ewallet/step_2.webp",
    },
    {
        title: "3. Enter informations",
        description: "Fill-up necessary information.",
        image: "/backgrounds/services/send/ewallet/step_3.webp",
    },
    {
        title: "4. Choose transfer network",
        description: "Select between InstaPay or PESONet as your preferred transfer method.",
        image: "/backgrounds/services/send/ewallet/step_4.webp",
    },
    {
        title: "5. Review",
        description: "Double check the transaction summary.",
        image: "/backgrounds/services/send/ewallet/step_5.webp",
    },
    {
        title: "6. Enter PIN",
        description: "Enter your OTP or TPIN to proceed with the transaction.",
        image: "/backgrounds/services/send/ewallet/step_6.webp",
    },
];

export default function EwalletPage() {
    return (
        <>
            <ServicePageTemplate
                hero={{
                    heading: "Via",
                    headingAccent: "Wallet",
                    subheading: "Seamlessly Send Money to your family and friends!",
                    height: "min-h-full",
                    backgroundColor: "#0D4DFA",
                    backgroundImage: "/backgrounds/services/send/via_ewallet.webp",
                    backgroundImagePosition: "right bottom",
                    backgroundImageSize: "700px auto",
                    imageAlt: "Via Wallet",
                    textPosition: "left",
                }}
            />
            <ScrollingCardServices slides={bankSlides} />
        </>
    );
}
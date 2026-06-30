import ServicePageTemplate from "@/components/sections/services/PageTemplate";
import { ScrollingCardServices } from "@/components/carousel/ScrollingCards";
import { SlideCardItem } from "@/types/public/userTypes";

const bankSlides: SlideCardItem[] = [
    {
        title: "1. Open Fortune Pay and select “Send Money” ",
        description: "Open the Fortune Pay app and tap “Send Money” on the homepage.",
        image: "/backgrounds/services/send/remittance/step_1.webp",
    },
    {
        title: "2. Tap “Remittance Center” ",
        description: "Select your preferred bank to transact.",
        image: "/backgrounds/services/send/remittance/step_2.webp",
    },
    {
        title: "3. Enter informations",
        description: "Enter the recipient`s details and the amount you want to cash out. Make sure the details match the receiver`s government ID.",
        image: "/backgrounds/services/send/remittance/step_3.webp",
    },
    {
        title: "4. Review",
        description: "Double-check the transaction summary.",
        image: "/backgrounds/services/send/remittance/step_4.webp",
    },
    {
        title: "5. Enter PIN",
        description: "Input OTP or TPIN to proceed with the transaction.",
        image: "/backgrounds/services/send/remittance/step_5.webp",
    },
    {
        title: "6. Successful screen",
        description: "A Fortune Pay success screen will appear once payment is complete.",
        image: "/backgrounds/services/send/remittance/step_6.webp",
    },
    {
        title: "7. SMS Reference Number",
        description: "You`ll receive an SMS from Dragon Pay with a reference number once the cash-out is ready for claim.",
        image: "/backgrounds/services/send/remittance/step_7.webp",
    },
];

export default function RemittancePage() {
    return (
        <>
            <ServicePageTemplate
                hero={{
                    heading: "Via",
                    headingAccent: "Remittance",
                    subheading: "Seamlessly Send Money to your family and friends!",
                    height: "min-h-full",
                    backgroundColor: "#FCE54E",
                    backgroundImage: "/backgrounds/services/send/via_remmittance.webp",
                    backgroundImagePosition: "right bottom",
                    backgroundImageSize: "700px auto",
                    imageAlt: "Via Remittance",
                    textPosition: "left",
                }}
            />
            <ScrollingCardServices slides={bankSlides} />
        </>
    );
}
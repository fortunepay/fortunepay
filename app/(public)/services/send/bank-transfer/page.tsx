import ServicePageTemplate from "@/components/sections/services/PageTemplate";
import { ScrollingCardServices } from "@/components/carousel/ScrollingCards";
import { SlideCardItem } from "@/types/public/userTypes";

const bankSlides: SlideCardItem[] = [
    {
        title: "1. Open Fortune Pay and select “Send Money” ",
        description: "Open the Fortune Pay app and tap “Send Money” on the homepage.",
        image: "/backgrounds/services/send/bank/step_1.webp",
    },
    {
        title: "2. Tap “Bank” ",
        description: "Select your preferred bank to transact.",
        image: "/backgrounds/services/send/bank/step_2.webp",
    },
    {
        title: "3. Enter bank details",
        description: "Fill-up necessary information.",
        image: "/backgrounds/services/send/bank/step_3.webp",
    },
    {
        title: "4. Set an amount",
        description: "Enter your preferred amount to transfer.",
        image: "/backgrounds/services/send/bank/step_4.webp",
    },
    {
        title: "5. Review",
        description: "Double-check the transaction summary.",
        image: "/backgrounds/services/send/bank/step_5.webp",
    },
    {
        title: "6. Enter PIN",
        description: "Input your OTP or TPIN to proceed with the transaction.",
        image: "/backgrounds/services/send/bank/step_6.webp",
    },
];

export default function BankPage() {
    return (
        <>
            <ServicePageTemplate
                hero={{
                    heading: "Via Bank",
                    headingAccent: "Transfer",
                    subheading: "Seamlessly Send Money to your family and friends!",
                    height: "min-h-full",
                    // backgroundColor: "linear-gradient(180deg, #8911FA 0%, #FFFFFF 100%)",
                    backgroundColor: "#8911FA",
                    backgroundImage: "/backgrounds/services/send/via_bank_transfer.webp",
                    backgroundImagePosition: "right bottom",
                    backgroundImageSize: "700px auto",
                    imageAlt: "Via bank transfer",
                    textPosition: "left",
                }}
            />
            <ScrollingCardServices slides={bankSlides} />
        </>
    );
}
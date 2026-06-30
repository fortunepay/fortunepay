import ServicePageTemplate from "@/components/sections/services/PageTemplate";
import { ScrollingCardServices } from "@/components/carousel/ScrollingCards";
import { SlideCardItem } from "@/types/public/userTypes";

const bankSlides: SlideCardItem[] = [
    {
        title: "1. Open Fortune Pay and select “Gifts & Rewards ",
        description: "Open the Fortune Pay app and tap “Gifts & Rewards” on the homepage.",
        image: "/backgrounds/services/send/send_gift_cert/step_1.webp",
    },
    {
        title: "2. Tap “Gift Certificates” ",
        description: "Gift certificates can be used as discount vouchers for bill payments.",
        image: "/backgrounds/services/send/send_gift_cert/step_2.webp",
    },
    {
        title: "3. Personalize your gift",
        description: "Select a theme and the amount, and pick your preferred sending option.",
        image: "/backgrounds/services/send/send_gift_cert/step_3.webp",
    },
    {
        title: "4. Choose recipients",
        description: "Enter the number of recipients",
        image: "/backgrounds/services/send/send_gift_cert/step_4.webp",
    },
    {
        title: "5. Review",
        description: "Double-check the details and click “Confirm” to proceed. The Gift Certificate will be returned to the sender if not claimed within 7 days.",
        image: "/backgrounds/services/send/send_gift_cert/step_5.webp",
    },
];

export default function SendGiftCertificatePage() {
    return (
        <>
            <ServicePageTemplate
                hero={{
                    heading: "Send Gift",
                    headingAccent: "Certificate",
                    subheading: "Seamlessly Send Money to your family and friends!",
                    height: "min-h-full",
                    backgroundColor: "#FB8541",
                    backgroundImage: "/backgrounds/services/send/send_gc.webp",
                    backgroundImagePosition: "right bottom",
                    backgroundImageSize: "700px auto",
                    imageAlt: "Send gc",
                    textPosition: "left",
                }}
            />
            <ScrollingCardServices slides={bankSlides} />
        </>
    );
}
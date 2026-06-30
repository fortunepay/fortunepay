import ServicePageTemplate from "@/components/sections/services/PageTemplate";
import { ScrollingCardServices } from "@/components/carousel/ScrollingCards";
import { SlideCardItem } from "@/types/public/userTypes";

const bankSlides: SlideCardItem[] = [
    {
        title: "1. Open Fortune Pay and select “Angbao” ",
        description: "Open the Fortune Pay app and tap “Gifts & Rewards” on the homepage.",
        image: "/backgrounds/services/send/send_angbao/step_1.webp",
    },
    {
        title: "2. Tap “Angbao ",
        description: "Angbao can be used as a digital gift.",
        image: "/backgrounds/services/send/send_angbao/step_2.webp",
    },
    {
        title: "3. Choose recipients",
        description: "Enter the number of recipients",
        image: "/backgrounds/services/send/send_angbao/step_3.webp",
    },
    {
        title: "4. Set an amount",
        description: "Enter the amount you want to send.",
        image: "/backgrounds/services/send/send_angbao/step_4.webp",
    },
    {
        title: "5. Personalize your gift",
        description: "Add a special message and select a theme.",
        image: "/backgrounds/services/send/send_angbao/step_5.webp",
    },
    {
        title: "5. Review",
        description: "Double-check the details and click “Confirm” to proceed. The Angbao will be returned to the sender if not claimed within 24 hours. ",
        image: "/backgrounds/services/send/send_angbao/step_5.webp",
    },
];

export default function SendAngbao() {
    return (
        <>
            <ServicePageTemplate
                hero={{
                    heading: "Send",
                    headingAccent: "Angbao",
                    subheading: "Seamlessly Send Money to your family and friends!",
                    height: "min-h-full",
                    backgroundColor: "#FB4040",
                    backgroundImage: "/backgrounds/services/send/send_angbao.webp",
                    backgroundImagePosition: "right bottom",
                    backgroundImageSize: "700px auto",
                    imageAlt: "Send Angbao",
                    textPosition: "left",
                }}
            />
            <ScrollingCardServices slides={bankSlides} />
        </>
    );
}
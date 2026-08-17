import ServicePageTemplate from "@/components/sections/services/PageTemplate";
import { ScrollingCardServices } from "@/components/carousel/ScrollingCards";
import { SlideCardItem } from "@/types/public/userTypes";

const bankSlides: SlideCardItem[] = [
    {
        title: "1. Open the Fortune Pay and select “Buy Load”",
        description: "Open the Fortune Pay app and tap “Buy Load” on the homepage.",
        image: "/backgrounds/services/pay/buy_load/step_1.webp",
    },
    {
        title: "2. Select and enter",
        description: "Choose a network and enter the mobile number you want to load. ",
        image: "/backgrounds/services/pay/buy_load/step_2.webp",
    },
    {
        title: "3. Set an amount",
        description: "Enter the amount you want to load.",
        image: "/backgrounds/services/pay/buy_load/step_3.webp",
    },
    {
        title: "4. Review",
        description: "Double-check the transaction summary.",
        image: "/backgrounds/services/pay/buy_load/step_4.webp",
    },
    {
        title: "5. Enter PIN",
        description: "Input OTP or TPIN to proceed with the transaction. ",
        image: "/backgrounds/services/pay/buy_load/step_5.webp",
    },
    {
        title: "6. Successful screen",
        description: "A Fortune Pay success screen will appear once the load is complete.",
        image: "/backgrounds/services/pay/buy_load/step_6.webp",
    },
];

export default function BuyLoad() {
    return (
        <>
            <ServicePageTemplate
                hero={{
                    heading: "Buy Load",
                    headingAccent: "",
                    subheading: "Enjoy zero convenience fees across all networks",
                    height: "min-h-full",
                    backgroundColor: "#0D4DFA",
                    backgroundImage: "/backgrounds/services/pay/load.webp",
                    backgroundImagePosition: "right bottom",
                    backgroundImageSize: "700px auto",
                    imageAlt: "Buy Load",
                    textPosition: "left",
                }}
            />
            <ScrollingCardServices slides={bankSlides} />
        </>
    );
}
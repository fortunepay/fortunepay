import ServicePageTemplate from "@/components/sections/services/PageTemplate";
import { ScrollingCardServices } from "@/components/carousel/ScrollingCards";
import { SlideCardItem } from "@/types/public/userTypes";

const bankSlides: SlideCardItem[] = [
    {
        title: "1. Open Fortune Pay and select “Pay Bills” ",
        description: "Open the Fortune Pay app and tap “Pay Bills” on the homepage.",
        image: "/backgrounds/services/pay/pay_bills/step_1.webp",
    },
    {
        title: "2. Select or search biller",
        description: "Select or search your preferred biller from the categories.",
        image: "/backgrounds/services/pay/pay_bills/step_2.webp",
    },
    {
        title: "3. Enter information",
        description: "Enter the necessary details.",
        image: "/backgrounds/services/pay/pay_bills/step_3.webp",
    },
    {
        title: "4. Review",
        description: "Double-check the transaction summary",
        image: "/backgrounds/services/pay/pay_bills/step_4.webp",
    },
    {
        title: "5. Enter PIN",
        description: "Input OTP or TPIN to proceed with the transaction.",
        image: "/backgrounds/services/pay/pay_bills/step_5.webp",
    },
    {
        title: "6. Successful screen",
        description: "A Fortune Pay success screen will appear once payment is complete.",
        image: "/backgrounds/services/pay/pay_bills/step_6.webp",
    },
];

export default function PayBills() {
    return (
        <>
            <ServicePageTemplate
                hero={{
                    heading: "Pay Bills",
                    headingAccent: "",
                    subheading: "Hassle-free utility bill payments",
                    // height: "70vh",
                    height: "min-h-full",
                    backgroundColor: "#71EBFF",
                    backgroundImage: "/backgrounds/services/pay/bills.webp",
                    backgroundImagePosition: "right bottom",
                    backgroundImageSize: "700px auto",
                    imageAlt: "Pay Bills",
                    textPosition: "left",
                }}
            />
            <ScrollingCardServices slides={bankSlides} />
        </>
    );
}
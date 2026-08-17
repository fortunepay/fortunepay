import ServicePageTemplate from "@/components/sections/services/PageTemplate";
import { ScrollingCardServices } from "@/components/carousel/ScrollingCards";
import { SlideCardItem } from "@/types/public/userTypes";

const bankSlides: SlideCardItem[] = [
    {
        title: "1. Open Fortune Pay and Select “Scan” ",
        description: "Open the Fortune Pay app and tap “Scan” on the homepage.",
        image: "/backgrounds/services/pay/pay_qr/step_1.webp",
    },
    {
        title: "2. Scan QR",
        description: "Scan the merchant`s QR code within the camera frame or upload a QR from your gallery",
        image: "/backgrounds/services/pay/pay_qr/step_2.webp",
    },
    {
        title: "3. Enter amount and purpose",
        description: "Input the exact payment amount and a note or purpose of the transaction.",
        image: "/backgrounds/services/pay/pay_qr/step_3.webp",
    },
    {
        title: "4. Enter PIN",
        description: "Input OTP or TPIN to proceed with the transaction.",
        image: "/backgrounds/services/pay/pay_qr/step_4.webp",
    },
    {
        title: "5. Successful screen",
        description: "A Fortune Pay success screen will appear once the payment is complete.",
        image: "/backgrounds/services/pay/pay_qr/step_5.webp",
    },
];

export default function PayViaQr() {
    return (
        <>
            <ServicePageTemplate
                hero={{
                    heading: "Pay via QR",
                    headingAccent: "",
                    subheading: "Enjoy safe and convenient transactions!",
                    height: "min-h-full",
                    backgroundColor: "#9EC9FF",
                    backgroundImage: "/backgrounds/services/pay/pay_qr.webp",
                    backgroundImagePosition: "right bottom",
                    backgroundImageSize: "700px auto",
                    imageAlt: "Pay via QR",
                    textPosition: "left",
                }}
            />
            <ScrollingCardServices slides={bankSlides} />
        </>
    );
}
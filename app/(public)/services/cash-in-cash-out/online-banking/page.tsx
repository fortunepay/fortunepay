import ServicePageTemplate from "@/components/sections/services/PageTemplate";
import { ScrollingCardServices } from "@/components/carousel/ScrollingCards";
import { SlideCardItem } from "@/types/public/userTypes";

const bankSlides: SlideCardItem[] = [
    {
        title: "1. Open Fortune Pay app and select Cash In",
        description: "Open the Fortune Pay app and tap Cash In on the homepage.",
        image: "/backgrounds/services/cashin-cashout/online-banking-cashin/step_1.webp",
    },
    {
        title: "2. Tap Online Banking ",
        description: " Select your preferred bank to transact.",
        image: "/backgrounds/services/cashin-cashout/online-banking-cashin/step_2.webp",
    },
    {
        title: "3. Log in to your bank account ",
        description: "Go to your preferred bank's online banking app and log in.",
        image: "/backgrounds/services/cashin-cashout/online-banking-cashin/step_3.webp",
    },
    {
        title: "4. Go to Send Money",
        description: "Click the Send Money or Transfer section and select InstaPay.",
        image: "/backgrounds/services/cashin-cashout/online-banking-cashin/step_4.webp",
    },
    {
        title: "5. Select EasyPay Global EMI Corporation",
        description: "Search and select EasyPay Global EMI Corporation as the Bank`s name.",
        image: "/backgrounds/services/cashin-cashout/online-banking-cashin/step_5.webp",
    },
    {
        title: "6. Enter necessary information ",
        description: "Input your Fortune Pay registered mobile number and your account name. ",
        image: "/backgrounds/services/cashin-cashout/online-banking-cashin/step_6.webp",
    },
    {
        title: "7. Tap Confirm",
        description: "Review the details and click Confirm to proceed with the transaction. ",
        image: "/backgrounds/services/cashin-cashout/online-banking-cashin/step_7.webp",

    },
    {
        title: "8. Receive confirmation",
        description: "You will receive an SMS notification confirming that your cash-in transaction is successful. ",
        image: "/backgrounds/services/cashin-cashout/online-banking-cashin/step_8.webp",
    },
];

export default function OnlingBankingPage() {
    return (
        <>
            <ServicePageTemplate
                hero={{
                    heading: "Online Bank ",
                    headingAccent: "Cashi in",
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
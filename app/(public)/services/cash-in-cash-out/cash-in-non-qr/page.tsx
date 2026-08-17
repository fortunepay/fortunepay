import ServicePageTemplate from "@/components/sections/services/PageTemplate";
import { ScrollingCardServices } from "@/components/carousel/ScrollingCards";
import { SlideCardItem } from "@/types/public/userTypes";

const bankSlides: SlideCardItem[] = [
    {
        title: "1. Open Fortune Pay app and select Cash In",
        description: "Open the Fortune Pay app and tap Cash In on the homepage.",
        image: "/backgrounds/services/cashin-cashout/cash-in-non-qr/step_1.webp",
    },
    {
        title: "2. Tap E-Wallet",
        description: " Select your preferred e-wallet to transact.",
        image: "/backgrounds/services/cashin-cashout/cash-in-non-qr/step_2.webp",
    },
    {
        title: "3. Log in to your selected e-wallet account",
        description: "Open your preferred e-wallet app and log in to your account. ",
        image: "/backgrounds/services/cashin-cashout/cash-in-non-qr/step_3.webp",
    },
    {
        title: "4. Go to Send Money and select InstaPay",
        description: "Go to the Send Money section and select InstaPay.",
        image: "/backgrounds/services/cashin-cashout/cash-in-non-qr/step_4.webp",
    },
    {
        title: "5. Search EasyPay Global EMI Corporation as the bank's name ",
        description: "Search and select EasyPay Global EMI Corporation as the Bank's name.",
        image: "/backgrounds/services/cashin-cashout/cash-in-non-qr/step_5.webp",
    },
    {
        title: "6. Enter necessary information ",
        description: "Input your Fortune Pay registered mobile number and your account name.",
        image: "/backgrounds/services/cashin-cashout/cash-in-non-qr/step_6.webp",
    },
    {
        title: "7. Tap Confirm",
        description: "Double-check your transaction summary and click Confirm to proceed.",
        image: "/backgrounds/services/cashin-cashout/cash-in-non-qr/step_7.webp",

    },
    {
        title: "8. Receive SMS notification ",
        description: "You will receive an SMS notification confirming that your cash-in transaction is successful. ",
        image: "/backgrounds/services/cashin-cashout/cash-in-non-qr/step_8.webp",
    },
];

export default function CashInNonQr() {
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
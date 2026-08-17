import ServicePageTemplate from "@/components/sections/services/PageTemplate";
import { ScrollingCardServices } from "@/components/carousel/ScrollingCards";
import { SlideCardItem } from "@/types/public/userTypes";

const bankSlides: SlideCardItem[] = [
    {
        title: "1. Open the Fortune Pay app and select Invite a friend",
        description: "Open the app, go to the 'Me' tab, and select Invite a Friend.",
        image: "/backgrounds/services/perks/cashback/step_1.webp",
    },
    {
        title: "2. Have them download, register, and complete a “Pay Bills” transaction",
        description: "Share your referral code or link, and make sure your friend completes their registration and pays a bill using Fortune Pay.",
        image: "/backgrounds/services/perks/cashback/step_2.webp",
    },
    {
        title: "3. Receive cashback credited directly to your account",
        description: "Once your friend's transaction is verified, your referral cashback reward will be automatically added to your Fortune Pay wallet.",
        image: "/backgrounds/services/perks/cashback/step_3.webp",
    },
];

export default function CashBack() {
    return (
        <>
            <ServicePageTemplate
                hero={{
                    heading: "Cashback",
                    headingAccent: "",
                    subheading: "Earn cashback every time you share Fortune Pay!",
                    height: "min-h-full",
                    backgroundColor: "#88D7F2",
                    backgroundImage: "/backgrounds/services/perks/cashback.webp",
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
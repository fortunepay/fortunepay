import ServicePageTemplate from "@/components/sections/services/PageTemplate";
import { ScrollingCardServices } from "@/components/carousel/ScrollingCards";
import { SlideCardItem } from "@/types/public/userTypes";

const bankSlides: SlideCardItem[] = [
    {
        title: "Fishing Master",
        description: "Fishing Master is an easy play-to-earn game in the Fortune Pay app. Play every day to catch fish, complete fun challenges, and get points. Once you have enough points, you can easily exchange them for real money in your Fortune Pay wallet.",
        image: "/backgrounds/services/perks/in-app-games/step_1.webp",
    },
    {
        title: "Balloon Blast",
        description: "Balloon Blast is an exciting game in the Fortune Pay app where you can tap floating balloons to win instant rewards. Everyone gets one free pop every day, plus extra chances when you use your wallet, pay with points, or invite friends. Tap a balloon, test your luck, and you could win up to ₱100,000!",
        image: "/backgrounds/services/perks/in-app-games/step_2.webp",
    },
    {
        title: "Weekly Swerte",
        description: "Weekly Swerte is a raffle promo that gives users entries into weekly Friday cash draws simply by completing everyday transactions. You can collect tickets by paying bills, buying load, cash-in, or inviting friends to register and complete at least one valid transaction to activate your entries.",
        image: "/backgrounds/services/perks/in-app-games/step_3.webp",
    },
    {
        title: "Lucky Gift",
        description: "Lucky Gift is a spin-to-win mini-game on Fortune Pay that rewards verified users with exciting prizes. Players get free daily spins and can earn more through referrals or transactions like paying bills and buying load, giving everyone a chance to win anything from points and vouchers to gadgets and a grand prize of iPhone 17 Pro Max.",
        image: "/backgrounds/services/perks/in-app-games/step_4.webp",
    },
];

export default function InAppGames() {
    return (
        <>
            <ServicePageTemplate
                hero={{
                    heading: "In-App",
                    headingAccent: "Games",
                    subheading: "Play, win, and earn extra rewards with every game you complete!",
                    height: "min-h-full",
                    backgroundColor: "#FCBF33",
                    backgroundImage: "/backgrounds/services/perks/inappgames.webp",
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
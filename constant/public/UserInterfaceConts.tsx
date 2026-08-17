import {
    Wallet,
    Banknote,
    ArrowUpDown,
    Sparkle,
    Handshake,
    Newspaper,
    Info,
    FilePenLine,
    ShieldCheck,
    Store, 
    Download, 
    Users,
} from "@/components/icons/IconPacks";

import {WhyChooseFortunepayCard} from "@/types/public/userTypes";

export const NavLinks = [
    { name: "Home", href: "/" },

    {
        name: "Services",
        dropdown: [
            { name: "Send", href: "/services/send", icon: <Wallet size={16} /> },
            { name: "Pay", href: "/services/pay", icon: <Banknote size={16} /> },
            { name: "Cash In / Cash Out", href: "/services/cash-in-cash-out", icon: <ArrowUpDown size={16} /> },
            { name: "Perks", href: "/services/perks", icon: <Sparkle size={16} /> },
        ],
    },

    {
        name: "Business",
        dropdown: [
            { name: "Be our partner", href: "#", icon: <Handshake size={16} /> },
            { name: "News", href: "#", icon: <Newspaper size={16} /> },
            { name: "Careers", href: "#", icon: <Newspaper size={16} /> },
        ],
    },

    {
        name: "More",
        dropdown: [
            { name: "About Us", href: "#", icon: <Info size={16} /> },
            { name: "Terms & Conditions", href: "#", icon: <FilePenLine size={16} /> },
            { name: "Privacy Policy", href: "#", icon: <ShieldCheck size={16} /> },
        ],
    },
];

// HOME PAGE CONST START
    export const WhyChooseFPCards: WhyChooseFortunepayCard[] = [
        {
            id: 1,
            title: 'Security:',
            subtitle: 'Your financial security is our highest priority.',
            image: '/backgrounds/home/bg_1.webp',
        },
        {
            id: 2,
            title: 'Convenience:',
            subtitle:
                'Make your payments easier and manage your finances efficiently.',
            image: '/backgrounds/home/bg_2.webp',
        },
        {
            id: 3,
            title: 'Transparency:',
            subtitle:
                'View detailed transaction records to track your money.',
            image: '/backgrounds/home/bg_3.webp',
        },
        {
            id: 4,
            title: 'Customizations:',
            subtitle:
                'Customize your solutions to suit different payment needs.',
            image: '/backgrounds/home/bg_4.webp',
        },
    ];

    export const WhyChooseFPstats = [
        { label: 'Partnered Merchants', value: 120, icon: Store },
        { label: 'User Downloads', value: 4800, icon: Download },
        { label: 'Other Affiliates', value: 150, icon: Users },
    ];
// HOME PAGE CONST END


export const FooterLinks = [
    {
        title: "FBusiness",
        links: [
            { name: "FPayables", href: "/fpayables" },
            { name: "FPartnerships", href: "/fpartnerships" },
        ],
    },
    {
        title: "FPeople",
        links: [
            { name: "FPromotions", href: "/fpromotions" },
            { name: "FPost", href: "/fpost" },
        ],
    },
    {
        title: "Company",
        links: [
            { name: "About Us", href: "/about-us" },
            { name: "Careers", href: "/careers" },
            { name: "Help Center", href: "/help-center" },
            { name: "FAQs", href: "/faqs" },
        ],
    },
];
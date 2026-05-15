import {
    LayoutDashboard,
    CalendarCheck,
    Megaphone,
    Play,
    HandHeart,
    Trophy,
    FileQuestionMark,
    MessageCircle,
    LogOut,
    UserKey,
    Image,
    Wallet,
    Banknote,
    ArrowUpDown,
    Sparkle,
    Handshake,
    Newspaper,
    Info,
    FilePenLine,
    Headset,
    ShieldCheck,
    UsersRound,
} from "@/components/icons/IconPacks";

export const NavLinks = [
    { name: "Home", href: "/" },

    {
        name: "Services",
        dropdown: [
            { name: "Send", href: "#", description: "Seamlessly send money to your family and friends!", icon: <Wallet size={16} /> },
            { name: "Pay", href: "#", description: "Smart manufacturing solutions for production optimization", icon: <Banknote size={16} /> },
            { name: "Cash In / Cash Out", href: "#", description: "Hassle-free utility bill payments", icon: <ArrowUpDown size={16} /> },
            { name: "Enjoy", href: "#", description: "Reduce manual workloads and improve system reliability", icon: <Sparkle size={16} /> },
        ],
    },

    { name: "Promos", href: "#" },

    {
        name: "Business",
        dropdown: [
            { name: "Be our partner", href: "#", description: "Become one of our Fortune Pay Merchant", icon: <Handshake size={16} /> },
            { name: "Articles", href: "#", description: "Events, Partnership/Contract signing, News", icon: <Newspaper size={16} /> },
        ],
    },

    { name: "Careers", href: "#" },

    {
        name: "More",
        dropdown: [
            { name: "About Us", href: "#", description: "End-to-end workflow automation and process optimization", icon: <Info size={16} /> },
            { name: "Terms & Conditions", href: "#", description: "Data-driven insights to improve operational efficiency", icon: <FilePenLine size={16} /> },
            { name: "Help Center", href: "#", description: "Connect machines and systems for real-time monitoring", icon: <Headset size={16} /> },
            { name: "Privacy Policy", href: "#", description: "Automate repetitive tasks and boosts productivity", icon: <ShieldCheck size={16} /> },

        ],
    },
];

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

// DASHBOARD CONSTANTS
export const AdminSidebarItems = [
    { icon: <LayoutDashboard />, label: "Dashboard", active: true, href: "/dashboard" },

    {
        icon: <Megaphone />,
        label: "Marketing",
        children: [
            { label: "Events", icon: <CalendarCheck size={16} />, href: "/marketing/events" },
            { label: "FP Videos", icon: <Play size={16} />, href: "/marketing/fp-videos" },
            { label: "FP Banners", icon: <Image size={16} />, href: "/marketing/banners" },
            { label: "Articles", icon: <Newspaper size={16} />, href: "/marketing/articles" },
        ]
    },

    {
        icon: <HandHeart />,
        label: "Human resources",
        children: [
            { label: "Careers", icon: <Trophy size={16} />, href: "/human-resources/careers" },
        ]
    },

    {
        icon: <UsersRound />,
        label: "Sales Dept",
        children: [
            { label: "FAQs", icon: <FileQuestionMark size={16} />, href: "/customer-service/faqs" },
            { label: "Feedbacks", icon: <MessageCircle size={16} />, href: "/customer-service/feedbacks" },
        ]
    },

    { icon: <UserKey />, label: "Role Access", href: "/dashboard/super-admin" },

    {
        icon: <LogOut />,
        label: "Logout",
        action: "logout",
    }
];

export const BRAND = "#FFB502";
export const STATUS_FILTERS = ["All", "enabled", "disabled"] as const;
// DASHBOARD CONSTANTS

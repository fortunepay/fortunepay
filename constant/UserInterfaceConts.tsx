
import {
    LayoutDashboard,
    CalendarCheck,
    Megaphone,
    Play,
    HandHeart,
    Trophy,
    Newspaper,
    Headset,
    FileQuestionMark,
    MessageCircle,
    LogOut,
    UserKey,
    Image,
} from "@/components/icons/IconPacks";

export const NavLinks = [
    { name: "Home", href: "/" },

    {
        name: "Services",
        dropdown: [
            { name: "Cash in/out", href: "#" },
            { name: "Buy load", href: "#" },
            { name: "Angbao/GCs", href: "#" },
        ],
    },

    { name: "Events", href: "#" },

    {
        name: "Business",
        dropdown: [
            { name: "Be our partner", href: "#" },
            { name: "Articles", href: "#" },
        ],
    },

    { name: "Promos", href: "#" },

    {
        name: "More",
        dropdown: [
            { name: "About Us", href: "#" },
            { name: "Help Center", href: "#" },
            { name: "Terms & Conditions", href: "#" },
            { name: "Privacy Policy", href: "#" },

        ],
    },
];

export const AdminSidebarItems = [
    { icon: <LayoutDashboard />, label: "Dashboard", active: true, href: "/dashboard" },

    {
        icon: <Megaphone />,
        label: "Marketing",
        children: [
            { label: "Events", icon: <CalendarCheck size={16} />, href: "/marketing/events" },
            { label: "FP Videos", icon: <Play size={16} />, href: "/marketing/videos" },
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
        icon: <Headset />,
        label: "Customer Service",
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
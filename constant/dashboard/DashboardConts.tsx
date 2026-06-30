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
    Newspaper,
    UsersRound,
} from "@/components/icons/IconPacks";
export const AdminSidebarItems = [
    { icon: <LayoutDashboard />, label: "Dashboard", active: true, href: "/dashboard" },

    {
        icon: <Megaphone />,
        label: "Marketing",
        children: [
            { label: "Promos", icon: <CalendarCheck size={16} />, href: "/marketing/promos" },
            { label: "FP Videos", icon: <Play size={16} />, href: "/marketing/fp-videos" },
            { label: "FP Banners", icon: <Image size={16} />, href: "/marketing/banners" },
            { label: "News", icon: <Newspaper size={16} />, href: "/marketing/news" },
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
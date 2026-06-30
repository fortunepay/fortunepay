'use client'

import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { AdminSidebarItems } from "@/constant/dashboard/DashboardConts"
import { useLogout } from '@/hooks/useLogout';
import {
    Menu,
    ChevronDown,
    ChevronUp
} from "@/components/icons/IconPacks"

export default function AdminAside({
    sidebarOpen,
    setSidebarOpen
}: {
    sidebarOpen: boolean
    setSidebarOpen: (value: boolean) => void
}) {

    const [openDropdown, setOpenDropdown] = useState<number | null>(null)
    const { data: session, status } = useSession()
    const role = session?.user?.role;

    const pathname = usePathname()

    const user = session?.user
    const isLoading = status === "loading"

    const { logout } = useLogout();
    const handleLogout = logout;

    const initials = user?.name
        ? user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
        : "??"

    useEffect(() => {
        AdminSidebarItems.forEach((item, index) => {
            if (item.children?.some(child => child.href === pathname)) {
                setOpenDropdown(index)
            }
        })
    }, [pathname])

    const filteredItems = AdminSidebarItems.filter((item) => {
        if (!role) return false;
        if (role === 'superadmin') return true;

        if (role === 'marketing') {
            return item.label !== 'Role Access';
        }

        if (role === 'hr') {
            return (
                item.label === 'Dashboard' ||
                item.label === 'Human resources' ||
                item.label === 'Logout'
            );
        }

        if (role === 'cs') {
            return (
                item.label === 'Dashboard' ||
                item.label === 'Customer Service' ||
                item.label === 'Logout'
            );
        }

        return false;
    });

    return (
        <>
            <div className="sm:hidden fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-4 bg-white border-b">
                <button onClick={() => setSidebarOpen(true)} className="p-2">
                    <Menu />
                </button>
            </div>

            {sidebarOpen && (
                <div
                    className="sm:hidden fixed inset-0 z-30 bg-black/30"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside className={`
                fixed top-0 left-0 z-40 h-screen bg-white border-r border-gray-100 shadow-lg flex flex-col transition-all duration-300
                ${sidebarOpen ? "w-64 translate-x-0 overflow-hidden" : "w-64 -translate-x-full overflow-visible"}
                sm:w-64 sm:translate-x-0 sm:overflow-hidden
            `}>

                <div className="flex items-center px-5 py-4 border-b border-gray-300">
                    <Image
                        src="/logo/logo.webp"
                        alt="Logo"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-42.5 h-auto"
                        loading="eager"
                    />
                </div>

                <nav className={`
                    flex-1 px-2 py-7 space-y-3
                    ${sidebarOpen ? "overflow-y-auto overflow-x-hidden" : "overflow-visible"}
                    sm:overflow-y-auto sm:overflow-x-hidden
                `}>
                    {filteredItems.map((item, index) => {

                        const isDropdown = item.children
                        const isActive = item.href && pathname === item.href
                        const isChildActive = item.children?.some(
                            (child) => pathname === child.href
                        )

                        const baseClass = `
                            w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition
                            ${item.label === "Logout"
                                ? "hover:bg-red-50 hover:text-red-600"
                                : isActive || isChildActive
                                    ? "bg-[#FFB502] text-white"
                                    : "hover:bg-gray-100 hover:text-gray-900"
                            } ${!sidebarOpen ? "justify-center" : "justify-between"} sm:justify-between
                        `

                        const content = (
                            <>
                                <div className="flex items-center gap-3">
                                    <span className="text-base">{item.icon}</span>
                                    <span className={`${sidebarOpen ? "inline" : "hidden"} sm:inline`}>{item.label}</span>
                                </div>

                                {item.children && (
                                    <span className={`${sidebarOpen ? "inline-flex" : "hidden"} sm:inline-flex`}>
                                        {openDropdown === index
                                            ? <ChevronUp size={18} />
                                            : <ChevronDown size={18} />}
                                    </span>
                                )}
                            </>
                        )

                        return (
                            <div key={item.label} className="relative group">

                                {!sidebarOpen && (
                                    <span className="
                                        sm:hidden
                                        pointer-events-none
                                        absolute left-full top-1/2 -translate-y-1/2 ml-3 z-9999
                                        whitespace-nowrap rounded-lg bg-gray-900 text-white text-xs px-2.5 py-1.5 shadow-lg
                                        opacity-0 group-hover:opacity-100 transition-opacity duration-150
                                    ">
                                        {item.label}
                                        <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
                                    </span>
                                )}

                                {item.href ? (
                                    <Link href={item.href} className={baseClass}>
                                        {content}
                                    </Link>
                                ) : (
                                    <button
                                        onClick={async () => {
                                            if (item.action === "logout") {
                                                await handleLogout()
                                            } else if (isDropdown) {
                                                setOpenDropdown(openDropdown === index ? null : index)
                                            }
                                        }}
                                        className={baseClass}
                                    >
                                        {content}
                                    </button>
                                )}

                                {item.children && openDropdown === index && (
                                    <div className="ml-5 mt-1 space-y-1 max-w-55">
                                        {item.children.map((child) => {
                                            const isChild = pathname === child.href

                                            return (
                                                <Link
                                                    key={child.label}
                                                    href={child.href || "#"}
                                                    className={`
                                                        flex w-full items-center gap-2.5 text-left px-3 py-1.5 text-xs rounded-lg transition-colors
                                                        ${isChild
                                                            ? "bg-gray-200 text-gray-900"
                                                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                                        }
                                                    `}
                                                >
                                                    {child.icon ? (
                                                        <span className="text-gray-500">{child.icon}</span>
                                                    ) : (
                                                        <span className="w-4 h-4 inline-block" />
                                                    )}
                                                    <span className="truncate">{child.label}</span>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </nav>

                <div className={`px-4 py-4 border-t border-gray-300 flex items-center transition-all duration-300 ease-in-out overflow-hidden ${sidebarOpen ? "gap-3 flex-row" : "gap-2 flex-col"} sm:gap-3 sm:flex-row`}>

                    {isLoading ? (
                        <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
                    ) : user?.image ? (
                        <Image
                            src={user.image}
                            alt="User avatar"
                            width={40}
                            height={40}
                            className={`
                                rounded-full object-cover shrink-0
                                ${sidebarOpen ? 'w-10 h-10' : 'w-8 h-8'} sm:w-10 sm:h-10
                                transition-all duration-300
                            `}
                            unoptimized={user.image.includes("googleusercontent.com")}
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-600 shrink-0">
                            {initials}
                        </div>
                    )}

                    <div className={`transition-all duration-300 ease-in-out text-center ${sidebarOpen ? "opacity-100 max-w-40" : "opacity-0 max-w-0 overflow-hidden h-0"} sm:opacity-100 sm:max-w-40 sm:h-auto`}>
                        {isLoading ? (
                            <div className="h-5 w-24 bg-gray-200 rounded mx-auto" />
                        ) : user ? (
                            <p className="text-sm text-gray-900 truncate">
                                {user.name || user.email?.split("@")[0] || "User"}
                            </p>
                        ) : (
                            <p className="text-sm text-gray-500">Not signed in</p>
                        )}
                    </div>

                </div>
            </aside>
        </>
    )
}
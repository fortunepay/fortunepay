"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu } from "@/components/icons/IconPacks";
import { NavLinks } from "@/constant/UserInterfaceConts";

export default function UserNavbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleDropdown = (name: string) => {
        setDropdownOpen(dropdownOpen === name ? null : name);
    };

    const Chevron = ({ name }: { name: string }) => (
        <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${dropdownOpen === name ? "rotate-180" : ""
                }`}
        />
    );

    return (
        <nav
            className={`fixed left-0 right-0 z-50 flex justify-center transition-all duration-200 ${scrolled ? "top-0" : "top-8"
                }`}
        >
            <div
                className={`flex items-center justify-between transition-all duration-300 ${scrolled
                    ? "w-full bg-white md:px-15 sm:px-6 py-3 shadow-md"
                    : "max-w-85 sm:max-w-md md:max-w-6xl xl:max-w-450 w-full bg-white px-6 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg"
                    }`}
            >
                <Link href="/" className="flex items-center">
                    <div className="relative h-9 w-32 md:h-10 md:w-36">
                        <Image
                            src="/logo/logo.webp"
                            alt="FortunePay Logo"
                            fill
                            priority
                            className="object-contain"
                            sizes="(max-width: 768px) 128px, 144px"
                            loading="eager"
                        />
                    </div>
                </Link>

                <div className="hidden lg:flex items-center gap-10">
                    <div className="flex items-center gap-8 text-sm font-medium text-[#0A1A8F]">
                        {NavLinks.map((item) => {
                            if (!item.dropdown) {
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href || "#"}
                                        className="hover:text-[#0A1A8F]"
                                    >
                                        {item.name}
                                    </Link>
                                );
                            }

                            return (
                                <div key={item.name} className="relative">
                                    <button
                                        onClick={() => toggleDropdown(item.name)}
                                        className="flex items-center gap-1"
                                    >
                                        {item.name} <Chevron name={item.name} />
                                    </button>

                                    {dropdownOpen === item.name && (
                                        <div className="absolute top-full mt-2 bg-white shadow-lg rounded-md py-3 w-44">
                                            {item.dropdown.map((sub) => (
                                                <Link
                                                    key={sub.name}
                                                    href={sub.href}
                                                    className="block px-4 py-2 hover:bg-gray-100"
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <Link
                        href="/download"
                        className="bg-yellow-500 text-white font-semibold px-6 py-2 rounded-full transition-colors"
                    >
                        Download
                    </Link>
                </div>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="lg:hidden text-blue-700 text-2xl"
                    aria-label="Toggle menu"
                >
                    <Menu />
                </button>
            </div>

            {menuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-lg lg:hidden">
                    <div className="flex flex-col items-center py-5 gap-5 text-blue-700 font-medium">
                        {NavLinks.map((item) => {
                            if (!item.dropdown) {
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href || "#"}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            }

                            return (
                                <div key={item.name} className="flex flex-col items-center">
                                    <span className="font-semibold">{item.name}</span>
                                    {item.dropdown.map((sub) => (
                                        <Link
                                            key={sub.name}
                                            href={sub.href}
                                            onClick={() => setMenuOpen(false)}
                                            className="text-sm text-gray-600"
                                        >
                                            {sub.name}
                                        </Link>
                                    ))}
                                </div>
                            );
                        })}

                        <Link
                            href="/download"
                            onClick={() => setMenuOpen(false)}
                            className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-full font-semibold transition-colors"
                        >
                            Download
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
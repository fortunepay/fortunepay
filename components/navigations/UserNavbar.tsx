"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, } from "@/components/icons/IconPacks";
import { NavLinks } from "@/constant/UserInterfaceConts";

export default function UserNavbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled(isScrolled);
            if (isScrolled) setMenuOpen(false);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!(e.target as HTMLElement).closest("[data-navbar]")) {
                setDropdownOpen(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDropdown = (name: string) =>
        setDropdownOpen(dropdownOpen === name ? null : name);

    const Chevron = ({ name }: { name: string }) => (
        <ChevronDown
            size={16}
            className={`shrink-0 transition-transform duration-300 ${dropdownOpen === name ? "rotate-180" : ""
                }`}
        />
    );

    return (
        <>
            <nav
                data-navbar
                className={`fixed left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-in-out ${scrolled ? "top-4" : "top-0"
                    }`}
            >
                <div
                    className={`flex items-center justify-between bg-white transition-all duration-500 ease-in-out ${scrolled
                        ? "w-[min(720px,92vw)] px-5 py-2.5 rounded-full shadow-[0_8px_32px_rgba(10,26,143,0.18)] border border-gray-100"
                        : "w-full px-6 sm:px-10 md:px-16 py-3 shadow-md border-b border-gray-100"
                        }`}
                >
                    <Link href="/" className="flex items-center shrink-0">
                        <div
                            className={`relative transition-all duration-500 ${scrolled ? "h-8 w-28" : "h-10 w-36"
                                }`}
                        >
                            <Image
                                src="/logo/logo.webp"
                                alt="FortunePay Logo"
                                fill
                                priority
                                className="object-contain"
                                sizes="(max-width: 768px) 112px, 144px"
                                loading="eager"
                            />
                        </div>
                    </Link>

                    <div className="hidden lg:flex items-center gap-6 xl:gap-10">
                        <div className="flex items-center gap-6 xl:gap-8 text-sm font-medium text-[#0A1A8F]">
                            {NavLinks.map((item) => {
                                if (!item.dropdown) {
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href || "#"}
                                            className="hover:opacity-70 transition-opacity duration-150 whitespace-nowrap"
                                        >
                                            {item.name}
                                        </Link>
                                    );
                                }

                                return (
                                    <div key={item.name} className="relative">
                                        <button
                                            onClick={() => toggleDropdown(item.name)}
                                            className="flex items-center gap-1 hover:opacity-70 transition-opacity duration-150 whitespace-nowrap"
                                        >
                                            {item.name} <Chevron name={item.name} />
                                        </button>

                                        {dropdownOpen === item.name && (
                                            <div
                                                className="absolute top-full left-1/2 mt-7 bg-white shadow-xl rounded-2xl py-2 px-2 w-80 z-50"
                                                style={{ transform: "translateX(-50%)", animation: "fadeSlideDown 0.18s ease-out" }}
                                            >
                                                {item.dropdown.map((sub: any) => (
                                                    <Link
                                                        key={sub.name}
                                                        href={sub.href}
                                                        onClick={() => setDropdownOpen(null)}
                                                        className="flex items-start gap-3 px-3 py-2.5 text-sm hover:bg-gray-100 text-[#0A1A8F] transition-colors duration-150 rounded-xl"
                                                    >
                                                        <span className="bg-[#febf101b] text-[#FEBE10] shrink-0 mt-0.5 w-8 h-8 rounded flex items-center justify-center text-lg">
                                                            {sub.icon ?? sub.name}
                                                        </span>
                                                        <span className="flex flex-col">
                                                            <span className="font-semibold leading-tight">{sub.name}</span>
                                                            {sub.description && (
                                                                <span className="text-xs text-gray-500 mt-1">
                                                                    {sub.description}
                                                                </span>
                                                            )}
                                                        </span>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {!scrolled && (
                            <Link
                                href="/download"
                                className="bg-yellow-500 hover:bg-yellow-400 text-white font-semibold rounded-full px-6 py-2 text-sm transition-all duration-300 whitespace-nowrap"
                            >
                                Download
                            </Link>
                        )}
                    </div>

                    <button
                        onClick={() => setMenuOpen((v) => !v)}
                        className="lg:hidden text-[#0A1A8F] p-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </nav>

            <div
                className={`fixed inset-0 bg-black/20 z-40 lg:hidden transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setMenuOpen(false)}
                aria-hidden="true"
            />

            {/* MOBILE VIEW */}
            <div
                className={`fixed left-0 right-0 z-45 lg:hidden transition-all duration-300 ease-in-out ${menuOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                style={{ top: scrolled ? "5.5rem" : "4.5rem" }}
            >
                <div className="mx-4 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="flex flex-col py-4 px-3 gap-1">
                        {NavLinks.map((item) => {
                            if (!item.dropdown) {
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href || "#"}
                                        onClick={() => setMenuOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#0A1A8F] font-medium hover:bg-blue-50 active:bg-blue-100 transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                );
                            }

                            return (
                                <div key={item.name}>
                                    <button
                                        onClick={() => toggleDropdown(item.name)}
                                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-[#0A1A8F] font-medium hover:bg-blue-50 active:bg-blue-100 transition-colors text-left"
                                    >
                                        <span className="flex-1">{item.name}</span>
                                        <Chevron name={item.name} />
                                    </button>

                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${dropdownOpen === item.name
                                            ? "max-h-96 opacity-100"
                                            : "max-h-0 opacity-0"
                                            }`}
                                    >
                                        <div className="mb-1 bg-gray-100 rounded-xl p-2 flex flex-col gap-0.5">
                                            {item.dropdown.map((sub: any) => (
                                                <Link
                                                    key={sub.name}
                                                    href={sub.href}
                                                    onClick={() => {
                                                        setMenuOpen(false);
                                                        setDropdownOpen(null);
                                                    }}
                                                    className="flex items-start gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-white active:bg-white hover:text-[#0A1A8F] transition-colors"
                                                >
                                                    <span className="bg-[#febf101b] text-[#FEBE10] shrink-0 mt-0.5 w-8 h-8 rounded flex items-center justify-center text-lg">
                                                        {sub.icon ?? sub.name}
                                                    </span>
                                                    <span className="flex flex-col">
                                                        <span className="font-semibold leading-tight">{sub.name}</span>
                                                        {sub.description && (
                                                            <span className="text-xs text-gray-500 mt-1">
                                                                {sub.description}
                                                            </span>
                                                        )}
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        <div className="pt-2 px-2 pb-1">
                            <Link
                                href="/download"
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-full transition-colors w-full"
                            >
                                Download
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
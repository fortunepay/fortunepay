"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail } from "@/components/icons/IconPacks";

export default function Footer() {
    return (
        <footer
            className="w-full border-t border-blue-100"
            style={{
                background: 'linear-gradient(1deg, #ffffff 0%, #97d3ff 200%)',
            }}
        >
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
                    <div className="shrink-0 max-w-xs relative">
                        <div className="relative w-36 h-12">
                            <Image
                                src="/logo/logo.webp"
                                alt="FortunePay Logo"
                                fill
                                priority
                                className="object-contain"
                                sizes="144px"
                            />
                        </div>

                        <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                            Easypay Global EMI Corp. (Fortune Pay) is regulated by the Bangko
                            Sentral ng Pilipinas.
                        </p>

                        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                            Have any questions? Call (02) 8366 6122 or message us at{" "}
                            <a
                                href="mailto:support@fortunepay.com"
                                className="text-blue-600 hover:underline"
                            >
                                support@fortunepay.com
                            </a>{" "}
                            | message us in our official Facebook page
                        </p>

                        <p className="mt-3 text-sm text-gray-600">
                            EcoTower, 32nd St., Cor. 9th Avenue
                        </p>

                        <div className="mt-6 relative h-16">
                            <div className="flex flex-wrap gap-x-6 gap-y-3">
                                <a
                                    href="tel:+639176201513"
                                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                    <Phone size={16} />
                                    +63 917 620 1513
                                </a>

                                <a
                                    href="mailto:support@fortunepay.com"
                                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                    <Mail size={16} />
                                    support@fortunepay.com
                                </a>
                            </div>
                            {/* <div className="absolute -right-10 -top-10 translate-x-4">  
                                <div className="relative w-45 h-45">  
                                    <Image
                                        src="/logo/dpo.webp"
                                        alt="DPO DPS Logo"
                                        fill
                                        className="object-contain drop-shadow-sm"
                                    />
                                </div>
                            </div> */}
                        </div>
                    </div>

                    <div className="flex-1 grid grid-cols-3 gap-8 lg:justify-end">
                        <div>
                            <h4 className="text-sm font-semibold text-gray-800 mb-4">Business</h4>
                            <ul className="space-y-3">
                                {[
                                    { label: "Send", href: "/send" },
                                    { label: "Pay", href: "/pay" },
                                    { label: "Cash In / Cash Out", href: "/cash" },
                                    { label: "Enjoy", href: "/enjoy" },
                                ].map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-gray-800 mb-4">People</h4>
                            <ul className="space-y-3">
                                {[
                                    { label: "FPromotions", href: "/promotions" },
                                    { label: "FPosts", href: "/posts" },
                                ].map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-gray-800 mb-4">Company</h4>
                            <ul className="space-y-3">
                                {[
                                    { label: "About Us", href: "/about" },
                                    { label: "Careers", href: "/careers" },
                                    { label: "Help Center", href: "/help" },
                                    { label: "FAQs", href: "/faqs" },
                                ].map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-100/80 bg-white/60 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-6 py-5 text-center sm:text-left">
                    <p className="text-xs text-gray-500">
                        © Copyright Easypay Global EMI Corp. 2024 – All Rights Reserved
                    </p>
                </div>
            </div>
        </footer>
    );
}
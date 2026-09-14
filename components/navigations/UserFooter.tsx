"use client";

import Link from "next/link";
import Image from "next/image";
import ChatWidget from "./ChatWidget";
// import { Phone, Mail } from "@/components/icons/IconPacks";

const data = {
    company: {
        name: "FortunePay",
        logo: "/logo/logo.webp",
        legalName: "Easypay Global EMI Corp. (Fortune Pay)",
        description:
            "Easypay Global EMI Corp. (Fortune Pay) is regulated by the Bangko Sentral ng Pilipinas.",
        address: "EcoTower, 32nd St., Cor. 9th Avenue",
    },
    contact: {
        email: "support@fortunepay.com",
        phone: "+63 6000000000",
        phoneHref: "+6000000000",
        facebookHref: "https://facebook.com/fortunepay",
    },
    copyright: "© 2024 FortunePay. All rights reserved.",
    legalLinks: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms & Conditions", href: "/terms" },
    ],
    compliance: {
        regulatorIntro: "FortunePay",
        bspHref: "https://www.bsp.gov.ph",
        groupText:
            "Fortune Pay is an Easypay Global EMI Corp. product, providing secure digital payments and financial services across the Philippines.",
    },
};

type FooterLink = { label: string; href: string; soon?: boolean };

const footerColumns: { title: string; soon?: boolean; links: FooterLink[] }[] = [
    {
        title: "Business",
        links: [
            { label: "Send", href: "/send" },
            { label: "Pay", href: "/pay" },
            { label: "Cash In / Cash Out", href: "/cash" },
            { label: "Enjoy", href: "/enjoy" },
        ],
    },
    {
        title: "People",
        links: [
            { label: "FPromotions", href: "/promotions" },
            { label: "FPosts", href: "/posts", soon: true },
        ],
    },
    {
        title: "Company",
        soon: true,
        links: [
            { label: "About Us", href: "/about" },
            { label: "Careers", href: "/careers" },
            { label: "Help Center", href: "/help" },
            { label: "FAQs", href: "/faqs" },
        ],
    },
];

// const contactMethods = [
//     { icon: Phone, label: data.contact.phone, href: `tel:${data.contact.phoneHref}` },
//     { icon: Mail, label: data.contact.email, href: `mailto:${data.contact.email}` },
// ];

const appLinks = [
    { label: "Download on the App Store", href: "#", badge: "/footer/app-gallery-footer.webp" },
    { label: "Get it on Google Play", href: "#", badge: "/footer/google-play-badge.webp" },
    { label: "Explore it on AppGallery", href: "#", badge: "/footer/ios-badge.webp" },
];

export default function Footer() {
    return (
        <footer className="relative bg-linear-to-b from-[#E7F7FF] w-full pt-16 pb-8 rounded-t-3xl">
            <div className="mx-auto max-w-6xl px-6">
                <div className="grid grid-cols-2 gap-y-12 gap-x-8 md:grid-cols-4 lg:grid-cols-5">
                    <div className="col-span-2 lg:col-span-2">
                        <div className="relative mb-5 h-9 w-32">
                            <Image
                                src={data.company.logo}
                                alt={`${data.company.name} Logo`}
                                fill
                                className="object-contain object-left"
                            />
                        </div>

                        <p className="mb-2 max-w-xs text-sm leading-relaxed text-neutral-600">
                            {data.company.description}
                        </p>
                        <p className="mb-6 max-w-xs text-sm leading-relaxed text-neutral-600">
                            {data.company.address}
                        </p>

                        {/* <div className="flex gap-3 mb-6 ">
                            {contactMethods.map(({ icon: Icon, label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    title={label}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition hover:border-blue-500 hover:text-blue-500"
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div> */}

                        <div className="flex flex-row items-center gap-2">
                            {appLinks.map(({ label, href, badge }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={label}
                                    className="relative h-8 w-24 shrink-0 transition-transform hover:scale-105"
                                >
                                    <Image
                                        src={badge}
                                        alt={label}
                                        fill
                                        className="object-contain"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>

                    {footerColumns.map((column) => (
                        <div key={column.title}>
                            <h4 className="mb-4 flex items-center text-sm font-semibold tracking-wide text-blue-600">
                                {column.title}
                                {column.soon && (
                                    <span className="ml-2 rounded-full bg-yellow-100 px-2 py-0.5 text-[10px] font-medium text-yellow-700">
                                        Soon
                                    </span>
                                )}
                            </h4>
                            <ul className="space-y-3">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="flex items-center text-sm text-neutral-600 transition hover:text-neutral-950"
                                        >
                                            {link.label}
                                            {link.soon && (
                                                <span className="ml-2 rounded-full bg-yellow-100 px-2 py-0.5 text-[10px] font-medium text-yellow-700">
                                                    Soon
                                                </span>
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-14 rounded-2xl bg-blue-600 p-10">
                    <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                        <div className="max-w-3xl">
                            <p className="text-sm leading-relaxed text-white/90">
                                {data.compliance.regulatorIntro} is regulated by the Bangko
                                Sentral ng Pilipinas. For any concerns, please contact us through
                                our in-app chat, by email (
                                <a
                                    href={`mailto:${data.contact.email}`}
                                    className="underline underline-offset-2 hover:text-white"
                                >
                                    {data.contact.email}
                                </a>
                                ), by dialing our hotline at {data.contact.phone}, or through our
                                valid social media accounts.
                            </p>

                            <p className="mt-4 text-sm leading-relaxed text-white/90">
                                {data.compliance.groupText}
                            </p>
                        </div>

                        <div className="flex shrink-0 items-center justify-center">
                            <div
                                key="DPO/DPS Registered"
                                className="relative h-44 w-44 shrink-0 md:h-60 md:w-60"
                                title="DPO/DPS Registered"
                            >
                                <Image
                                    src="/footer/dps2-dps-seal.webp"
                                    alt="DPO/DPS Registered"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-neutral-100 pt-6 md:flex-row">
                    <p className="text-xs text-neutral-500">{data.copyright}</p>

                    <div className="flex items-center gap-6">
                        {data.legalLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-xs text-neutral-500 transition hover:text-neutral-900"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <ChatWidget />
        </footer>
    );
}
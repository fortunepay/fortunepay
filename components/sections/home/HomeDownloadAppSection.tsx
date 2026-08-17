'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TitleHeading from "@/components/text/TitleHeading";

export default function aHomeDownloadAppSection() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="w-full py-16 md:py-24">
            <div className="container mx-auto xl:px-25">
                <div className="relative bg-linear-to-r from-blue-600 via-blue-500 to-cyan-500 rounded-3xl shadow-2xl">
                    {mounted && (
                        <div className="absolute -left-40 top-1/2 w-0 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
                    )}
                    <div className="relative z-10">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                            <div className="relative w-full lg:w-1/2 h-100 md:h-130 flex justify-center">
                                <div className="absolute -top-20 md:-top-28 lg:-top-32 md:w-100 lg:w-105 z-30 w-full h-full">
                                    <Image
                                        src="/backgrounds/home/download.webp"
                                        alt="Fortune Pay App Interface"
                                        fill
                                        className="w-full h-auto drop-shadow-2x"
                                        loading="lazy"
                                        sizes='auto'
                                    />
                                </div>
                            </div>

                            <div className="w-full lg:w-1/2 text-white space-y-4 lg:pr-15">
                                <div className="space-y-4">
                                    <TitleHeading text="Download the Fortune Pay App today!" size="md" />
                                    <p className="text-sm text-blue-50 leading-relaxed">
                                        Stay informed and up-to-date with the latest news and
                                        exclusive promotions from Fortune Pay.
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                    <Link
                                        href="https://apps.apple.com/th/app/fortune-pay-cashless-payment/id1513531754"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <button
                                            type="button"
                                            className="flex items-center justify-center w-40 h-12 bg-black text-white rounded-lg hover:bg-gray-900 transition shadow-md"
                                        >
                                            <div className="mr-2">
                                                <svg viewBox="0 0 384 512" width="22" fill="currentColor">
                                                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                                                </svg>
                                            </div>

                                            <div className="leading-tight text-left">
                                                <div className="text-[9px]">Download on the</div>
                                                <div className="text-sm font-semibold -mt-0.5">App Store</div>
                                            </div>
                                        </button>
                                    </Link>
                                    <Link
                                        href="https://play.google.com/store/apps/details?id=com.fp.fortunepayapp&hl=en"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <button
                                            type="button"
                                            className="flex items-center justify-center w-40 h-12 bg-black text-white rounded-lg hover:bg-gray-900 transition shadow-md"
                                        >
                                            <div className="mr-2">
                                                <svg viewBox="30 336.7 120.9 129.2" width="22">
                                                    <path fill="#FFD400"
                                                        d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z" />
                                                    <path fill="#FF3333"
                                                        d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1z" />
                                                    <path fill="#48FF48"
                                                        d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z" />
                                                    <path fill="#3BCCFF"
                                                        d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z" />
                                                </svg>
                                            </div>
                                            <div className="leading-tight text-left">
                                                <div className="text-[9px]">GET IT ON</div>
                                                <div className="text-sm font-semibold -mt-0.5">Google Play</div>
                                            </div>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
"use client";

import { useEffect, useRef } from "react";
import TitleHeading from "@/components/text/TitleHeading";

export default function HeroSection() {
    const heroRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const hero = heroRef.current;
        const content = contentRef.current;

        if (!hero || !content) return;

        const handleScroll = () => {
            const scrollY = window.scrollY;
            content.style.transform = `translateY(${scrollY * 0.35}px)`;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
            >
                <source src="/videos/video_1.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-linear-to-t from-[#1582D2]/80 via-black/10 to-transparent" />
            <div ref={contentRef} className="absolute bottom-12 left-1/2 z-10 w-full max-w-4xl -translate-x-1/2 px-6 text-center text-white">
                <p className="text-xl font-semibold md:text-2xl text-gray-200">
                    Welcome to Fortune Pay
                </p>
                <TitleHeading text="Your Secure Payment Platform" align="center"/>
                <p className="text-lg text-gray-200">
                    Leading the society towards a cashless future with top-tier
                    security and convenience for personal and business use.
                </p>
            </div>
        </section>
    );
}
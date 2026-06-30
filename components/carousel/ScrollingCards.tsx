'use client'

import React, { useState, useEffect, useRef } from 'react';
import TitleHeading from '../text/TitleHeading';
import { ScrollingCardServicesProps } from "@/types/public/userTypes";

export function ScrollingCardServices({ slides }: ScrollingCardServicesProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const stickyPanelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollableHeight = container.scrollHeight - window.innerHeight;
            const stepHeight = scrollableHeight / slides.length;
            const newActiveIndex = Math.min(
                slides.length - 1,
                Math.floor(container.scrollTop / stepHeight)
            );
            setActiveIndex(newActiveIndex);
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [slides.length]);

    const activeSlide = slides[activeIndex];

    const dynamicStyles = {
        color: activeSlide.textColor,
        transition: 'color 0.7s ease',
    };

    return (
        <>
            <section className="bg-linear-to-t from-[#E7F7FF] w-full">
                <div
                    ref={scrollContainerRef}
                    className="h-screen w-full overflow-y-auto"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <div style={{ height: `${slides.length * 100}vh` }}>
                        <div
                            ref={stickyPanelRef}
                            className="sticky top-0 h-screen w-full flex flex-col items-center justify-center"
                            style={dynamicStyles}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full max-w-7xl mx-auto">

                                {/* LEFT PANEL */}
                                <div className="flex flex-col justify-center p-8 lg:p-16">
                                    <div className="flex gap-5 items-start">
                                        {/* DOTS (VERTICAL)*/}
                                        <div className="flex flex-col gap-3 mt-8 md:mt-3">
                                            {slides.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => {
                                                        const container = scrollContainerRef.current;
                                                        if (container) {
                                                            const scrollableHeight =
                                                                container.scrollHeight - window.innerHeight;
                                                            const stepHeight = scrollableHeight / slides.length;
                                                            container.scrollTo({
                                                                top: stepHeight * index,
                                                                behavior: 'smooth',
                                                            });
                                                        }
                                                    }}
                                                    className={`rounded-full transition-all duration-500 ease-in-out shrink-0 ${index === activeIndex
                                                        ? 'w-4 h-4 bg-blue-600/80 scale-125'
                                                        : 'w-3 h-3 bg-black/20 hover:bg-black/40'
                                                        }`}
                                                    aria-label={`Go to slide ${index + 1}`}
                                                />
                                            ))}
                                        </div>

                                        {/* TEXT */}
                                        <div className="relative h-64 w-full ml-10">
                                            {slides.map((slide, index) => (
                                                <div
                                                    key={index}
                                                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === activeIndex
                                                        ? 'opacity-100 translate-y-0'
                                                        : 'opacity-0 translate-y-10'
                                                        }`}
                                                >
                                                    <TitleHeading
                                                        text={slide.title}
                                                        color="text-blue-600"
                                                        marginBottom="mb-4"
                                                        size="lg"
                                                    />
                                                    <p className="text-lg md:text-xl max-w-md">
                                                        {slide.description}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="hidden md:flex items-center justify-center p-8">
                                    <div className="relative w-[50%] xl:w-[80%] h-[80vh] overflow-hidden">
                                        <div
                                            className="absolute top-0 left-0 w-full h-full transition-transform duration-700 ease-in-out"
                                            style={{ transform: `translateY(-${activeIndex * 100}%)` }}
                                        >
                                            {slides.map((slide, index) => (
                                                <div key={index} className="w-full h-full">
                                                    <img
                                                        src={slide.image}
                                                        alt={slide.title}
                                                        className="h-full w-full object-cover"
                                                        onError={(e) => {
                                                            const target = e.currentTarget as HTMLImageElement;
                                                            target.onerror = null;
                                                            target.src = `#`;
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
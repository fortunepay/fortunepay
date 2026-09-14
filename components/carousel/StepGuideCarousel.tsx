"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "@/components/icons/IconPacks";
import ImageSlide from "@/components/sections/services/ImageSlide";
import { GuideServicesCard } from "@/types/public/userTypes";

interface StepCarouselProps {
    steps: GuideServicesCard[];
    autoPlayInterval?: number;
    autoPlay?: boolean;
    labelColorClass?: string;
    titleColorClass?: string;
    controlColorClass?: string;
    activeDotClass?: string;
    imageHeightClass?: string;
    className?: string;
}

export default function StepCarousel({
    steps,
    autoPlayInterval = 3000,
    autoPlay = true,
    labelColorClass = "text-neutral-500",
    titleColorClass = "text-blue-500",
    controlColorClass = "bg-blue-500 hover:bg-yellow-500",
    activeDotClass = "bg-blue-500",
    imageHeightClass = "h-115",
    className = "",
}: StepCarouselProps) {
    const [index, setIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [textVisible, setTextVisible] = useState(true);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const goTo = useCallback(
        (i: number) => {
            setIndex(((i % steps.length) + steps.length) % steps.length);
        },
        [steps.length]
    );

    const next = useCallback(() => goTo(index + 1), [goTo, index]);
    const prev = useCallback(() => goTo(index - 1), [goTo, index]);

    useEffect(() => {
        if (!isPlaying || steps.length <= 1) return;
        timerRef.current = setInterval(() => {
            setIndex((i) => (i + 1) % steps.length);
        }, autoPlayInterval);
        return () => {
            if (timerRef.current !== null) clearInterval(timerRef.current);
        };
    }, [isPlaying, autoPlayInterval, steps.length]);

    useEffect(() => {
        setTextVisible(false);
        const t = setTimeout(() => setTextVisible(true), 50);
        return () => clearTimeout(t);
    }, [index]);

    useEffect(() => {
        setIndex(0);
    }, [steps]);

    const getPos = (i: number): { pos: "active" | "side" | "hidden"; offset: number } => {
        const diff = (i - index + steps.length) % steps.length;
        if (diff === 0) return { pos: "active", offset: 0 };
        if (diff === 1) return { pos: "side", offset: 150 };
        if (diff === steps.length - 1) return { pos: "side", offset: -150 };
        return { pos: "hidden", offset: 0 };
    };

    const active = steps[index];
    if (!active) return null;

    return (
        <div className={`grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-20 mt-25 ${className}`}>
            <div className="order-2 flex flex-col items-center gap-6 text-center md:order-1 md:items-start md:text-left">
                <div
                    className={`flex flex-col items-center gap-4 transition-all duration-500 ease-out md:items-start ${textVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                        }`}
                >
                    <span className={`text-sm font-semibold tracking-wide ${labelColorClass}`}>
                        Step {String(index + 1).padStart(2)} of {String(steps.length).padStart(2)}
                    </span>
                    <h3 className={`text-2xl font-semibold sm:text-3xl ${titleColorClass}`}>
                        {active.title}
                    </h3>
                    <p className="max-w-md text-base leading-relaxed text-neutral-600">
                        {active.description}
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    {steps.map((step, i) => (
                        <button
                            key={step.src}
                            type="button"
                            onClick={() => goTo(i)}
                            aria-label={`Go to step ${i + 1}`}
                            aria-current={i === index}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? `w-8 ${activeDotClass}` : "w-4 bg-neutral-300 hover:bg-neutral-400"
                                }`}
                        />
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={prev}
                        aria-label="Previous step"
                        className={`flex h-10 w-10 items-center justify-center rounded-full text-white transition ${controlColorClass}`}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsPlaying((p) => !p)}
                        aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
                        className={`flex h-11 w-11 items-center justify-center rounded-full text-white transition ${controlColorClass}`}
                    >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </button>
                    <button
                        type="button"
                        onClick={next}
                        aria-label="Next step"
                        className={`flex h-10 w-10 items-center justify-center rounded-full text-white transition ${controlColorClass}`}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className={`relative order-1 mx-auto w-full md:order-2 md:mx-0 ${imageHeightClass}`}>
                {steps.map((step, i) => (
                    <ImageSlide key={step.src} image={step} state={getPos(i)} />
                ))}
            </div>
        </div>
    );
}
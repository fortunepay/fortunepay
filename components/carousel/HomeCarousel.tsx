'use client';

import { useState, useCallback, useEffect, ReactNode } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaOptionsType } from 'embla-carousel';

interface CarouselProps {
    children: ReactNode[];
    slideWidth?: string;
    slideGap?: string;
    options?: EmblaOptionsType;
    showDots?: boolean;
    showArrows?: boolean;
    dotActiveColor?: string;
    dotInactiveColor?: string;
    className?: string;
    slideClassName?: string;
    onSlideChange?: (index: number) => void;
}


export default function Carousel({
    children,
    slideWidth = '300px',
    slideGap = '12px',
    options,
    showDots = true,
    showArrows = false,
    dotActiveColor = 'bg-yellow-400',
    dotInactiveColor = 'bg-gray-300',
    className = '',
    slideClassName = '',
    onSlideChange,
}: CarouselProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const mergedOptions: EmblaOptionsType = {
        align: 'center',
        loop: true,
        skipSnaps: false,
        dragFree: false,
        ...options,
    };

    const [emblaRef, emblaApi] = useEmblaCarousel(mergedOptions);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        const idx = emblaApi.selectedScrollSnap();
        setSelectedIndex(idx);
        onSlideChange?.(idx);
    }, [emblaApi, onSlideChange]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('select', onSelect);
        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi, onSelect]);

    useEffect(() => {
        if (!emblaApi) return;

        const interval = setInterval(() => {
            emblaApi.scrollNext();
        }, 3000); 

        return () => clearInterval(interval);
    }, [emblaApi]);

    const scrollTo = useCallback(
        (index: number) => emblaApi?.scrollTo(index),
        [emblaApi],
    );
    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    if (!children.length) return null;

    return (
        <div className={`relative w-full ${className}`}>
            <div className="overflow-hidden mx-12" ref={emblaRef}>
                <div className="flex">
                    {children.map((child, i) => (
                        <div
                            key={i}
                            className={`shrink-0 ${slideClassName}`}
                            style={{
                                flex: `0 0 ${slideWidth}`,
                                paddingLeft: slideGap,
                                paddingRight: slideGap,
                            }}
                        >
                            {child}
                        </div>
                    ))}
                </div>
            </div>

            {showArrows && (
                <>
                    <button onClick={scrollPrev} aria-label="Previous slide"
                        className="
                            absolute left-0 top-1/2 -translate-y-1/2 z-10
                            flex items-center justify-center
                            w-9 h-9 rounded-full
                            bg-white/20 backdrop-blur-sm border border-white/30
                            text-white hover:bg-white/40
                            transition-colors duration-200
                        "
                    >
                    </button>
                    <button
                        onClick={scrollNext}
                        aria-label="Next slide"
                        className="
                            absolute right-0 top-1/2 -translate-y-1/2 z-10
                            flex items-center justify-center
                            w-9 h-9 rounded-full
                            bg-white/20 backdrop-blur-sm border border-white/30
                            text-white hover:bg-white/40
                            transition-colors duration-200
                            "
                    >
                    </button>
                </>
            )}

            {showDots && children.length > 1 && (
                <div className="mt-8 flex justify-center items-center gap-2">
                    {children.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => scrollTo(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`h-2 rounded-full transition-all duration-300 ${selectedIndex === i
                                ? `w-8 ${dotActiveColor}`
                                : `w-2 ${dotInactiveColor}`
                                }
                            `}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
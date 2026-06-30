'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from '@/components/icons/IconPacks';
import { StackedSliderProps} from "@/types/public/userTypes";

export function StackedSlider({
    items,
    cardWidth = 500,
    cardHeight = 300,
    gap = 24,
    stackOffset = 28,
}: StackedSliderProps) {
    const [stackedCount, setStackedCount] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const handleNext = () => {
        if (stackedCount < items.length - 1) setStackedCount((v) => v + 1);
    };

    const handlePrev = () => {
        if (stackedCount > 0) setStackedCount((v) => v - 1);
    };

    const unstackedInRow = items.length - 1 - stackedCount;
    const containerWidth = cardWidth + unstackedInRow * (cardWidth + gap);

    return (
        <div className="w-full overflow-hidden py-10">
            <div
                className="relative transition-all duration-700 ease-in-out"
                style={{ height: cardHeight + 20, width: containerWidth }}
            >
                {items.map((item, index) => {
                    let x = 0;
                    let zIndex = 0;
                    let shadow = 'shadow-md';

                    if (index === 0) {
                        x = 0;
                        zIndex = 1;
                    } else if (index <= stackedCount) {
                        x = index * stackOffset;
                        zIndex = index;
                        shadow = 'shadow-xl';
                    } else {
                        x = (index - stackedCount) * (cardWidth + gap) + stackedCount * stackOffset;
                        zIndex = items.length - index;
                    }

                    const isHovered = hoveredIndex === index;
                    const translateY = isHovered ? -30 : 0;

                    const cardContent = (
                        <>
                            {item.gradient && (
                                <div
                                    className="absolute inset-0"
                                    style={{ background: item.gradient }}
                                />
                            )}
                            <img
                                src={item.image}
                                alt={item.alt ?? `Slide ${index + 1}`}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            {(item.title || item.description) && (
                                <div className="absolute top-0 mt-15 inset-x-0 p-4">
                                    {item.title && (
                                        <h3 className="text-white font-bold text-3xl">{item.title}</h3>
                                    )}
                                    {item.description && (
                                        <p className="text-white/90 mt-2 text-sm text-center">
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                            )}
                        </>
                    );

                    const sharedStyle: React.CSSProperties = {
                        width: cardWidth,
                        height: cardHeight,
                        transform: `translateX(${x}px) translateY(${translateY}px)`,
                        zIndex,
                        border: '3px solid white',
                        cursor: item.href ? 'pointer' : 'default',
                    };

                    const sharedClass = `absolute rounded-3xl overflow-hidden ${shadow} transition-all duration-700 ease-in-out`;

                    return item.href ? (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={sharedClass}
                            style={sharedStyle}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {cardContent}
                        </Link>
                    ) : (
                        <div
                            key={item.id}
                            className={sharedClass}
                            style={sharedStyle}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {cardContent}
                        </div>
                    );
                })}
            </div>

            <div className="flex gap-3 mt-8 align-baseline justify-center">
                <button
                    onClick={handlePrev}
                    disabled={stackedCount === 0}
                    className="h-11 w-11 rounded-full border bg-yellow-500 text-white border-gray-300 flex items-center justify-center disabled:opacity-30 transition-colors"
                    aria-label="Unstack card"
                >
                    <ChevronLeft size={18} />
                </button>
                <button
                    onClick={handleNext}
                    disabled={stackedCount === items.length - 1}
                    className="h-11 w-11 rounded-full bg-yellow-500 text-white flex items-center justify-center disabled:opacity-30 transition-opacity"
                    aria-label="Stack next card"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
}
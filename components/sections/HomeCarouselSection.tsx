'use client';

import { useState } from 'react';
import Image from 'next/image';
import ShapeGrid from '@/components/animations/GridHomeCarousel';

const items = [
    {
        title: 'Fortune Pay',
        image: '/backgrounds/home.webp',
    },
    {
        title: 'Fortune Pay',
        image: '/backgrounds/home.webp',

    },
    {
        title: 'Fortune Pay',
        image: '/backgrounds/home.webp',

    },
];

const CARD_WIDTH = 320;

export default function CarouselSection() {
    const [current, setCurrent] = useState(1);

    return (
        <section className="relative min-h-screen overflow-hidden text-white">
            <div className="absolute inset-0 bg-blue-900">
                <ShapeGrid
                    speed={0.1}
                    squareSize={100}
                    direction='diagonal'
                    borderColor="#ffffff"
                    hoverFillColor='#222'
                    shape='square'
                    hoverTrailAmount={0}
                />
            </div>

            <div className="relative z-0 container mx-auto xl:py-25 lg:py-20">
                <h2 className="text-center mb-20 text-4xl font-bold">
                    Experience Fortune Pay
                </h2>

                <div className="relative">
                    <div
                        className="flex items-center transition-transform duration-500 ease-out"
                        style={{
                            transform: `translateX(calc(50% - ${current * CARD_WIDTH}px - ${CARD_WIDTH / 2}px))`,
                        }}
                    >
                        {items.map((item, i) => {
                            const isActive = i === current;

                            return (
                                <div
                                    key={i}
                                    className="shrink-0 px-4"
                                    style={{ width: CARD_WIDTH }}
                                >
                                    <div
                                        className={`rounded-2xl overflow-hidden transition-all duration-500 flex flex-col ${isActive ? 'scale-100 ' : 'scale-90'
                                            }`}
                                    >
                                        <div className="relative h-100 w-full shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-10 flex justify-center gap-2">
                    {items.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`h-2 rounded-full transition-all duration-300 ${current === i
                                ? 'w-8 bg-yellow-400'
                                : 'w-2 bg-white/40'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';

const items = [
    { title: 'Fortune Pay', image: '/backgrounds/bg_1.webp' },
    { title: 'Fortune Pay', image: '/backgrounds/bg_2.webp' },
    { title: 'Fortune Pay', image: '/backgrounds/bg_3.webp' },
    { title: 'Fortune Pay', image: '/backgrounds/bg_4.webp' },
    { title: 'Fortune Pay', image: '/backgrounds/bg_4.webp' },
];

export default function PromoSection() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'center',
        loop: true,
        skipSnaps: false,
        dragFree: false,
    });

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('select', onSelect);
        return () => { emblaApi.off('select', onSelect); };
    }, [emblaApi, onSelect]);

    const scrollTo = useCallback(
        (index: number) => emblaApi?.scrollTo(index),
        [emblaApi]
    );

    return (
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden text-white">
            <div className="w-full">
                <div className="flex justify-center mb-15">
                    <h2 className="bg-[#1593ED] text-white text-2xl md:text-4xl font-bold px-30 py-3 rounded-full inline-block shadow-lg">
                        PROMO
                    </h2>
                </div>
                <div className="relative">
                    <div className="overflow-hidden mx-12" ref={emblaRef}>
                        <div className="flex">
                            {items.map((item, i) => {
                                const isActive = i === selectedIndex;

                                return (
                                    <div
                                        key={i}
                                        className="shrink-0 px-3 transition-all duration-300"
                                        style={{ flex: '0 0 300px' }}
                                    >
                                        <div
                                            className={`rounded-2xl overflow-hidden flex flex-col transition-all duration-300 ${isActive}`}
                                        >
                                            <div className="relative h-64 w-full">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    sizes='auto'
                                                    className="object-cover"
                                                />
                                            </div>

                                            <div className="bg-[linear-gradient(86deg,rgba(9,9,121,1)_28%,rgba(0,212,255,1)_100%)] px-4 py-3 flex items-center justify-between">
                                                <p className="text-sm text-white">
                                                    Ends in 12 hours
                                                </p>
                                                <button className="rounded-md bg-[#FEC400] text-xs font-semibold py-2 px-3 text-black hover:brightness-95 transition">
                                                    Join Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-center items-center gap-2">
                    {items.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => scrollTo(i)}
                            className={`h-2 rounded-full transition-all duration-300 ${selectedIndex === i
                                ? 'w-8 bg-yellow-400'
                                : 'w-2 bg-gray-300'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
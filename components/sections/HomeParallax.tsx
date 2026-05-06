'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface Card {
    id: number;
    title: string;
    subtitle: string;
    image: string;
}

const cards: Card[] = [
    {
        id: 1,
        title: 'Security:',
        subtitle: 'Your financial security is our highest priority.',
        image: '/backgrounds/bg_1.webp',
    },
    {
        id: 2,
        title: 'Convenience:',
        subtitle: 'Make your payments easier and manage your finances effieciently.',
        image: '/backgrounds/bg_2.webp',
    },
    {
        id: 3,
        title: 'Transparency:',
        subtitle: 'View detailed transaction records to track your money.',
        image: '/backgrounds/bg_3.webp',
    },
    {
        id: 4,
        title: 'Customizations:',
        subtitle: 'Customize your solutions to suit different payment needs.',
        image: '/backgrounds/bg_4.webp',
    },
];

export default function ParallaxSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [translateY, setTranslateY] = useState(0);

    useEffect(() => {
        const calc = () => {
            const scrollY = window.scrollY;
            const vh = window.innerHeight;
            const raw = Math.max(0, vh - scrollY * 1);
            setTranslateY(raw);
        };

        calc();
        window.addEventListener('scroll', calc, { passive: true });
        window.addEventListener('resize', calc, { passive: true });

        return () => {
            window.removeEventListener('scroll', calc);
            window.removeEventListener('resize', calc);
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-25"
            style={{
                zIndex: 10,
                transform: `translateY(${translateY}px)`,
                willChange: 'transform',
                borderRadius: '2rem 2rem 0 0',
                minHeight: '100vh',
                background: 'linear-gradient(1deg, #ffffff 0%, #97d3ff 200%)',
            }}
        >
            <div className="relative mx-auto max-w-7xl px-15">
                <h2 className="mb-25 text-center text-4xl font-bold leading-tight tracking-tight text-blue-600 md:text-5xl">
                    Why Choose Fortune Pay?
                </h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 items-start">
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            className="relative rounded-3xl border border-slate-200 drop-shadow-xl/15 overflow-hidden"
                        >
                            <div className="relative z-10 px-6 pt-6 pb-12 bg-[#0B42D3]">
                                <h3 className="text-lg font-semibold text-yellow-400">
                                    {card.title}
                                </h3>
                                <p className="mt-1.5 text-xs leading-relaxed text-white">
                                    {card.subtitle}
                                </p>
                            </div>

                            <div className="relative -mt-8 z-20 rounded-2xl  bg-white overflow-hidden h-52">
                                <Image
                                    src={card.image}
                                    alt={card.title}
                                    fill
                                    sizes="auto"
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
'use client';

import { useEffect, useRef, useState } from 'react';
import { Store, Download, Users } from 'lucide-react';
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
        subtitle:
            'Make your payments easier and manage your finances efficiently.',
        image: '/backgrounds/bg_2.webp',
    },
    {
        id: 3,
        title: 'Transparency:',
        subtitle:
            'View detailed transaction records to track your money.',
        image: '/backgrounds/bg_3.webp',
    },
    {
        id: 4,
        title: 'Customizations:',
        subtitle:
            'Customize your solutions to suit different payment needs.',
        image: '/backgrounds/bg_4.webp',
    },
];

const stats = [
    { label: 'Partnered Merchants', value: 120, icon: Store },
    { label: 'User Downloads', value: 4800, icon: Download },
    { label: 'Other Affiliates', value: 150, icon: Users },
];

function useInView(ref: React.RefObject<HTMLElement | null>) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true);
            },
            { threshold: 0.3 }
        );

        if (ref.current) observer.observe(ref.current);

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [ref]);

    return visible;
}

function CountUp({
    end,
    duration = 1500,
}: {
    end: number;
    duration?: number;
}) {
    const [count, setCount] = useState(0);
    const startTime = useRef<number | null>(null);

    useEffect(() => {
        let frame: number;

        const animate = (time: number) => {
            if (!startTime.current) startTime.current = time;

            const progress = Math.min(
                (time - startTime.current) / duration,
                1
            );

            setCount(Math.floor(progress * end));

            if (progress < 1) {
                frame = requestAnimationFrame(animate);
            }
        };

        frame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(frame);
    }, [end, duration]);

    return <span>{count.toLocaleString()}</span>;
}

export default function HomeWhyChooseSection() {
    const statsRef = useRef<HTMLDivElement>(null);
    const visible = useInView(statsRef as React.RefObject<HTMLElement>);

    return (
        <section
            className="relative w-full py-20"
            style={{
                // borderRadius: '2rem 2rem 0 0',
                minHeight: '100vh',
                background:
                    'linear-gradient(1deg, #ffffff 0%, #97d3ff 200%)',
            }}
        >
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                <h2 className="mb-16 md:mb-20 text-center text-4xl font-bold tracking-tight text-blue-600 md:text-5xl">
                    Why Choose Fortune Pay?
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 items-start">
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl"
                        >
                            <div className="relative z-10 bg-[#0B42D3] px-6 pt-6 pb-12">
                                <h3 className="text-lg font-semibold text-yellow-400">
                                    {card.title}
                                </h3>
                                <p className="mt-1.5 text-xs leading-relaxed text-white">
                                    {card.subtitle}
                                </p>
                            </div>
                            <div className="relative z-20 -mt-8 h-52 overflow-hidden rounded-2xl bg-white">
                                <Image
                                    src={card.image}
                                    alt={card.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div
                ref={statsRef}
                className="relative mx-auto mt-20 max-w-7xl px-6 lg:px-8 text-center"
            >
                <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center justify-center transition-all duration-700 ${visible
                                    ? 'translate-y-0 opacity-100'
                                    : 'translate-y-10 opacity-0'
                                }`}
                        >
                            <div className="mb-3">
                                <stat.icon className="h-13 w-13 text-blue-600" />
                            </div>

                            <div className="flex items-center justify-center text-5xl md:text-6xl font-bold leading-none text-blue-700">
                                {visible ? <CountUp end={stat.value} /> : 0}
                            </div>

                            <p className="mt-2 text-base md:text-lg text-blue-900">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
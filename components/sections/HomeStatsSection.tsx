'use client';

import { useEffect, useRef, useState } from 'react';
import { Store, Download, Users } from 'lucide-react';
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

function CountUp({ end, duration = 1500 }: { end: number; duration?: number }) {
    const [count, setCount] = useState(0);
    const startTime = useRef<number | null>(null);

    useEffect(() => {
        let frame: number;

        const animate = (time: number) => {
            if (!startTime.current) startTime.current = time;
            const progress = Math.min((time - startTime.current) / duration, 1);

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

export default function StatsSection() {
    const ref = useRef<HTMLElement>(null);
    const visible = useInView(ref);

    return (
        <section ref={ref} className="relative bg-white py-5">
            <div className="mx-auto max-w-7xl px-6 text-center">
                {/* <h2 className="text-4xl font-bold text-slate-900 mb-16">
                    Trusted by businesses 
                </h2> */}

                <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className={`flex flex-col items-center justify-center text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                        >
                            <div className="mb-3">
                                <stat.icon className="w-13 h-13 text-blue-600" />
                            </div>
                            <div className="text-6xl font-bold text-blue-700 leading-none flex items-center justify-center">
                                {visible ? <CountUp end={stat.value} /> : 0}
                                {stat.label === 'Uptime' && <span className="ml-1">%</span>}
                            </div>

                            <p className="mt-2 text-lg text-blue-900">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
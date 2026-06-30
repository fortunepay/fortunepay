'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import PromoCarousel from '@/components/carousel/HomeCarousel';
import { PromoEvent } from "@/types/public/userTypes";

function getCountdown(endDateStr: string) {
    const diffMs = new Date(endDateStr).getTime() - Date.now();

    if (diffMs <= 0) return 'Ended';

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    return days > 0
        ? `Ends in ${days}d ${hours}h`
        : `Ends in ${hours}h`;
}

export default function PromoSection() {
    const [events, setEvents] = useState<PromoEvent[]>([]);
    const [visibleEvents, setVisibleEvents] = useState<PromoEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const res = await fetch('/api/marketing/promo');
                const json = await res.json();

                if (!json.success) {
                    throw new Error(json.message);
                }

                setEvents(json.data);
            } catch (err: unknown) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Failed to load promos'
                );
            } finally {
                setLoading(false);
            }
        }

        fetchEvents();
    }, []);

    useEffect(() => {
        const updateVisibleEvents = () => {
            const now = Date.now();

            setVisibleEvents(
                events.filter(
                    (event) =>
                        new Date(event.endDate).getTime() > now
                )
            );
        };

        updateVisibleEvents();

        const interval = setInterval(updateVisibleEvents, 60000);

        return () => clearInterval(interval);
    }, [events]);

    return (
        <section className="relative mb-25 flex flex-col justify-center overflow-hidden text-white">
            <div className="mb-15 flex justify-center">
                <h2 className="inline-block rounded-full bg-[#1593ED] px-30 py-3 text-2xl font-bold text-white shadow-lg md:text-4xl">
                    PROMO
                </h2>
            </div>

            {loading && (
                <div className="flex h-64 items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent" />
                </div>
            )}

            {error && (
                <div className="flex h-64 items-center justify-center">
                    <p className="text-lg font-bold text-red-600">{error}</p>
                </div>
            )}

            {!loading && !error && visibleEvents.length === 0 && (
                <div className="flex h-64 items-center justify-center">
                    <p className="text-lg font-bold text-red-600">
                        No promos available.
                    </p>
                </div>
            )}

            {!loading && !error && visibleEvents.length > 0 && (
                <PromoCarousel slideWidth="300px" slideGap="12px">
                    {visibleEvents.map((event) => (
                        <div
                            key={event._id}
                            className="flex w-75 flex-col overflow-hidden rounded-2xl shadow-lg"
                        >
                            <div className="relative h-65 w-75">
                                <Image
                                    src={event.bannerImage}
                                    alt={event.title}
                                    fill
                                    sizes="300px"
                                    className="object-cover"
                                    loading="lazy"
                                />
                            </div>

                            <div className="flex items-center justify-between bg-[linear-gradient(86deg,rgba(9,9,121,1)_28%,rgba(0,212,255,1)_100%)] px-4 py-3">
                                <span className="text-sm font-medium text-yellow-300">
                                    {getCountdown(event.endDate)}
                                </span>

                                <button className="shrink-0 rounded-md bg-[#FEC400] px-3 py-2 text-xs font-semibold text-black transition hover:brightness-95">
                                    Join Now
                                </button>
                            </div>
                        </div>
                    ))}
                </PromoCarousel>
            )}
        </section>
    );
}
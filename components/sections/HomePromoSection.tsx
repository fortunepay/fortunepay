'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Carousel from '@/components/carousel/HomeCarousel';

interface Event {
    _id: string;
    title: string;
    description: string;
    category: string;
    startDate: string;
    endDate: string;
    bannerImage: string;
    bannerImagePublicId: string;
    createdAt: string;
}

function getCountdown(endDateStr: string) {
    const diffMs = new Date(endDateStr).getTime() - Date.now();
    if (diffMs <= 0) return 'Expired';
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return days > 0 ? `Ends in ${days}d ${hours}h` : `Ends in ${hours}h`;
}

export default function PromoSection() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const res = await fetch('/api/marketing/events');
                const json = await res.json();
                if (!json.success) throw new Error(json.message);
                setEvents(json.data);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : 'Failed to load promos');
            } finally {
                setLoading(false);
            }
        }
        fetchEvents();
    }, []);

    return (
        <section className="relative mb-25 flex flex-col justify-center overflow-hidden text-white">
            <div className="flex justify-center mb-15">
                <h2 className="bg-[#1593ED] text-white text-2xl md:text-4xl font-bold px-30 py-3 rounded-full inline-block shadow-lg">
                    PROMO
                </h2>
            </div>

            {loading && (
                <div className="flex justify-center items-center h-64">
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                </div>
            )}

            {error && (
                <div className="flex justify-center items-center h-64">
                    <p className="text-red-400 text-sm">{error}</p>
                </div>
            )}

            {!loading && !error && events.length === 0 && (
                <div className="flex justify-center items-center h-64">
                    <p className="text-gray-400 text-sm">No promos available.</p>
                </div>
            )}

            {!loading && !error && events.length > 0 && (
                <Carousel slideWidth="300px" slideGap="12px">
                    {events.map((event) => (
                        <div key={event._id} className="rounded-2xl overflow-hidden flex flex-col shadow-lg w-75">
                            <div className="w-75 h-65 relative">
                                <Image
                                    src={event.bannerImage}
                                    alt={event.title}
                                    fill
                                    sizes="300px"
                                    className="object-cover"
                                    loading="lazy"
                                />
                            </div>
                            <div className="bg-[linear-gradient(86deg,rgba(9,9,121,1)_28%,rgba(0,212,255,1)_100%)] px-4 py-3 flex items-center justify-between">
                                <span className="text-sm font-medium text-yellow-300">
                                    {getCountdown(event.endDate)}
                                </span>
                                <button className="rounded-md bg-[#FEC400] text-xs font-semibold py-2 px-3 text-black hover:brightness-95 transition shrink-0">
                                    Join Now
                                </button>
                            </div>
                        </div>
                    ))}
                </Carousel>
            )}
        </section>
    );
}
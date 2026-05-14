'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';

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

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

function getCountdown(endDateStr: string) {
    const now = new Date();
    const end = new Date(endDateStr);
    const diffMs = end.getTime() - now.getTime();

    if (diffMs <= 0) return 'Expired';

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `Ends in ${days}d ${hours}h`;
    return `Ends in ${hours}h`;
}

export default function PromoSection() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'center',
        loop: true,
        skipSnaps: false,
        dragFree: false,
    });

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
                    <>
                        <div className="relative">
                            <div className="overflow-hidden mx-12" ref={emblaRef}>
                                <div className="flex">
                                    {events.map((event, i) => (
                                        <div
                                            key={event._id}
                                            className="shrink-0 px-3"
                                            style={{ flex: '0 0 300px' }}
                                        >
                                            <div className="rounded-2xl overflow-hidden flex flex-col shadow-lg w-75">
                                                <div className="w-75 h-65 relative">
                                                    <Image
                                                        src={event.bannerImage}
                                                        alt={event.title}
                                                        fill
                                                        sizes="300px"
                                                        className="object-cover"
                                                    />
                                                </div>

                                                {/* <div className="bg-[linear-gradient(86deg,rgba(9,9,121,1)_28%,rgba(0,212,255,1)_100%)] px-4 py-3 flex flex-col gap-1">
                                                    <p className="text-white font-semibold text-sm truncate">
                                                        {event.title}
                                                    </p>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex flex-col text-xs text-blue-100 gap-0.5">
                                                            <span>From: {formatDate(event.startDate)}</span>
                                                            <span className="text-yellow-300">
                                                                {getCountdown(event.endDate)}
                                                            </span>
                                                        </div>
                                                        <button className="rounded-md bg-[#FEC400] text-xs font-semibold py-2 px-3 text-black hover:brightness-95 transition shrink-0">
                                                            Join Now
                                                        </button>
                                                    </div>
                                                </div> */}
                                                <div className="bg-[linear-gradient(86deg,rgba(9,9,121,1)_28%,rgba(0,212,255,1)_100%)] px-4 py-3 flex items-center justify-between">
                                                    <span className="text-sm font-medium text-yellow-300">
                                                        {getCountdown(event.endDate)}
                                                    </span>
                                                    <button className="rounded-md bg-[#FEC400] text-xs font-semibold py-2 px-3 text-black hover:brightness-95 transition shrink-0">
                                                        Join Now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-center items-center gap-2">
                            {events.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => scrollTo(i)}
                                    className={`h-2 rounded-full transition-all duration-300 ${selectedIndex === i ? 'w-8 bg-yellow-400' : 'w-2 bg-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
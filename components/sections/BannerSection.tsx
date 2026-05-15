'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Carousel from '@/components/carousel/HomeCarousel';

interface Banner {
    _id: string;
    image: string;
    imagePublicId: string;
    description: string;
    startDate: string;
    endDate: string;
    createdAt: string;
}

export default function BannerSection() {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('/api/marketing/banners');
                const json = await res.json();
                if (!json.success) throw new Error(json.message);
                setBanners(json.data);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : 'Failed to load banners');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <section className="w-full px-4 py-8 bg-white">
            <h2 className="mb-10 text-center text-4xl font-bold leading-tight tracking-tight text-blue-600 md:text-4xl">
                Latest from Fortune Pay
            </h2>
            {!loading && !error && banners.length === 0 && <Empty msg="No banners available." />}
            {!loading && !error && banners.length > 0 && (
                <Carousel
                    slideWidth="500px"
                    slideGap="8px"
                    showArrows
                    options={{
                        align: 'center',
                        loop: true,
                        startIndex: 1,
                    }}
                >
                    {banners.map((banner) => (
                        <div
                            key={banner._id}
                            className="relative rounded-xl overflow-hidden shadow-md cursor-pointer group"
                            style={{ height: '160px' }}
                        >
                            <Image
                                src={banner.image}
                                alt={banner.description}
                                fill
                                sizes="500px"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </Carousel>
            )}
        </section>
    );
}


function Empty({ msg }: { msg: string }) {
    return (
        <div className="flex justify-center items-center h-48">
            <p className="text-gray-400 text-sm">{msg}</p>
        </div>
    );
}
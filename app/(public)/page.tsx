import ParallaxSection from '@/components/sections/HomeParallax';
import StatsSection from '@/components/sections/HomeStatsSection';
import PromoSection from '@/components/sections/HomePromoSection';
import CarouselSection from '@/components/sections/HomeCarouselSection';

export default function HomePage() {
    return (
        <main className="w-full">
            <section className="relative w-full h-screen overflow-hidden top-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/videos/video_1.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-linear-to-t from-[#1582D2] via-white/10 to-transparent" />

                <div className="relative z-10 flex h-full items-end justify-center pb-10 text-center px-4">
                    <div className="max-w-3xl">
                        <p className="text-xl font-semibold md:text-2xl text-gray-200">
                            Welcome to Fortune Pay:
                        </p>
                        <h1 className="text-5xl md:text-4xl font-bold text-white mb-4">
                            Your Secure Payment Platform
                        </h1>
                        <p className="text-lg text-gray-200">
                            Leading the society towards a cashless future with top-tier security and convinience for personal and business use.
                        </p>
                    </div>
                </div>
            </section>

            <div className="relative z-10 -mt-135">
                <ParallaxSection />
            </div>

            <StatsSection />
            <PromoSection />
            <CarouselSection />
        </main>
    );
}
import PromoSection from '@/components/sections/home/HomePromoSection';
import HeroSection from '@/components/sections/home/HeroSection';
import CarouselSection from '@/components/sections/home/HomeCarouselSection';
import ExperienceSection from '@/components/sections/home/HomeExperience';
import HomeWhyChooseSection from '@/components/sections/home/HomeWhyFp';
import BannerSection from '@/components/sections/home/BannerSection';
import HomeDownloadAppSection from '@/components/sections/home/HomeDownloadAppSection';

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <HomeWhyChooseSection />
            <PromoSection />
            <CarouselSection />
            <ExperienceSection />
            <BannerSection />
            <HomeDownloadAppSection />
        </>
    );
}
import PromoSection from '@/components/sections/HomePromoSection';
import HeroSection from '@/components/sections/HeroSection';
import CarouselSection from '@/components/sections/HomeCarouselSection';
import ExperienceSection from '@/components/sections/HomeExperience';
import HomeWhyChooseSection from '@/components/sections/HomeWhyFp';
import BannerSection from '@/components/sections/BannerSection';
import HomeDownloadAppSection from '@/components/sections/HomeDownloadAppSection';

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
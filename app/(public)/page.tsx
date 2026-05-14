import PromoSection from '@/components/sections/HomePromoSection';
import CarouselSection from '@/components/sections/HomeCarouselSection';
import ExperienceSection from '@/components/sections/HomeExperience';
import HeroSection from '@/components/sections/HeroSection';
import HomeWhyChooseSection from '@/components/sections/HomeWhyFp';

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <HomeWhyChooseSection />
            <PromoSection />
            <CarouselSection />
            <ExperienceSection />
        </>
    );
}
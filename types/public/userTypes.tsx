import { ReactNode } from 'react';
import type { EmblaOptionsType } from 'embla-carousel';

// HOME PAGE START
    export interface WhyChooseFortunepayCard {
        id: number;
        title: string;
        subtitle: string;
        image: string;
    }

    export interface PromoEvent {
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
    
    export interface PromoCarouselProps {
        children: ReactNode[];
        slideWidth?: string;
        slideGap?: string;
        options?: EmblaOptionsType;
        showDots?: boolean;
        showArrows?: boolean;
        dotActiveColor?: string;
        dotInactiveColor?: string;
        className?: string;
        slideClassName?: string;
        onSlideChange?: (index: number) => void;
    }

    export interface FpVideoItem {
        _id: string;
        title: string;
        youtubeUrl: string;
        status: "enabled" | "disabled";
        createdAt: string;
    }

    export interface HomeBanner {
        _id: string;
        image: string;
        imagePublicId: string;
        description: string;
        startDate: string;
        endDate: string;
        createdAt: string;
    }
// HOME PAGE END

// SERVICES PAGE/COMPONENTS START
    export interface StackedSliderItem {
        id: string | number;
        image: string;
        alt?: string;
        title?: string;
        description?: string;
        gradient?: string;
        href?: string;
    }

    export interface StackedSliderProps {
        items: StackedSliderItem[];
        cardWidth?: number;
        cardHeight?: number;
        gap?: number;
        stackOffset?: number;
    }

    export interface SlideCardItem {
        title: string;
        description: string;
        image: string;
        textColor?: string;
    }
    
    // export interface ScrollingCardServicesProps {
    //     slides: SlideCardItem[];
    // }

    export interface GuideServicesCard {
        src: string;
        alt: string;
        title: string;
        description: string;
    }

    export interface ImageSlideProps {
        image: { src: string; alt: string };
        state: { pos: "active" | "side" | "hidden"; offset: number };
    }

    export interface SectionBannerProps {
        icon?: React.ReactNode;
        label?: string;
        title: string;
        backgroundColor?: string;
        backgroundImage: string;
        backgroundImageAlt: string;
        imageClassName?: string;
        className?: string;
        color?: string;
    }
  
// SERVICES PAGE/COMPONENTS END
import ServicePageTemplate from "@/components/sections/services/PageTemplate";
import { ScrollingCardServices } from "@/components/carousel/ScrollingCards";
import { SlideCardItem } from "@/types/public/userTypes";

const bankSlides: SlideCardItem[] = [
    {
        title: "1. Open Fortune Pay and select “Transport” ",
        description: "Open the Fortune Pay app and tap “Transport” on the homepage.",
        image: "/backgrounds/services/pay/transport/step_1.webp",
    },
    {
        title: "2. Select transportation category",
        description: "Choose your preferred transport operator or transit card from the options.",
        image: "/backgrounds/services/pay/transport/step_2.webp",
    },
    {
        title: "3. Enter information",
        description: "Fill out the necessary details and payment amount.",
        image: "/backgrounds/services/pay/transport/step_3.webp",
    },
    {
        title: "4. Review Information",
        description: "Double-check your transaction summary",
        image: "/backgrounds/services/pay/transport/step_4.webp",
    },
    {
        title: "5. Enter PIN",
        description: "Input OTP or TPIN to proceed with the transaction.",
        image: "/backgrounds/services/pay/transport/step_5.webp",
    },
];

export default function Transport() {
    return (
        <>
            <ServicePageTemplate
                hero={{
                    heading: "TRANSPORTATION",
                    headingAccent: "",
                    subheading: "Hassle-free transportation payments and top-ups",
                    height: "min-h-full",
                    backgroundColor: "#FB4040",
                    backgroundImage: "/backgrounds/services/pay/transport.webp",
                    backgroundImagePosition: "right bottom",
                    backgroundImageSize: "600px auto",
                    imageAlt: "Transport",
                    textPosition: "left",
                }}
            />
            <ScrollingCardServices slides={bankSlides} />
        </>
    );
}












// "use client";
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import {
//     ChevronLeft,
//     ChevronRight,
//     Pause,
//     Play,
//     Bus,
//     Wallet,
//     Banknote,
//     ArrowUpDown, Sparkle
// } from "@/components/icons/IconPacks";

// interface StepItem {
//     src: string;
//     alt: string;
//     title: string;
//     description: string;
// }

// const steps: StepItem[] = [
//     {
//         title: "1. Open Fortune Pay and select “Transport” ",
//         alt: "Open Fortune Pay and select “Transport”",
//         description: "Open the Fortune Pay app and tap “Transport” on the homepage.",
//         src: "/backgrounds/services/pay/transport/step_1.webp",
//     },
//     {
//         title: "2. Select transportation category",
//         alt: "Select transportation category",
//         description: "Choose your preferred transport operator or transit card from the options.",
//         src: "/backgrounds/services/pay/transport/step_2.webp",
//     },
//     {
//         title: "3. Enter information",
//         alt: "Enter information",
//         description: "Fill out the necessary details and payment amount.",
//         src: "/backgrounds/services/pay/transport/step_3.webp",

//     },
//     {
//         title: "4. Review Information",
//         alt: "Review Information",
//         description: "Double-check your transaction summary",
//         src: "/backgrounds/services/pay/transport/step_4.webp",
//     },
//     {
//         title: "5. Enter PIN",
//         alt: "Enter PIN",
//         description: "Input OTP or TPIN to proceed with the transaction.",
//         src: "/backgrounds/services/pay/transport/step_5.webp",
//     },
// ];

// interface ImageSlideProps {
//     image: { src: string; alt: string };
//     state: { pos: "active" | "side" | "hidden"; offset: number };
// }

// function ImageSlide({ image, state }: ImageSlideProps) {
//     const styles = {
//         active: "opacity-100 z-20 scale-100",
//         side: "opacity-40 blur-[2px] z-10 scale-90",
//         hidden: "opacity-0 z-0 scale-75",
//     };

//     return (
//         <div
//             className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out ${styles[state.pos]}`}
//             style={{ transform: `translateX(${state.offset}px)` }}
//         >
//             <img
//                 src={image.src}
//                 alt={image.alt}
//                 className="h-[115%] max-w-full object-contain "
//                 draggable={false}
//             />
//         </div>
//     );
// }

// function SectionBanner() {
//     return (
//         <div className="relative mb-12 overflow-hidden rounded-2xl bg-blue-500 px-8 py-10 sm:px-12 sm:py-14 md:py-16">
//             <img
//                 src="/backgrounds/services/pay/transport.webp"
//                 alt="Transport payment"
//                 className="pointer-events-none absolute -bottom-13 -right-2 z-0 hidden h-100 w-100 object-contain drop-shadow-2xl sm:block"
//                 draggable={false}
//             />

//             <div className="relative z-10 flex items-center justify-between gap-6">
//                 <div className="flex max-w-xl flex-col items-start gap-3">
//                     <div className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 backdrop-blur-sm">
//                         <Bus className="h-4 w-4 text-white" />
//                         <span className="text-xs font-semibold uppercase tracking-widest text-white">
//                             TRANSPORTATION
//                         </span>
//                     </div>
//                     <h5 className="font-bold text-white text-4xl">
//                         Hassle-free transportation payments and top-ups.
//                     </h5>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default function PhoneCarouselWithSteps() {
//     const [index, setIndex] = useState(0);
//     const [isPlaying, setIsPlaying] = useState(true);
//     const [textVisible, setTextVisible] = useState(true);
//     const timerRef = useRef<NodeJS.Timeout | null>(null);

//     const goTo = useCallback((i: number) => {
//         setIndex(((i % steps.length) + steps.length) % steps.length);
//     }, []);

//     const next = useCallback(() => goTo(index + 1), [goTo, index]);
//     const prev = useCallback(() => goTo(index - 1), [goTo, index]);

//     useEffect(() => {
//         if (!isPlaying) return;
//         timerRef.current = setInterval(() => {
//             setIndex((i) => (i + 1) % steps.length);
//         }, 3000);
//         return () => {
//             if (timerRef.current !== null) clearInterval(timerRef.current);
//         };
//     }, [isPlaying]);

//     useEffect(() => {
//         setTextVisible(false);
//         const t = setTimeout(() => setTextVisible(true), 50);
//         return () => clearTimeout(t);
//     }, [index]);

//     const getPos = (i: number): { pos: "active" | "side" | "hidden"; offset: number } => {
//         const diff = (i - index + steps.length) % steps.length;
//         if (diff === 0) return { pos: "active", offset: 0 };
//         if (diff === 1) return { pos: "side", offset: 150 };
//         if (diff === steps.length - 1) return { pos: "side", offset: -150 };
//         return { pos: "hidden", offset: 0 };
//     };

//     const active = steps[index];

//     return (
//         <>
//             <section className="relative flex w-full flex-col items-center justify-center px-25 py-25 overflow-hidden">
//                 <div className="mx-auto w-full max-w-7xl">
//                     <SectionBanner />
//                     <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-20 mt-25">
//                         <div className="order-2 flex flex-col items-center gap-6 text-center md:order-1 md:items-start md:text-left">
//                             <div
//                                 className={`flex flex-col items-center gap-4 transition-all duration-500 ease-out md:items-start ${textVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
//                                     }`}
//                             >
//                                 <span className="text-sm font-semibold tracking-wide text-neutral-500">
//                                     Step {String(index + 1).padStart(2, "0")} of {String(steps.length).padStart(2, "0")}
//                                 </span>
//                                 <h3 className="text-2xl font-semibold text-blue-500 sm:text-3xl">
//                                     {active.title}
//                                 </h3>
//                                 <p className="max-w-md text-base leading-relaxed text-neutral-600">
//                                     {active.description}
//                                 </p>
//                             </div>

//                             <div className="flex items-center gap-2">
//                                 {steps.map((step, i) => (
//                                     <button
//                                         key={step.src}
//                                         type="button"
//                                         onClick={() => goTo(i)}
//                                         aria-label={`Go to step ${i + 1}`}
//                                         aria-current={i === index}
//                                         className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-blue-500" : "w-4 bg-neutral-300 hover:bg-neutral-400"
//                                             }`}
//                                     />
//                                 ))}
//                             </div>

//                             <div className="flex items-center gap-3">
//                                 <button
//                                     type="button"
//                                     onClick={prev}
//                                     aria-label="Previous step"
//                                     className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white transition hover:bg-yellow-500"
//                                 >
//                                     <ChevronLeft className="h-4 w-4" />
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={() => setIsPlaying((p) => !p)}
//                                     aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
//                                     className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-500 text-white transition hover:bg-yellow-500"
//                                 >
//                                     {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={next}
//                                     aria-label="Next step"
//                                     className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white transition hover:bg-yellow-500"
//                                 >
//                                     <ChevronRight className="h-4 w-4" />
//                                 </button>
//                             </div>
//                         </div>

//                         <div className="relative order-1 mx-auto h-115 w-full md:order-2 md:mx-0">
//                             {steps.map((step, i) => (
//                                 <ImageSlide key={step.src} image={step} state={getPos(i)} />
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 hidden w-[150%] h-full translate-y-1/2 md:block pointer-events-none" viewBox="0 0 1440 320"><path fill="#FDC700" fillOpacity="1" d="M0,32L30,42.7C60,53,120,75,180,90.7C240,107,300,117,360,101.3C420,85,480,43,540,48C600,53,660,107,720,117.3C780,128,840,96,900,90.7C960,85,1020,107,1080,144C1140,181,1200,235,1260,240C1320,245,1380,203,1410,181.3L1440,160L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg>
//             </section>

//             <section className="flex w-full flex-col px-15 pb-50 overflow-hidden bg-[#FDC700]">
//                 <div className="mx-auto w-full max-w-7xl">
//                     <h2 className="text-4xl font-bold tracking-tight text-white mb-10">
//                         Related guides
//                     </h2>

//                     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                         <div className="relative flex flex-col overflow-hidden rounded-2xl bg-linear-to-b from-white to-blue-50 p-5 shadow-sm sm:col-span-2 sm:flex-row sm:items-center">
//                             <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-500">
//                                 <Wallet className="h-7 w-7 text-white" />
//                             </div>

//                             <div className="relative z-10 mt-3 flex-1 sm:ml-4 sm:mt-0">
//                                 <h3 className="text-lg font-bold text-[#061B2B]">
//                                     Send
//                                 </h3>
//                                 <p className="mt-1 text-sm leading-6 text-[#061B2B]/80">
//                                     Add money to your account through banks,
//                                     self-service kiosks, debit and credit cards,
//                                     and more
//                                 </p>
//                             </div>
//                         </div>

//                         {/* Card 2 */}
//                         <div className="relative flex flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-white to-blue-50 p-5 shadow-sm">
//                             <div className="relative z-10 flex items-start gap-4">
//                                 <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-500">
//                                     <Banknote className="h-7 w-7 text-white" />
//                                 </div>

//                                 <div>
//                                     <h3 className="text-lg font-bold text-[#061B2B]">
//                                         Pay Bills
//                                     </h3>
//                                     <p className="mt-1 text-sm leading-6 text-[#061B2B]/80">
//                                         With Fortune Pay you can manage your finances
//                                         across the globe as seamlessly as if you were
//                                         back home
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Card 3 */}
//                         <div className="relative flex flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-white to-blue-50 p-5 shadow-sm">
//                             <div className="relative z-10 flex items-start gap-4">
//                                 <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-500">
//                                     <ArrowUpDown className="h-7 w-7 text-white" />
//                                 </div>

//                                 <div>
//                                     <h3 className="text-lg font-bold text-[#061B2B]">
//                                         Cash in & Cash out
//                                     </h3>
//                                     <p className="mt-1 text-sm leading-6 text-[#061B2B]/80">
//                                         Pay your utilities, subscriptions, and other
//                                         recurring bills all in one place
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-b from-white to-blue-50 p-8 shadow-sm sm:col-span-2 sm:min-h-64 sm:flex-row sm:items-center sm:p-10">
//                             <div className="relative z-10 flex items-start gap-6">
//                                 <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-blue-500 sm:h-24 sm:w-24">
//                                     <Sparkle className="h-10 w-10 text-white sm:h-12 sm:w-12" />
//                                 </div>

//                                 <div>
//                                     <h3 className="text-2xl font-bold text-[#061B2B] sm:text-3xl">
//                                         Perk
//                                     </h3>
//                                     <p className="mt-3 max-w-md text-base leading-7 text-[#061B2B]/80">
//                                         Transfer funds instantly to friends, family,
//                                         or other accounts nationwide
//                                     </p>
//                                 </div>
//                             </div>
//                             {/* <svg
//                                 className="pointer-events-none absolute bottom-0 left-0 z-0 h-24 w-full text-blue-100/60"
//                                 viewBox="0 0 800 100"
//                                 preserveAspectRatio="none"
//                                 fill="currentColor"
//                             >
//                                 <path d="M0,55 C120,15 200,80 320,50 C440,20 520,75 640,45 C700,30 760,55 800,38 L800,100 L0,100 Z" />
//                             </svg> */}
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     );
// }
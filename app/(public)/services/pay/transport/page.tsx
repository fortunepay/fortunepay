"use client";
import { Bus } from "@/components/icons/IconPacks";
import { GuideServicesCard } from "@/types/public/userTypes";
import SectionBanner from "@/components/sections/services/StepPageBanner";
import StepCarousel from "@/components/carousel/StepGuideCarousel";

const steps: GuideServicesCard[] = [
    {
        title: "1. Open Fortune Pay and select “Transport” ",
        alt: "Open Fortune Pay and select “Transport”",
        description: "Open the Fortune Pay app and tap “Transport” on the homepage.",
        src: "/backgrounds/services/pay/transport/step_1.webp",
    },
    {
        title: "2. Select transportation category",
        alt: "Select transportation category",
        description: "Choose your preferred transport operator or transit card from the options.",
        src: "/backgrounds/services/pay/transport/step_2.webp",
    },
    {
        title: "3. Enter information",
        alt: "Enter information",
        description: "Fill out the necessary details and payment amount.",
        src: "/backgrounds/services/pay/transport/step_3.webp",
    },
    {
        title: "4. Review Information",
        alt: "Review Information",
        description: "Double-check your transaction summary",
        src: "/backgrounds/services/pay/transport/step_4.webp",
    },
    {
        title: "5. Enter PIN",
        alt: "Enter PIN",
        description: "Input OTP or TPIN to proceed with the transaction.",
        src: "/backgrounds/services/pay/transport/step_5.webp",
    },
];

export default function ServicesTransportPage() {
    return (
        <>
            <section className="flex w-full flex-col items-center justify-center px-25 py-25 overflow-hidden">
                <div className="mx-auto w-full max-w-7xl">
                    <SectionBanner
                        icon={<Bus className="h-4 w-4 text-white" />}
                        label="TRANSPORTATION"
                        title="Hassle-free transportation payments and top-ups"
                        backgroundColor="bg-gradient-to-r from-[#4D482D] from-10% via-[#BAB7A2] via-50% to-[#BAB7A2] to-100%"
                        color="#BAB7A2"
                        backgroundImage="/backgrounds/services/pay/test1.webp"
                        backgroundImageAlt="Transport payment"
                    />

                    <StepCarousel
                        steps={steps}
                        titleColorClass="text-blue-500"
                        controlColorClass="bg-blue-500 hover:bg-yellow-500"
                        activeDotClass="bg-blue-500"
                    />
                </div>
            </section>
        </>
    );
}

// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { Book, Bus } from "@/components/icons/IconPacks";
// import { GuideServicesCard } from "@/types/public/userTypes";
// import SectionBanner from "@/components/sections/services/StepPageBanner";
// import StepCarousel from "@/components/carousel/StepGuideCarousel";
// import WaveDivider from "@/components/sections/services/WaveSection";

// const steps: GuideServicesCard[] = [
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

// type RelatedGuide = {
//     title: string;
//     description: string;
//     src: string;
//     alt: string;
//     href: string;
//     span: string;
// };

// const relatedGuides: RelatedGuide[] = [
//     {
//         title: "Sending money to family and friends",
//         description:
//             "Send funds instantly to any bank, e-wallet, or Fortune Pay account nationwide.",
//         src: "/backgrounds/services/pay/transport/related_send.webp",
//         alt: "Send money guide",
//         href: "/services/pay/send",
//         span: "col-span-2 row-span-2",
//     },
//     {
//         title: "Paying bills in one tap",
//         description: "Settle utilities, subscriptions, and loans without leaving the app.",
//         src: "/backgrounds/services/pay/transport/related_bills.webp",
//         alt: "Pay bills guide",
//         href: "/services/pay/bills",
//         span: "col-span-1 row-span-1",
//     },
//     {
//         title: "Cash in at partner outlets",
//         description: "Top up your wallet at thousands of accredited stores near you.",
//         src: "/backgrounds/services/pay/transport/related_cashin.webp",
//         alt: "Cash in guide",
//         href: "/services/cash",
//         span: "col-span-1 row-span-1",
//     },
//     {
//         title: "Cash out and withdraw",
//         description: "Convert your balance to cash anytime through our partner network.",
//         src: "/backgrounds/services/pay/transport/related_cashout.webp",
//         alt: "Cash out guide",
//         href: "/services/cash",
//         span: "col-span-2 row-span-1",
//     },
// ];

// export default function ServicesTransportPage() {
//     return (
//         <>
//             <section className="relative flex w-full flex-col items-center justify-center px-25 py-25 overflow-hidden">
//                 <div className="mx-auto w-full max-w-7xl">
//                     <SectionBanner
//                         icon={<Bus className="h-4 w-4 text-white" />}
//                         label="TRANSPORTATION"
//                         title="Hassle-free transportation payments and top-ups"
//                         backgroundColor="bg-gradient-to-r from-[#4D482D] from-10% via-[#BAB7A2] via-50% to-[#BAB7A2] to-100%"
//                         color="#BAB7A2"
//                         backgroundImage="/backgrounds/services/pay/test1.webp"
//                         backgroundImageAlt="Transport payment"
//                     />

//                     <StepCarousel
//                         steps={steps}
//                         titleColorClass="text-blue-500"
//                         controlColorClass="bg-blue-500 hover:bg-yellow-500"
//                         activeDotClass="bg-blue-500"
//                     />
//                 </div>
//                 <WaveDivider shape="wave1" />
//             </section>

//             <section className="flex w-full flex-col items-center justify-center px-25 pb-25 overflow-hidden ">
//                 <div className="mx-auto w-full max-w-7xl">
//                     <div className="mb-10 flex items-end justify-between">
//                         <div>
//                             <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-500 px-3 py-1 text-sm font-semibold tracking-wide text-white">
//                                 <Book className="h-4 w-4" />
//                                 RELATED GUIDES
//                             </p>
//                             <h2 className="text-2xl font-semibold text-blue-500 md:text-3xl">
//                                 More ways to pay with Fortune Pay
//                             </h2>
//                         </div>
//                     </div>

//                     <div className="grid auto-rows-[220px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
//                         {relatedGuides.map((guide) => (
//                             <Link
//                                 key={guide.title}
//                                 href={guide.href}
//                                 className={`group relative overflow-hidden rounded-2xl bg-neutral-900 ${guide.span}`}
//                             >
//                                 <Image
//                                     src={guide.src}
//                                     alt={guide.alt}
//                                     fill
//                                     className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
//                                 />
//                                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

//                                 <div className="relative flex h-full flex-col justify-end p-6">
//                                     <h3 className="text-lg font-semibold text-white md:text-xl">
//                                         {guide.title}
//                                     </h3>
//                                     <p className="mt-2 max-w-md text-sm leading-relaxed text-white/80">
//                                         {guide.description}
//                                     </p>
//                                 </div>
//                             </Link>
//                         ))}
//                     </div>
//                 </div>
//             </section>
//         </>
//     );
// }
import Image from "next/image";
import TitleHeading from "@/components/text/TitleHeading";

export default function ExperienceSection() {
    return (
        <section className="relative min-h-screen w-full overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src="/backgrounds/home/experience.webp"
                    alt="Experience Background"
                    fill
                    loading="lazy"
                    unoptimized
                    className="object-cover"
                />
            </div>

            <div className="relative z-10 min-h-screen max-w-7xl mx-auto px-6 py-20 flex items-center justify-end">
                <div className="w-full md:w-105 flex flex-col gap-6">
                    <TitleHeading text="Experience Fortune Pay" color="text-blue-600" align="center" size="lg" />
                    <div className="backdrop-blur-md bg-white/20 border border-white/40 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.25)] flex flex-col gap-5 transition-transform duration-300 hover:-translate-y-1">
                        <div>
                            <h2
                                className="text-2xl font-bold text-white leading-snug mb-2"
                            >
                                Built for{" "}
                                <span className="text-amber-400">
                                    Secure
                                </span>{" "}
                                Payments
                            </h2>
                            <p className="text-white/90 text-sm leading-relaxed">
                                Keep your financial data secure while tracking
                                and managing payments in real time.
                            </p>
                        </div>

                        <button className="mt-auto self-start flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200 shadow-md">
                            Learn More
                        </button>
                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.2)] flex flex-col gap-5 transition-transform duration-300 hover:-translate-y-1">
                        <div>
                            <h2
                                className="text-2xl font-bold text-amber-400 leading-snug mb-2"
                            >
                                Customized{" "}
                                <span className="text-blue-900">
                                    Payment Methods
                                </span>
                            </h2>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Simplify payments with tailored solutions,
                                built-in document handling, and smooth
                                integration with partner billers.
                            </p>
                        </div>

                        <button className="mt-auto self-start flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200 shadow-md">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
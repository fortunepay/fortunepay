type FeatureRow = {
    title: string;
    description: string;
    src: string;
    alt: string;
    imageSide: "left" | "right";
};

const featureRows: FeatureRow[] = [
    {
        title: "Send and receive payments instantly",
        description:
            "We provide businesses with fast, reliable transfer solutions to streamline partner settlements and daily operational transactions.",
        src: "/backgrounds/business/section_bg1.webp",
        alt: "Send and receive payments instantly",
        imageSide: "right",
    },
    {
        title: "Drive loyalty with rewards and discounts",
        description:
            "We empower partner brands to boost traffic and revenue by featuring their business in exclusive app vouchers, coupons, and reward campaigns.",
        src: "/backgrounds/business/section_bg2.webp",
        alt: "Drive loyalty with rewards and discounts",
        imageSide: "left",
    },
    {
        title: "Let customers pay bills with ease",
        description:
            "We give billers and service providers a seamless digital platform, enabling customers to settle their invoices anytime, anywhere.",
        src: "/backgrounds/business/section_bg3.webp",
        alt: "Let customers pay bills with ease",
        imageSide: "right",
    },
    {
        title: "Make customer transaction effortless",
        description:
            "We help merchants eliminate friction at checkout by integrating seamless Fortune Pay QR codes and quick online payment options.",
        src: "/backgrounds/business/section_bg4.webp",
        alt: "Make customer transaction effortless",
        imageSide: "left",
    },
];

export default function BusinessLandingPage() {
    return (
        <>
            <section
                className="relative w-full h-full overflow-hidden lg:p-10"
            >
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url(/backgrounds/business/banner_section.webp)`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                    }}
                />
                <div className="absolute inset-0 bg-linear-to-r from-blue-950/80 via-blue-900/50 to-blue-900/30" />
                <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/10" />

                <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-6 py-20 md:flex-row md:py-28">
                    <div className="w-full text-center md:w-1/2 md:text-left">
                        <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                            Power your business with Fortune Pay
                        </h1>
                        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-blue-50/90 md:mx-0">
                            Transform the way you handle business transactions with our
                            modern payment ecosystem. Easy-to-integrate, reliable solutions
                            built to elevate your customer experience and power your
                            business forward.
                        </p>
                        <button className="mt-6 rounded-full bg-yellow-500 px-8 py-3 text-sm font-semibold text-blue-900 shadow-md transition-colors hover:bg-yellow-400">
                            Partner With Fortune Pay
                        </button>
                    </div>
                </div>
            </section>

            {/* ALTERNATING FEATURE ROWS */}
            {featureRows.map((row) => (
                <section
                    key={row.title}
                    className="relative w-full h-full overflow-hidden lg:p-10"
                >
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url(${row.src})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                        }}
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-blue-950/80 via-blue-900/50 to-blue-900/30" />
                    <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/10" />

                    <div
                        className={`relative mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-6 py-20 md:py-28 ${row.imageSide === "left"
                            ? "md:flex-row-reverse"
                            : "md:flex-row"
                            }`}
                    >
                        <div
                            className={`w-full md:w-1/2 text-center ${row.imageSide === "left" ? "md:text-right" : "md:text-left"
                                }`}
                        >
                            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                                {row.title}
                            </h1>
                            <p
                                className={`mt-4 max-w-md text-sm leading-relaxed text-blue-50/90 ${row.imageSide === "left" ? "mx-auto md:ml-auto md:mr-0" : "mx-auto md:mx-0"
                                    }`}
                            >
                                {row.description}
                            </p>
                        </div>
                    </div>
                </section>
            ))}

            <section className="w-full bg-white">
                <div className="mx-auto grid w-full grid-cols-1 overflow-hidden md:grid-cols-2 md:shadow-xl">
                    <div className="flex flex-col justify-center rounded-r-3xl bg-blue-600 px-8 py-12 text-white md:px-12 md:py-16">                        <p className="self-start rounded-full bg-white px-4 py-2 text-sm font-semibold tracking-wide text-blue-500">
                        Be Our Partner
                    </p>

                        <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
                            Let&apos;s build
                            <br />
                            the future.
                        </h2>

                        <p className="mt-4 max-w-xs text-sm leading-relaxed text-blue-100">
                            Your email address is safe with us. Required fields are marked with *
                        </p>

                        <div className="mt-8 space-y-4 text-sm">
                            <div>
                                <p className="text-blue-200">Phone Number</p>
                                <p className="font-semibold">+63 917 830 1913</p>
                            </div>

                            <div>
                                <p className="text-blue-200">Email Address</p>
                                <p className="font-semibold">support@fortunepay.com</p>
                            </div>
                        </div>
                    </div>

                    <form className="flex flex-col justify-center gap-4 bg-white px-8 py-12 md:px-12 md:py-16">
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-1 block text-xs font-semibold text-blue-600"
                            >
                                Your Name<span className="text-red-500">*</span>
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="w-full rounded-md border border-blue-100 bg-blue-50/60 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-400"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="mb-1 block text-xs font-semibold text-blue-600"
                            >
                                Email Address<span className="text-red-500">*</span>
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="w-full rounded-md border border-blue-100 bg-blue-50/60 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-400"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="subject"
                                className="mb-1 block text-xs font-semibold text-blue-600"
                            >
                                Subject<span className="text-red-500">*</span>
                            </label>
                            <input
                                id="subject"
                                name="subject"
                                type="text"
                                required
                                className="w-full rounded-md border border-blue-100 bg-blue-50/60 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-400"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="message"
                                className="mb-1 block text-xs font-semibold text-blue-600"
                            >
                                Your Message<span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={4}
                                className="w-full resize-none rounded-md border border-blue-100 bg-blue-50/60 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-400"
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-2 w-full rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 sm:w-auto sm:self-start"
                        >
                            Send Request
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
}
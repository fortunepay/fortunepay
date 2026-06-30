"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import TitleHeading from "@/components/text/TitleHeading";
import { ChevronLeft, ChevronRight } from "@/components/icons/IconPacks";
import { FpVideoItem } from "@/types/public/userTypes";

function extractYouTubeId(url: string): string | null {
    const match = url.match(
        /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/,
    );
    return match ? match[1] : null;
}

function VideoCard({
    video,
    isActive,
    onClick,
}: {
    video: FpVideoItem;
    isActive: boolean;
    onClick: () => void;
}) {
    const ytId = extractYouTubeId(video.youtubeUrl);
    const thumbUrl = ytId
        ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`
        : null;

    return (
        <button
            onClick={onClick}
            className={`group relative w-full aspect-video rounded-2xl overflow-hidden transition-all duration-500 focus:outline-none ${isActive
                ? "ring-2 ring-[#FFB502] ring-offset-2 ring-offset-white shadow-2xl scale-100"
                : "opacity-60 scale-95 hover:opacity-80 hover:scale-[0.97]"
                }`}
            aria-label={`Play ${video.title}`}
        >
            {thumbUrl ? (
                <img
                    src={thumbUrl}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${ytId}/mqdefault.jpg`;
                    }}
                />
            ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">No preview</span>
                </div>
            )}
            <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/10 to-transparent" />
        </button>
    );
}

function YouTubeEmbed({ videoId }: { videoId: string }) {
    return (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
            <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
            />
        </div>
    );
}

export default function FpVideoCarousel() {
    const [videos, setVideos] = useState<FpVideoItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [playingId, setPlayingId] = useState<string | null>(null);
    const autoplayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        async function fetchVideos() {
            try {
                const res = await fetch("/api/marketing/fpvideos");
                const json = await res.json();
                if (!res.ok || !json.success) {
                    setError(json.message ?? "Failed to load videos.");
                    return;
                }
                const active = (json.data as FpVideoItem[]).filter(
                    (v) => v.status === "enabled",
                );
                setVideos(active);
            } catch {
                setError("Network error. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }
        fetchVideos();
    }, []);

    const goTo = useCallback(
        (index: number) => {
            setPlayingId(null);
            setActiveIndex((index + videos.length) % videos.length);
        },
        [videos.length],
    );

    const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
    const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

    useEffect(() => {
        if (videos.length <= 1 || playingId) return;
        autoplayRef.current = setTimeout(() => {
            next();
        }, 5000);
        return () => {
            if (autoplayRef.current) clearTimeout(autoplayRef.current);
        };
    }, [activeIndex, videos.length, playingId, next]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
            if (e.key === "Escape") setPlayingId(null);
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [prev, next]);

    if (isLoading) {
        return (
            <div className="w-full max-w-4xl mx-auto px-4 py-12">
                <div className="w-full aspect-video rounded-2xl bg-gray-100 animate-pulse" />
                <div className="flex gap-3 mt-4">
                    {[0, 1, 2].map((i) => (
                        <div key={i} className="flex-1 aspect-video rounded-xl bg-gray-100 animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full max-w-4xl mx-auto px-4 py-12 text-center text-gray-500 text-sm">
                {error}
            </div>
        );
    }

    if (videos.length === 0) {
        return (
            <div className="w-full max-w-4xl mx-auto px-4 py-12 text-center text-gray-400 text-sm">
                No videos available yet.
            </div>
        );
    }

    const activeVideo = videos[activeIndex];
    const activeYtId = extractYouTubeId(activeVideo.youtubeUrl);

    const stripCount = Math.min(videos.length, 4);
    const halfWindow = Math.floor(stripCount / 2);
    const stripIndices = Array.from({ length: stripCount }, (_, i) => {
        const offset = i - halfWindow;
        return (activeIndex + offset + videos.length) % videos.length;
    });

    return (
        <section className="relative min-h-screen overflow-hidden text-white bg-linear-to-t from-[#45B5FE] to-white">
            <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-20 select-none">
                <TitleHeading text="Experience Fortune Pay?" color="text-blue-600" align="center" marginBottom="mb-16" />
                <div className="w-full max-w-4xl mx-auto px-4 select-none">
                    <div className="relative mb-4">
                        {playingId && activeYtId ? (
                            <div className="relative">
                                <YouTubeEmbed videoId={activeYtId} />
                            </div>
                        ) : (
                            <div className="relative group">
                                <VideoCard
                                    video={activeVideo}
                                    isActive
                                    onClick={() => {
                                        if (activeYtId) setPlayingId(activeYtId);
                                    }}
                                />

                                {videos.length > 1 && (
                                    <>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); prev(); }}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 text-gray-800 shadow-md flex items-center justify-center hover:bg-white hover:scale-105 active:scale-95 transition-all opacity-0 group-hover:opacity-100"
                                            aria-label="Previous video"
                                        >
                                            <ChevronLeft />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); next(); }}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 text-gray-800 shadow-md flex items-center justify-center hover:bg-white hover:scale-105 active:scale-95 transition-all opacity-0 group-hover:opacity-100"
                                            aria-label="Next video"
                                        >
                                            <ChevronRight />
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {videos.length > 1 && (
                        <div className="flex items-center gap-2">
                            {/* <button
                        onClick={prev}
                        className="shrink-0 w-8 h-8 rounded-full border border-gray-200 text-gray-500 flex items-center justify-center hover:border-[#FFB502] hover:text-[#FFB502] hover:bg-amber-50 transition-all"
                        aria-label="Previous"
                    >
                        <ChevronLeft />
                    </button> */}
                            <div className="flex-1 grid gap-2" style={{ gridTemplateColumns: `repeat(${stripCount}, 1fr)` }}>
                                {stripIndices.map((vidIdx) => (
                                    <VideoCard
                                        key={videos[vidIdx]._id}
                                        video={videos[vidIdx]}
                                        isActive={vidIdx === activeIndex}
                                        onClick={() => {
                                            if (vidIdx === activeIndex) {
                                                const ytId = extractYouTubeId(videos[vidIdx].youtubeUrl);
                                                if (ytId) setPlayingId(ytId);
                                            } else {
                                                goTo(vidIdx);
                                            }
                                        }}
                                    />
                                ))}
                            </div>
                            {/* <button
                        onClick={next}
                        className="shrink-0 w-8 h-8 rounded-full border border-gray-200 text-gray-500 flex items-center justify-center hover:border-[#FFB502] hover:text-[#FFB502] hover:bg-amber-50 transition-all"
                        aria-label="Next"
                    >
                        <ChevronRight />
                    </button> */}
                        </div>
                    )}

                    {videos.length > 1 && (
                        <div className="flex justify-center gap-1.5 mt-4">
                            {videos.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i)}
                                    className={`rounded-full transition-all duration-300 ${i === activeIndex
                                        ? "w-5 h-1.5 bg-[#FFB502]"
                                        : "w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400"
                                        }`}
                                    aria-label={`Go to video ${i + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
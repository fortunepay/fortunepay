"use client";

import { useState, useEffect, useCallback } from "react";
import FpVideoModal, { FpVideoItem } from "@/components/modals/FpVideoModal";
import ConfirmModal from "@/components/modals/ConfirmModal";
import DataTable, { ColumnDef } from "@/components/table/DashboardTable";
import { SquarePen, Trash } from "@/components/icons/IconPacks";
import {
    StatusBadge,
    StatusFilterTabs,
    TOGGLE_STATUS_FILTERS,
    ToggleStatusFilter,
} from "@/app/utils/statusUtils";

const BRAND = "#FFB502";

function extractYouTubeId(url: string): string | null {
    const match = url.match(
        /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/,
    );
    return match ? match[1] : null;
}

function formatDate(iso: string) {
    return new Date(iso).toLocaleString("en-PH", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export default function FpVideoManagement() {
    const [videos, setVideos] = useState<FpVideoItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState<ToggleStatusFilter>("All");

    const [videoModal, setVideoModal] = useState<FpVideoItem | undefined | null>(null);
    const [deletingVideo, setDeletingVideo] = useState<FpVideoItem | null>(null);

    const fetchVideos = useCallback(async () => {
        setIsLoading(true);
        setFetchError(null);
        try {
            const res = await fetch("/api/marketing/fpvideos");
            const json = await res.json();
            if (!res.ok || !json.success) {
                setFetchError(json.message ?? "Failed to load videos.");
                return;
            }
            setVideos(json.data);
        } catch {
            setFetchError("Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchVideos();
    }, [fetchVideos]);

    const filtered = videos.filter((v) =>
        statusFilter === "All" ? true : v.status === statusFilter,
    );

    const columns: ColumnDef<FpVideoItem>[] = [
        {
            key: "video",
            label: "Video",
            width: "2fr",
            render: (video) => {
                const thumbId = extractYouTubeId(video.youtubeUrl);
                return (
                    <div className="flex items-center gap-4 min-w-0">
                        <div className="relative w-24 h-14 rounded-xl overflow-hidden shrink-0 shadow-sm bg-gray-100">
                            {thumbId ? (
                                <img
                                    src={`https://img.youtube.com/vi/${thumbId}/mqdefault.jpg`}
                                    alt={video.title}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                                    No preview
                                </div>
                            )}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-6 h-6 rounded-full bg-black/50 flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="min-w-0">
                            <p className="font-semibold text-xs leading-tight truncate text-gray-800">
                                {video.title}
                            </p>
                        </div>
                    </div>
                );
            },
        },
        {
            key: "status",
            label: "Status",
            width: "1fr",
            headerClassName: "hidden lg:block",
            render: (video) => (
                <span className="hidden lg:inline-flex">
                    <StatusBadge status={video.status} />
                </span>
            ),
        },
        {
            key: "createdAt",
            label: "Date Added",
            width: "1fr",
            headerClassName: "hidden lg:block",
            render: (video) => (
                <span className="hidden lg:block text-gray-600 text-xs truncate">
                    {formatDate(video.createdAt)}
                </span>
            ),
        },
        {
            key: "actions",
            label: "Action",
            width: "1fr",
            headerClassName: "hidden lg:block text-center",
            render: (video) => (
                <div className="flex items-center justify-end lg:justify-center gap-1">
                    <button
                        onClick={() => setVideoModal(video)}
                        title="Edit video"
                        className="p-1 rounded-md text-gray-400 hover:text-[#FFB502] hover:bg-amber-50 transition-all"
                    >
                        <SquarePen className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setDeletingVideo(video)}
                        title="Delete video"
                        className="p-1 rounded-md text-red-500 hover:bg-red-50 transition-all"
                    >
                        <Trash className="w-4 h-4" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <section className="sm:p-1">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <StatusFilterTabs
                    filters={TOGGLE_STATUS_FILTERS}
                    value={statusFilter}
                    onChange={setStatusFilter}
                    brand={BRAND}
                />

                <button
                    onClick={() => setVideoModal(undefined)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-xs text-white shadow-sm hover:brightness-105 active:scale-95 transition-all"
                    style={{ backgroundColor: BRAND }}
                >
                    Add Video
                </button>
            </div>

            <DataTable
                data={filtered}
                columns={columns}
                rowKey={(v) => v._id}
                perPage={6}
                isLoading={isLoading}
                error={fetchError}
                onRetry={fetchVideos}
                emptyLabel="No videos found"
                emptySubLabel="Click 'Add Video' to get started"
            />

            {videoModal !== null && (
                <FpVideoModal
                    video={videoModal}
                    onClose={() => setVideoModal(null)}
                    onSuccess={fetchVideos}
                />
            )}

            {deletingVideo && (
                <ConfirmModal
                    title="Delete Video"
                    description={`Are you sure you want to delete "${deletingVideo.title}"? This action cannot be undone.`}
                    endpoint={`/api/marketing/fpvideos/${deletingVideo._id}`}
                    method="DELETE"
                    confirmLabel="Delete"
                    confirmColor="red"
                    successMessage="Video deleted."
                    onSuccess={fetchVideos}
                    onClose={() => setDeletingVideo(null)}
                />
            )}
        </section>
    );
}
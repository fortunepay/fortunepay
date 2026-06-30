"use client";

import { useState, useEffect, useCallback } from "react";
import BannerModal, { BannerItem } from "@/components/modals/BannerModal";
import ConfirmModal from "@/components/modals/ConfirmModal";
import DataTable, { ColumnDef } from "@/components/table/DashboardTable";
import { DateRangeFilter, DateRange, matchesDateRange } from "@/components/filters/DateRangeFilter";
import { SquarePen, Trash } from "@/components/icons/IconPacks";
import {
    getStatus,
    StatusBadge,
    StatusFilterTabs,
    DateStatusFilter,
    DATE_STATUS_FILTERS,
} from "@/app/utils/statusUtils";
import { BRAND } from "@/constant/dashboard/DashboardConts";

function formatDate(iso: string) {
    return new Date(iso).toLocaleString("en-PH", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
}

export default function BannersManagementPage() {
    const [banners, setBanners] = useState<BannerItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState<DateRange>({ from: "", to: "" });

    const [statusFilter, setStatusFilter] = useState<DateStatusFilter>("All");

    const [bannerModal, setBannerModal] = useState<BannerItem | undefined | null>(null);
    const [deletingBanner, setDeletingBanner] = useState<BannerItem | null>(null);

    const fetchBanners = useCallback(async () => {
        setIsLoading(true);
        setFetchError(null);
        try {
            const res = await fetch("/api/marketing/banners");
            const json = await res.json();
            if (!res.ok || !json.success) {
                setFetchError(json.message ?? "Failed to load banners.");
                return;
            }
            setBanners(json.data);
        } catch {
            setFetchError("Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBanners();
    }, [fetchBanners]);

    const filtered = banners.filter((b) => {
        const matchStatus = statusFilter === "All" || getStatus(b.endDate) === statusFilter;
        const matchDate = matchesDateRange(b.startDate, dateRange);
        return matchStatus && matchDate;
    });

    const columns: ColumnDef<BannerItem>[] = [
        {
            key: "image",
            label: "Banner",
            width: "2fr",
            render: (banner) => (
                <div className="flex items-center gap-4 min-w-0">
                    <div className="relative w-24 h-14 rounded-xl overflow-hidden shrink-0 shadow-sm">
                        <img
                            src={banner.image}
                            alt="Banner"
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 min-w-0">
                        {banner.description}
                    </p>
                </div>
            ),
        },
        {
            key: "startDate",
            label: "Start Date",
            width: "1fr",
            headerClassName: "hidden lg:block",
            render: (banner) => (
                <span className="hidden lg:block text-gray-600 text-xs truncate">
                    {formatDate(banner.startDate)}
                </span>
            ),
        },
        {
            key: "endDate",
            label: "End Date",
            width: "1fr",
            headerClassName: "hidden lg:block",
            render: (banner) => (
                <span className="hidden lg:block text-gray-600 text-xs truncate">
                    {formatDate(banner.endDate)}
                </span>
            ),
        },
        {
            key: "status",
            label: "Status",
            width: "0.8fr",
            headerClassName: "hidden lg:block",
            render: (banner) => (
                <div className="hidden lg:block">
                    <StatusBadge endDate={banner.endDate} />
                </div>
            ),
        },
        {
            key: "actions",
            label: "Action",
            width: "0.8fr",
            headerClassName: "hidden lg:block text-center",
            render: (banner) => (
                <div className="flex items-center justify-end lg:justify-center gap-1">
                    <button
                        onClick={() => setBannerModal(banner)}
                        title="Edit banner"
                        className="p-1 rounded-md text-gray-400 hover:text-[#FFB502] hover:bg-amber-50 transition-all"
                    >
                        <SquarePen className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setDeletingBanner(banner)}
                        title="Delete banner"
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
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 w-full">
                <div className="flex flex-wrap items-center gap-3">
                    <StatusFilterTabs
                        filters={DATE_STATUS_FILTERS}
                        value={statusFilter}
                        onChange={setStatusFilter}
                        brand={BRAND}
                    />
                    <DateRangeFilter value={dateRange} onChange={setDateRange} />
                </div>
                <button
                    onClick={() => setBannerModal(undefined)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-xs text-white shadow-sm hover:brightness-105 active:scale-95 transition-all whitespace-nowrap"
                    style={{ backgroundColor: BRAND }}
                >
                    Add Banner
                </button>
            </div>

            <DataTable
                data={filtered}
                columns={columns}
                rowKey={(b) => b._id}
                perPage={6}
                isLoading={isLoading}
                error={fetchError}
                onRetry={fetchBanners}
                emptyLabel="No banners found"
                emptySubLabel="Try adjusting the filters above"
            />

            {bannerModal !== null && (
                <BannerModal
                    banner={bannerModal}
                    onClose={() => setBannerModal(null)}
                    onSuccess={fetchBanners}
                />
            )}

            {deletingBanner && (
                <ConfirmModal
                    title="Delete Banner"
                    description={`Are you sure you want to delete this banner? This action cannot be undone.`}
                    endpoint={`/api/marketing/banners/${deletingBanner._id}`}
                    method="DELETE"
                    confirmLabel="Delete"
                    confirmColor="red"
                    successMessage="Banner deleted."
                    onSuccess={fetchBanners}
                    onClose={() => setDeletingBanner(null)}
                />
            )}
        </section>
    );
}
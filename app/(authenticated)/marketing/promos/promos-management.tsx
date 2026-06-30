"use client";

import { useState, useEffect, useCallback } from "react";
import PromoModal from "@/components/modals/PromoModal";
import ConfirmModal from "@/components/modals/ConfirmModal";
import DataTable, { ColumnDef } from "@/components/table/DashboardTable";
import { DateRangeFilter, DateRange, matchesDateRange } from "@/components/filters/DateRangeFilter";
import { PromoItem } from "@/types/dashboardTypes";
import { SquarePen, Trash } from "@/components/icons/IconPacks";
import { getStatus, StatusBadge, StatusFilterTabs, StatusFilter, DATE_STATUS_FILTERS } from "@/app/utils/statusUtils";
import { BRAND } from "@/constant/dashboard/DashboardConts";

function formatDate(iso: string) {
    return new Date(iso).toLocaleString("en-PH", {
        month: "short", day: "numeric", year: "numeric",
        hour: "numeric", minute: "2-digit", hour12: true,
    });
}

export default function PromoManagement() {
    const [promos, setPromos] = useState<PromoItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState<DateRange>({ from: "", to: "" });
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

    const [promoModal, setPromoModal] = useState<PromoItem | undefined | null>(null);
    const [deletingPromo, setDeletingPromo] = useState<PromoItem | null>(null);

    const fetchPromos = useCallback(async () => {
        setIsLoading(true);
        setFetchError(null);
        try {
            const res = await fetch("/api/marketing/promo");
            const json = await res.json();
            if (!res.ok || !json.success) {
                setFetchError(json.message ?? "Failed to load promos.");
                return;
            }
            setPromos(json.data);
        } catch {
            setFetchError("Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { fetchPromos(); }, [fetchPromos]);

    const filtered = promos.filter((promo) => {
        const matchDate = matchesDateRange(promo.startDate, dateRange);
        const matchStatus = statusFilter === "All" || getStatus(promo.endDate) === statusFilter;
        return matchDate && matchStatus;
    });

    const columns: ColumnDef<PromoItem>[] = [
        {
            key: "title",
            label: "Promo Title",
            width: "2fr",
            render: (promo) => (
                <div className="flex items-center gap-4 min-w-0">
                    <div className="relative w-20 h-14 rounded-xl overflow-hidden shrink-0 shadow-sm">
                        <img
                            src={promo.bannerImage}
                            alt={promo.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                    </div>
                    <div className="min-w-0">
                        <h3 className="font-semibold text-xs leading-tight truncate">{promo.title}</h3>
                    </div>
                </div>
            ),
        },
        {
            key: "startDate",
            label: "Start Date",
            width: "1fr",
            headerClassName: "hidden lg:block",
            render: (promo) => (
                <span className="hidden lg:block text-gray-600 text-xs truncate">
                    {formatDate(promo.startDate)}
                </span>
            ),
        },
        {
            key: "endDate",
            label: "End Date",
            width: "1fr",
            headerClassName: "hidden lg:block",
            render: (promo) => (
                <span className="hidden lg:block text-gray-600 text-xs truncate">
                    {formatDate(promo.endDate)}
                </span>
            ),
        },
        {
            key: "status",
            label: "Status",
            width: "0.8fr",
            headerClassName: "hidden lg:block",
            render: (promo) => (
                <div className="hidden lg:block">
                    <StatusBadge endDate={promo.endDate} />
                </div>
            ),
        },
        {
            key: "actions",
            label: "Action",
            width: "0.8fr",
            headerClassName: "hidden lg:block text-center",
            render: (promo) => (
                <div className="flex items-center justify-end lg:justify-center gap-1">
                    <button
                        onClick={() => setPromoModal(promo)}
                        title="Edit promo"
                        className="p-1 rounded-md text-gray-400 hover:text-[#FFB502] hover:bg-amber-50 transition-all"
                    >
                        <SquarePen className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setDeletingPromo(promo)}
                        title="Delete promo"
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
                    onClick={() => setPromoModal(undefined)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-xs text-white shadow-sm hover:brightness-105 active:scale-95 transition-all"
                    style={{ backgroundColor: BRAND }}
                >
                    Add Promo
                </button>
            </div>

            <DataTable
                data={filtered}
                columns={columns}
                rowKey={(promo) => promo._id}
                perPage={6}
                isLoading={isLoading}
                error={fetchError}
                onRetry={fetchPromos}
                emptyLabel="No promos found"
                emptySubLabel="Try adjusting the filters above"
            />

            {promoModal !== null && (
                <PromoModal
                    promo={promoModal}
                    onClose={() => setPromoModal(null)}
                    onSuccess={fetchPromos}
                />
            )}

            {deletingPromo && (
                <ConfirmModal
                    title="Delete Promo"
                    description={`Are you sure you want to delete "${deletingPromo.title}"? This action cannot be undone.`}
                    endpoint={`/api/marketing/promo/${deletingPromo._id}`}
                    method="DELETE"
                    confirmLabel="Delete"
                    confirmColor="red"
                    successMessage="Promo deleted."
                    onSuccess={fetchPromos}
                    onClose={() => setDeletingPromo(null)}
                />
            )}
        </section>
    );
}
"use client";

import { useState, useEffect, useCallback } from "react";
import EventModal from "@/components/modals/EventModal";
import ConfirmModal from "@/components/modals/ConfirmModal";
import DataTable, { ColumnDef } from "@/components/table/DashboardTable";
import { DateRangeFilter, DateRange, matchesDateRange } from "@/components/buttons/Daterangefilter";
import { EventCategory, EventItem } from "@/types/dashboardTypes";
import { SquarePen, Trash } from "@/components/icons/IconPacks";
import { getStatus, StatusBadge, StatusFilterTabs, StatusFilter, DATE_STATUS_FILTERS } from "@/app/utils/statusUtils";
import { BRAND } from "@/constant/UserInterfaceConts";

const CATEGORY_COLORS: Record<EventCategory, { bg: string; text: string; dot: string }> = {
    News: { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
    Promo: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
    Event: { bg: "bg-purple-100", text: "text-purple-700", dot: "bg-purple-500" },
};

const CATEGORIES = ["All Category", "News", "Promo", "Event"] as const;
type CategoryFilter = (typeof CATEGORIES)[number];

function CategoryBadge({ type }: { type: EventCategory }) {
    const c = CATEGORY_COLORS[type] ?? CATEGORY_COLORS.Event;
    return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${c.bg} ${c.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
            {type}
        </span>
    );
}

function formatDate(iso: string) {
    return new Date(iso).toLocaleString("en-PH", {
        month: "short", day: "numeric", year: "numeric",
        hour: "numeric", minute: "2-digit", hour12: true,
    });
}

export default function EventManagement() {
    const [events, setEvents] = useState<EventItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [category, setCategory] = useState<CategoryFilter>("All Category");
    const [dateRange, setDateRange] = useState<DateRange>({ from: "", to: "" });
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

    const [eventModal, setEventModal] = useState<EventItem | undefined | null>(null);
    const [deletingEvent, setDeletingEvent] = useState<EventItem | null>(null);

    const fetchEvents = useCallback(async () => {
        setIsLoading(true);
        setFetchError(null);
        try {
            const res = await fetch("/api/marketing/events");
            const json = await res.json();
            if (!res.ok || !json.success) {
                setFetchError(json.message ?? "Failed to load events.");
                return;
            }
            setEvents(json.data);
        } catch {
            setFetchError("Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { fetchEvents(); }, [fetchEvents]);

    const filtered = events.filter((e) => {
        const matchCat = category === "All Category" || e.category === category;
        const matchDate = matchesDateRange(e.startDate, dateRange);
        const matchStatus = statusFilter === "All" || getStatus(e.endDate) === statusFilter;
        return matchCat && matchDate && matchStatus;
    });

    const columns: ColumnDef<EventItem>[] = [
        {
            key: "title",
            label: "Event Title",
            width: "2fr",
            render: (event) => (
                <div className="flex items-center gap-4 min-w-0">
                    <div className="relative w-20 h-14 rounded-xl overflow-hidden shrink-0 shadow-sm">
                        <img
                            src={event.bannerImage}
                            alt={event.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                    </div>
                    <div className="min-w-0">
                        <div className="mb-1"><CategoryBadge type={event.category} /></div>
                        <h3 className="font-semibold text-xs leading-tight truncate">{event.title}</h3>
                    </div>
                </div>
            ),
        },
        {
            key: "startDate",
            label: "Start Date",
            width: "1fr",
            headerClassName: "hidden lg:block",
            render: (event) => (
                <span className="hidden lg:block text-gray-600 text-xs truncate">
                    {formatDate(event.startDate)}
                </span>
            ),
        },
        {
            key: "endDate",
            label: "End Date",
            width: "1fr",
            headerClassName: "hidden lg:block",
            render: (event) => (
                <span className="hidden lg:block text-gray-600 text-xs truncate">
                    {formatDate(event.endDate)}
                </span>
            ),
        },
        {
            key: "status",
            label: "Status",
            width: "0.8fr",
            headerClassName: "hidden lg:block",
            render: (event) => (
                <div className="hidden lg:block">
                    <StatusBadge endDate={event.endDate} />
                </div>
            ),
        },
        {
            key: "actions",
            label: "Action",
            width: "0.8fr",
            headerClassName: "hidden lg:block text-center",
            render: (event) => (
                <div className="flex items-center justify-end lg:justify-center gap-1">
                    <button
                        onClick={() => setEventModal(event)}
                        title="Edit event"
                        className="p-1 rounded-md text-gray-400 hover:text-[#FFB502] hover:bg-amber-50 transition-all"
                    >
                        <SquarePen className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setDeletingEvent(event)}
                        title="Delete event"
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
                    <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${category === cat ? "text-white shadow-sm" : "text-gray-500 hover:text-gray-800"
                                    }`}
                                style={category === cat ? { backgroundColor: BRAND } : {}}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <StatusFilterTabs
                        filters={DATE_STATUS_FILTERS}
                        value={statusFilter}
                        onChange={setStatusFilter}
                        brand={BRAND}
                    />
                    <DateRangeFilter value={dateRange} onChange={setDateRange} />
                </div>

                <button
                    onClick={() => setEventModal(undefined)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-xs text-white shadow-sm hover:brightness-105 active:scale-95 transition-all"
                    style={{ backgroundColor: BRAND }}
                >
                    Add Event
                </button>
            </div>

            <DataTable
                data={filtered}
                columns={columns}
                rowKey={(e) => e._id}
                perPage={6}
                isLoading={isLoading}
                error={fetchError}
                onRetry={fetchEvents}
                emptyLabel="No events found"
                emptySubLabel="Try adjusting the filters above"
            />

            {eventModal !== null && (
                <EventModal
                    event={eventModal}
                    onClose={() => setEventModal(null)}
                    onSuccess={fetchEvents}
                />
            )}

            {deletingEvent && (
                <ConfirmModal
                    title="Delete Event"
                    description={`Are you sure you want to delete "${deletingEvent.title}"? This action cannot be undone.`}
                    endpoint={`/api/marketing/events/${deletingEvent._id}`}
                    method="DELETE"
                    confirmLabel="Delete"
                    confirmColor="red"
                    successMessage="Event deleted."
                    onSuccess={fetchEvents}
                    onClose={() => setDeletingEvent(null)}
                />
            )}
        </section>
    );
}
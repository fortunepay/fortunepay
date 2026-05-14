"use client";

import { useState, useEffect, useCallback } from "react";
import { DataTable, ColumnDef } from "@/components/table/DashboardTable";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { SquarePen, Trash } from "@/components/icons/IconPacks";
import ArticleFormModal, { ArticleItem, ModalState } from "@/components/modals/ArticleModal";
import {
    StatusBadge,
    StatusFilterTabs,
    TOGGLE_STATUS_FILTERS,
    ToggleStatusFilter,
} from "@/app/utils/statusUtils";
import { DateRangeFilter, DateRange } from "@/components/buttons/Daterangefilter";
import { BRAND } from "@/constant/UserInterfaceConts";

export default function ArticlesManagement() {
    const [articles, setArticles] = useState<ArticleItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [modal, setModal] = useState<ModalState>(null);

    const [statusFilter, setStatusFilter] = useState<ToggleStatusFilter>("All");
    const [dateRange, setDateRange] = useState<DateRange>({ from: "", to: "" });

    const fetchArticles = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/marketing/articles");
            const json = await res.json();
            if (!res.ok || !json.success) throw new Error(json.message ?? "Failed to load.");
            setArticles(json.data);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Failed to load articles.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { fetchArticles(); }, [fetchArticles]);

    const filtered = articles.filter((a) =>
        statusFilter === "All" ? true : a.status === statusFilter,
    );

    const columns: ColumnDef<ArticleItem>[] = [
        {
            key: "title",
            label: "Title",
            width: "1fr",
            render: (row) => (
                <span className="font-medium text-sm text-gray-800 line-clamp-1 truncate w-64">
                    {row.title}
                </span>
            ),
        },
        {
            key: "publishDate",
            label: "Publish Date",
            width: "140px",
            render: (row) => (
                <span className="text-sm text-gray-500">
                    {new Date(row.publishDate).toLocaleDateString()}
                </span>
            ),
        },
        {
            key: "status",
            label: "Status",
            width: "110px",
            render: (row) => <StatusBadge status={row.status} />,
        },
        {
            key: "actions",
            label: "Actions",
            width: "120px",
            headerClassName: "text-right",
            cellClassName: "text-right",
            render: (row) => (
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => setModal({ type: "edit", article: row })}
                        className="p-1 rounded-md text-gray-400 hover:text-[#FFB502] hover:bg-amber-50 transition-all"
                    >
                        <SquarePen className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setModal({ type: "delete", article: row })}
                        className="p-1 rounded-md text-red-500 hover:bg-red-50 transition-all"
                    >
                        <Trash className="w-4 h-4" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="p-6 space-y-5">
            <div className="flex flex-wrap items-center gap-5">
                <StatusFilterTabs
                    filters={TOGGLE_STATUS_FILTERS}
                    value={statusFilter}
                    onChange={setStatusFilter}
                    brand={BRAND}
                />
                <DateRangeFilter value={dateRange} onChange={setDateRange} />
                <button
                    onClick={() => setModal({ type: "add" })}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-xs text-white shadow-sm hover:brightness-105 active:scale-95 transition-all"
                    style={{ backgroundColor: BRAND }}
                >
                    Add Article
                </button>
            </div>

            <DataTable
                data={filtered}
                columns={columns}
                rowKey={(row) => row._id}
                isLoading={isLoading}
                error={error}
                onRetry={fetchArticles}
                emptyLabel="No articles yet"
                emptySubLabel="Click 'Add Article' to create one"
            />

            {modal?.type === "add" && (
                <ArticleFormModal
                    onClose={() => setModal(null)}
                    onSuccess={fetchArticles}
                />
            )}

            {modal?.type === "edit" && (
                <ArticleFormModal
                    article={modal.article}
                    onClose={() => setModal(null)}
                    onSuccess={fetchArticles}
                />
            )}

            {modal?.type === "delete" && (
                <ConfirmModal
                    title="Delete Article"
                    description={`Are you sure you want to delete "${modal.article.title}"? This cannot be undone.`}
                    endpoint={`/api/marketing/articles/${modal.article._id}`}
                    method="DELETE"
                    confirmLabel="Delete"
                    confirmColor="red"
                    successMessage="Article deleted."
                    onSuccess={fetchArticles}
                    onClose={() => setModal(null)}
                />
            )}
        </div>
    );
}
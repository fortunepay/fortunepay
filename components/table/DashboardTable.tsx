"use client";

import { useState, useMemo } from "react";
import { SearchX, SquareArrowLeft, SquareArrowRight } from "@/components/icons/IconPacks";

const BRAND = "#FFB502";

export interface ColumnDef<T> {
    key: string;
    label: string;
    width: string;
    headerClassName?: string;
    cellClassName?: string;
    render: (row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
    data: T[];
    columns: ColumnDef<T>[];
    rowKey: (row: T) => string;
    perPage?: number;
    isLoading?: boolean;
    error?: string | null;
    onRetry?: () => void;
    emptyLabel?: string;
    emptySubLabel?: string;
    className?: string;
}

interface PaginationProps {
    page: number;
    totalPages: number;
    totalItems: number;
    perPage: number;
    onChange: (page: number) => void;
}

function Pagination({ page, totalPages, totalItems, perPage, onChange }: PaginationProps) {
    const showing = Math.min(perPage, totalItems - (page - 1) * perPage);

    return (
        <div className="flex items-center justify-between mt-5 px-1">
            <span className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-800">{showing}</span> · out of{" "}
                <span className="font-semibold text-gray-800">{totalItems}</span>
            </span>

            <div className="flex items-center gap-1.5">
                <button
                    onClick={() => onChange(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 disabled:opacity-30"
                >
                    <SquareArrowLeft />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                        key={p}
                        onClick={() => onChange(p)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold border"
                        style={
                            page === p
                                ? { backgroundColor: BRAND, color: "#fff", borderColor: BRAND }
                                : { backgroundColor: "#fff", color: "#6b7280", borderColor: "#e5e7eb" }
                        }
                    >
                        {p}
                    </button>
                ))}

                <button
                    onClick={() => onChange(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 disabled:opacity-30"
                >
                    <SquareArrowRight />
                </button>
            </div>
        </div>
    );
}

export function DataTable<T>({
    data,
    columns,
    rowKey,
    perPage = 6,
    isLoading = false,
    error = null,
    onRetry,
    emptyLabel = "No records found",
    emptySubLabel = "Try adjusting filters",
    className = "",
}: DataTableProps<T>) {
    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(data.length / perPage));
    const safePage = Math.min(page, totalPages);

    const paginated = useMemo(
        () => data.slice((safePage - 1) * perPage, safePage * perPage),
        [data, safePage, perPage]
    );

    // ✅ THIS FIXES ALIGNMENT
    const gridTemplate = columns.map((c) => c.width).join(" ");

    return (
        <div className={className}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                {/* HEADER */}
                <div
                    className="grid items-center gap-5 px-6 py-3 border-b border-gray-200 bg-gray-50/80"
                    style={{ gridTemplateColumns: gridTemplate }}
                >
                    {columns.map((col) => (
                        <div
                            key={col.key}
                            className={`text-xs font-bold text-gray-400 uppercase tracking-wider ${col.headerClassName ?? ""}`}
                        >
                            {col.label}
                        </div>
                    ))}
                </div>

                {/* STATES */}
                {isLoading ? (
                    <div className="py-20 text-center text-gray-400">Loading…</div>

                ) : error ? (
                    <div className="py-20 text-center text-red-400">
                        <p>{error}</p>
                        {onRetry && <button onClick={onRetry}>Retry</button>}
                    </div>

                ) : paginated.length === 0 ? (
                    <div className="py-20 flex flex-col items-center text-gray-400">
                        <SearchX className="w-10 h-10 mb-3 opacity-30" />
                        <p>{emptyLabel}</p>
                        <p className="text-sm">{emptySubLabel}</p>
                    </div>

                ) : (
                    paginated.map((row) => (
                        <div
                            key={rowKey(row)}
                            className="grid items-center gap-5 px-6 py-4 border-b border-gray-100 hover:bg-amber-50/40"
                            style={{ gridTemplateColumns: gridTemplate }}
                        >
                            {columns.map((col) => (
                                <div key={col.key} className={col.cellClassName}>
                                    {col.render(row)}
                                </div>
                            ))}
                        </div>
                    ))
                )}
            </div>

            {!isLoading && !error && data.length > 0 && (
                <Pagination
                    page={safePage}
                    totalPages={totalPages}
                    totalItems={data.length}
                    perPage={perPage}
                    onChange={setPage}
                />
            )}
        </div>
    );
}

export default DataTable;
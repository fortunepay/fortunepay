import React from "react";

export type DateStatus = "Active" | "Ended";
export type ToggleStatus = "enabled" | "disabled";
export type ItemStatus = DateStatus | ToggleStatus;
export type DateStatusFilter = "All" | DateStatus;
export type ToggleStatusFilter = "All" | ToggleStatus;
export type StatusFilter = "All" | ItemStatus;

export const DATE_STATUS_FILTERS: DateStatusFilter[] = ["All", "Active", "Ended"];
export const TOGGLE_STATUS_FILTERS: ToggleStatusFilter[] = ["All", "enabled", "disabled"];

export function getDateStatus(endDate: string): DateStatus {
    return new Date(endDate) > new Date() ? "Active" : "Ended";
}

export const getStatus = getDateStatus;

type BadgeConfig = { label: string; containerClass: string; dotClass: string };

const BADGE_CONFIG: Record<ItemStatus, BadgeConfig> = {
    Active: { label: "Active", containerClass: "bg-green-100 text-green-700", dotClass: "bg-green-500" },
    Ended: { label: "Ended", containerClass: "bg-gray-100 text-gray-500", dotClass: "bg-gray-400" },
    enabled: { label: "Enabled", containerClass: "bg-green-100 text-green-700", dotClass: "bg-green-500" },
    disabled: { label: "Disabled", containerClass: "bg-gray-100 text-gray-500", dotClass: "bg-gray-400" },
};

interface StatusBadgeProps {
    endDate?: string;
    status?: ItemStatus;
}

export function StatusBadge({ endDate, status }: StatusBadgeProps) {
    const resolved: ItemStatus =
        status ?? (endDate ? getDateStatus(endDate) : "disabled");
    const cfg = BADGE_CONFIG[resolved];
    return (
        <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.containerClass}`}
        >
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dotClass}`} />
            {cfg.label}
        </span>
    );
}

interface StatusFilterTabsProps<T extends string> {
    filters: T[];
    value: T;
    onChange: (status: T) => void;
    brand?: string;
    labelFormatter?: (filter: T) => string;
}

export function StatusFilterTabs<T extends string>({
    filters,
    value,
    onChange,
    brand = "#FFB502",
    labelFormatter,
}: StatusFilterTabsProps<T>) {
    const getLabel = (f: T) =>
        labelFormatter
            ? labelFormatter(f)
            : f === "All"
                ? "All Status"
                : f.charAt(0).toUpperCase() + f.slice(1);

    return (
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
            {filters.map((f) => (
                <button
                    key={f}
                    onClick={() => onChange(f)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize ${value === f ? "text-white shadow-sm" : "text-gray-500 hover:text-gray-800"
                        }`}
                    style={value === f ? { backgroundColor: brand } : {}}
                >
                    {getLabel(f)}
                </button>
            ))}
        </div>
    );
}
export interface DateRange {
    from: string;
    to: string;
}

interface DateRangeFilterProps {
    value: DateRange;
    onChange: (range: DateRange) => void;
}

export function matchesDateRange(isoDate: string, range: DateRange): boolean {
    if (!range.from && !range.to) return true;

    const date = new Date(isoDate);
    date.setHours(0, 0, 0, 0);

    if (range.from) {
        const from = new Date(range.from);
        from.setHours(0, 0, 0, 0);
        if (date < from) return false;
    }

    if (range.to) {
        const to = new Date(range.to);
        to.setHours(23, 59, 59, 999);
        if (date > to) return false;
    }
    return true;
}

export function DateRangeFilter({ value, onChange }: DateRangeFilterProps) {
    const hasFilter = value.from || value.to;
    return (
        <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex items-center">
                <input
                    type="date"
                    value={value.from}
                    max={value.to || undefined}
                    onChange={(e) => onChange({ ...value, from: e.target.value })}
                    className="pl-3 pr-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl shadow-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
                    title="From date"
                />
            </div>

            <span className="text-xs font-semibold text-gray-400">to</span>

            <div className="relative flex items-center">
                <input
                    type="date"
                    value={value.to}
                    min={value.from || undefined}
                    onChange={(e) => onChange({ ...value, to: e.target.value })}
                    className="pl-3 pr-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl shadow-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
                    title="To date"
                />
            </div>

            {hasFilter && (
                <button
                    onClick={() => onChange({ from: "", to: "" })}
                    title="Clear date filter"
                    className="flex items-center px-2.5 py-2 rounded-xl text-xs font-semibold text-white bg-red-500 hover:bg-red-600 transition-all"
                >
                    Clear
                </button>
            )}
        </div>
    );
}
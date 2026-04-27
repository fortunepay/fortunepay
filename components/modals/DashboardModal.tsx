'use client';
import { DashboardModalProps, DashboardModalActionsProps } from "@/types/dashboardTypes";

export function DashboardModal({
    id,
    isBusy = false,
    onClose,
    children,
}: DashboardModalProps) {
    return (
        <div
            className="fixed inset-0 z-50 flex h-[calc(100%-1rem)] max-h-full items-center justify-center overflow-y-auto overflow-x-hidden p-4 md:inset-0"
            role="dialog"
            aria-modal="true"
            aria-labelledby={id}
        >
            <button
                type="button"
                className="fixed inset-0 bg-gray-900/80"
                aria-label="Close modal"
                disabled={isBusy}
                onClick={onClose}
            />
            <div className="relative z-10 w-full max-w-md max-h-full p-0">
                <div className="relative rounded-lg bg-white">
                    {children}
                </div>
            </div>
        </div>
    );
}

export function DashboardModalActions({
    isBusy = false,
    onCancel,
    submitLabel,
    pendingLabel,
}: DashboardModalActionsProps) {
    return (
        <div className="flex justify-end gap-3 border-gray-200 p-2 md:px-5">
            <button
                type="button"
                disabled={isBusy}
                onClick={onCancel}
                className="rounded-lg border px-4 py-2 text-sm bg-warning cursor-pointer"
            >
                Cancel
            </button>
            <button
                type="submit"
                disabled={isBusy}
                className="inline-flex items-center rounded-lg px-5 py-2 text-center text-sm font-medium text-white bg-[#FFB502] cursor-pointer"
            >
                {isBusy ? pendingLabel : submitLabel}
            </button>
        </div>
    );
}
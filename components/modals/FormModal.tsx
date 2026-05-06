//   <FormModal
//     title="Add User"
//     isBusy={isBusy}
//     submitLabel="Create User"
//     pendingLabel="Creating…"
//     onClose={onClose}
//     onSubmit={handleSubmit}
//   >
//     <FormField label="Name" required error={errors.name}>
//       <input className={inputCls(!!errors.name)} ... />
//     </FormField>
//   </FormModal>
//
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { ReactNode } from "react";
import { X } from "@/components/icons/IconPacks";

const BRAND = "#FFB502";

interface FormModalProps {
    title: string;
    isBusy: boolean;
    submitLabel: string;
    pendingLabel: string;
    maxWidth?: string;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    children: ReactNode;
}

export default function FormModal({
    title,
    isBusy,
    submitLabel,
    pendingLabel,
    maxWidth = "max-w-lg",
    onClose,
    onSubmit,
    children,
}: FormModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className={`bg-white rounded-2xl shadow-2xl w-full ${maxWidth} max-h-[90vh] flex flex-col`}>
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
                    <h2 className="text-base font-bold text-gray-800">{title}</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isBusy}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-40"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <form onSubmit={onSubmit} className="flex flex-col flex-1 overflow-hidden">
                    <div className="px-6 py-5 space-y-4 overflow-y-auto flex-1">
                        {children}
                    </div>

                    <div className="flex justify-end gap-2 px-6 py-4 border-t border-gray-100 shrink-0">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isBusy}
                            className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isBusy}
                            className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:brightness-105 active:scale-95 disabled:opacity-50"
                            style={{ backgroundColor: BRAND }}
                        >
                            {isBusy ? pendingLabel : submitLabel}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
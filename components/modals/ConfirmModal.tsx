"use client";

import { ReactNode, useState } from "react";
import { showSuccess, showError } from "@/lib/apiResponse";
import { Trash, UserRoundX, UserRoundCheck, UserPen } from "@/components/icons/IconPacks";

type ConfirmColor = "red" | "green" | "blue" | "yellow";

const COLOR_MAP: Record<ConfirmColor, { icon: string; btn: string }> = {
    red: { icon: "bg-red-100", btn: "bg-red-500 hover:bg-red-600" },
    green: { icon: "bg-green-100", btn: "bg-green-600 hover:bg-green-700" },
    blue: { icon: "bg-blue-100", btn: "bg-blue-600 hover:bg-blue-700" },
    yellow: { icon: "bg-yellow-100", btn: "bg-yellow-500 hover:bg-yellow-600" },
};

const ICON_MAP: Record<ConfirmColor, ReactNode> = {
    red: <Trash className="w-5 h-5 text-red-500" />,
    green: <UserRoundCheck className="w-5 h-5 text-green-600" />,
    blue: <UserRoundX className="w-5 h-5 text-blue-600" />,
    yellow: <UserPen className="w-5 h-5 text-yellow-500" />,
};

interface ConfirmModalProps {
    title?: string;
    description: string;
    endpoint: string;
    method?: "DELETE" | "POST" | "PATCH";
    body?: Record<string, unknown> | null;
    confirmLabel?: string;
    confirmColor?: ConfirmColor;
    successMessage?: string;
    onSuccess: (responseData?: unknown) => void;
    onClose: () => void;
}

export default function ConfirmModal({
    title = "Are you sure?",
    description,
    endpoint,
    method = "DELETE",
    body = null,
    confirmLabel = "Confirm",
    confirmColor = "red",
    successMessage = "Done.",
    onSuccess,
    onClose,
}: ConfirmModalProps) {
    const [isBusy, setIsBusy] = useState(false);
    const colors = COLOR_MAP[confirmColor];

    async function handleConfirm() {
        setIsBusy(true);
        try {
            const res = await fetch(endpoint, {
                method,
                ...(body !== null && {
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                }),
            });
            const json = await res.json();

            if (!res.ok) {
                showError(json.error ?? json.message ?? "Something went wrong.");
                return;
            }

            showSuccess(json.message ?? successMessage);
            onSuccess(json);
            onClose();
        } catch {
            showError("Network error. Please try again.");
        } finally {
            setIsBusy(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">

                <div className={`flex items-center justify-center w-12 h-12 rounded-full ${colors.icon} mx-auto mb-4`}>
                    {ICON_MAP[confirmColor]}
                </div>

                <h2 className="text-base font-bold text-gray-800 text-center mb-1">{title}</h2>
                <p className="text-sm text-gray-500 text-center mb-6">{description}</p>

                <div className="flex gap-2">
                    <button
                        onClick={onClose}
                        disabled={isBusy}
                        className="flex-1 px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={isBusy}
                        className={`flex-1 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all active:scale-95 disabled:opacity-50 ${colors.btn}`}
                    >
                        {isBusy ? "Please wait…" : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
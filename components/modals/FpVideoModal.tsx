"use client";

import { useState } from "react";
import FormModal from "@/components/modals/FormModal";
import { FormField, inputCls } from "@/components/forms/DashboardFormFields";
import { showSuccess, showError } from "@/lib/apiResponse";
import { VideoStatus } from "@/lib/validations/fpVideoSchema";

export interface FpVideoItem {
    _id: string;
    title: string;
    youtubeUrl: string;
    status: VideoStatus;
    createdAt: string;
}

interface FpVideoModalProps {
    video?: FpVideoItem;
    onClose: () => void;
    onSuccess: () => void;
}

interface FormErrors {
    title?: string;
    youtubeUrl?: string;
}

const youtubeRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=[\w-]{11}|embed\/[\w-]{11}|shorts\/[\w-]{11})|youtu\.be\/[\w-]{11})([?&].*)?$/;

function extractYouTubeId(url: string): string | null {
    const match = url.match(
        /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/,
    );
    return match ? match[1] : null;
}

export default function FpVideoModal({ video, onClose, onSuccess }: FpVideoModalProps) {
    const isEdit = !!video;

    const [title, setTitle] = useState(video?.title ?? "");
    const [youtubeUrl, setYoutubeUrl] = useState(video?.youtubeUrl ?? "");
    const [status, setStatus] = useState<VideoStatus>(video?.status ?? "enabled");
    const [errors, setErrors] = useState<FormErrors>({});
    const [isBusy, setIsBusy] = useState(false);

    const videoId = extractYouTubeId(youtubeUrl);

    function validate(): boolean {
        const newErrors: FormErrors = {};
        if (!title.trim()) newErrors.title = "Title is required.";
        else if (title.trim().length > 150) newErrors.title = "Title must be 150 characters or less.";
        if (!youtubeUrl.trim()) newErrors.youtubeUrl = "YouTube URL is required.";
        else if (!youtubeRegex.test(youtubeUrl.trim())) newErrors.youtubeUrl = "Must be a valid YouTube video URL.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validate()) return;

        setIsBusy(true);
        try {
            const url = isEdit
                ? `/api/marketing/fpvideos/${video!._id}`
                : "/api/marketing/fpvideos";
            const method = isEdit ? "PATCH" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    isEdit
                        ? { title: title.trim(), youtubeUrl: youtubeUrl.trim(), status }
                        : { title: title.trim(), youtubeUrl: youtubeUrl.trim(), status: "enabled" }
                ),
            });
            const json = await res.json();

            if (!res.ok || !json.success) {
                if (json.errors) {
                    const mapped: FormErrors = {};
                    for (const [key, val] of Object.entries(json.errors)) {
                        (mapped as Record<string, string>)[key] = (val as string[])[0];
                    }
                    setErrors(mapped);
                } else {
                    showError(json.message ?? "Something went wrong.");
                }
                return;
            }

            showSuccess(json.message ?? (isEdit ? "Video updated." : "Video added."));
            onSuccess();
            onClose();
        } catch {
            showError("Network error. Please try again.");
        } finally {
            setIsBusy(false);
        }
    }

    return (
        <FormModal
            title={isEdit ? "Edit FP Video" : "Add FP Video"}
            isBusy={isBusy}
            submitLabel={isEdit ? "Save Changes" : "Add Video"}
            pendingLabel={isEdit ? "Saving…" : "Adding…"}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <FormField label="Title" required error={errors.title}>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. FP Introduction Video"
                    className={inputCls(!!errors.title)}
                    maxLength={150}
                />
                <p className="text-xs text-gray-400 mt-1 text-right">{title.length}/150</p>
            </FormField>

            <FormField label="YouTube URL" required error={errors.youtubeUrl}>
                <input
                    value={youtubeUrl}
                    onChange={(e) => { setYoutubeUrl(e.target.value); setErrors((p) => ({ ...p, youtubeUrl: undefined })); }}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className={inputCls(!!errors.youtubeUrl)}
                />
            </FormField>

            {videoId && (
                <div className="rounded-xl overflow-hidden border border-gray-200 aspect-video w-full">
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube preview"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    />
                </div>
            )}

            {isEdit && (
                <FormField label="Status">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as VideoStatus)}
                        className={inputCls(false)}
                    >
                        <option value="enabled">Enabled</option>
                        <option value="disabled">Disabled</option>
                    </select>
                </FormField>
            )}
        </FormModal>
    );
}
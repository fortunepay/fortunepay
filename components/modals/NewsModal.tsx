"use client";

import { useState, useRef } from "react";
import FormModal from "@/components/modals/FormModal";
import { FormField, inputCls } from "@/components/forms/DashboardFormFields";
import { showSuccess, showError } from "@/lib/apiResponse";
import { NewsStatus } from "@/lib/validations/newsSchema";
import RichTextEditor, { RichTextEditorRef } from "@/components/editor/RichTextEditor";

export interface NewsItem {
    _id: string;
    title: string;
    content: string;
    publishDate: string;
    status: NewsStatus;
}

export type ModalState =
    | { type: "add" }
    | { type: "edit"; news: NewsItem }
    | { type: "delete"; news: NewsItem }
    | null;

interface NewsModalProps {
    news?: NewsItem;
    onClose: () => void;
    onSuccess: () => void;
}

interface FormErrors {
    title?: string;
    content?: string;
    publishDate?: string;
}

function getTodayString() {
    return new Date().toISOString().slice(0, 10);
}

export default function NewsFormModal({ news, onClose, onSuccess }: NewsModalProps) {
    const isEdit = !!news;
    const today = getTodayString();

    const [title, setTitle] = useState(news?.title ?? "");
    const [publishDate, setPublishDate] = useState(
        news?.publishDate ? new Date(news.publishDate).toISOString().slice(0, 10) : ""
    );
    const [status, setStatus] = useState<NewsStatus>(news?.status ?? "enabled");
    const [errors, setErrors] = useState<FormErrors>({});
    const [isBusy, setIsBusy] = useState(false);

    const editorRef = useRef<RichTextEditorRef>(null);

    function validate(): boolean {
        const err: FormErrors = {};

        if (!title.trim()) err.title = "Title is required.";
        else if (title.trim().length > 200) err.title = "Title must be 200 characters or less.";

        if (editorRef.current?.isEmpty()) err.content = "Content is required.";

        if (!publishDate) err.publishDate = "Publish date is required.";
        else if (publishDate < today) err.publishDate = "Publish date cannot be in the past.";

        setErrors(err);
        return Object.keys(err).length === 0;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validate()) return;

        const content = editorRef.current!.getHTML();

        setIsBusy(true);
        try {
            const res = await fetch(
                isEdit ? `/api/marketing/news/${news!._id}` : "/api/marketing/news",
                {
                    method: isEdit ? "PATCH" : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title: title.trim(), content, publishDate, status }),
                }
            );
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

            showSuccess(json.message ?? (isEdit ? "News updated." : "News published."));
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
            title={isEdit ? "Edit News" : "Add News"}
            isBusy={isBusy}
            submitLabel={isEdit ? "Save Changes" : "Publish"}
            pendingLabel={isEdit ? "Saving…" : "Publishing…"}
            maxWidth="max-w-7xl"
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <FormField label="Title" required error={errors.title}>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter article title"
                    maxLength={200}
                    className={inputCls(!!errors.title)}
                />
                <p className="text-xs text-gray-400 mt-1 text-right">{title.length}/200</p>
            </FormField>

            <div className={`grid gap-3 ${isEdit ? "grid-cols-2" : "grid-cols-1"}`}>
                <FormField label="Publish Date" required error={errors.publishDate}>
                    <input
                        type="date"
                        value={publishDate}
                        min={today}
                        onChange={(e) => setPublishDate(e.target.value)}
                        className={inputCls(!!errors.publishDate)}
                    />
                </FormField>

                {isEdit && (
                    <FormField label="Status">
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as NewsStatus)}
                            className={inputCls(false)}
                        >
                            <option value="enabled">Enabled</option>
                            <option value="disabled">Disabled</option>
                        </select>
                    </FormField>
                )}
            </div>

            <FormField label="Content" required error={errors.content}>
                <RichTextEditor
                    ref={editorRef}
                    initialValue={news?.content ?? ""}
                    placeholder="Write your article content here…"
                    hasError={!!errors.content}
                    minHeight="min-h-[240px]"
                    maxHeight="max-h-[420px]"
                />
            </FormField>
        </FormModal>
    );
}
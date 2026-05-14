"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import FormModal from "@/components/modals/FormModal";
import { FormField, inputCls } from "@/components/forms/DashboardFormFields";
import { showSuccess, showError } from "@/lib/apiResponse";
import { ArticleStatus } from "@/lib/validations/articleSchema";

export interface ArticleItem {
    _id: string;
    title: string;
    content: string;
    publishDate: string;
    status: ArticleStatus;
    createdAt: string;
}

export type ModalState =
    | { type: "add" }
    | { type: "edit"; article: ArticleItem }
    | { type: "delete"; article: ArticleItem }
    | null;

interface ArticleModalProps {
    article?: ArticleItem;
    onClose: () => void;
    onSuccess: () => void;
}

interface FormErrors {
    title?: string;
    content?: string;
    publishDate?: string;
}

function ToolbarBtn({ onClick, active, title, children }: {
    onClick: () => void;
    active?: boolean;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            title={title}
            className={`px-2 py-1 rounded text-xs font-medium transition-all ${active ? "bg-amber-400 text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
        >
            {children}
        </button>
    );
}

function getTodayString(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}

export default function ArticleFormModal({ article, onClose, onSuccess }: ArticleModalProps) {
    const isEdit = !!article;
    const today = getTodayString();

    const [title, setTitle] = useState(article?.title ?? "");
    const [publishDate, setPublishDate] = useState(
        article?.publishDate ? new Date(article.publishDate).toISOString().slice(0, 10) : ""
    );
    const [status, setStatus] = useState<ArticleStatus>(article?.status ?? "enabled");
    const [errors, setErrors] = useState<FormErrors>({});
    const [isBusy, setIsBusy] = useState(false);

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Underline,
            Link.configure({ openOnClick: false }),
            TextAlign.configure({ types: ["heading", "paragraph"] }),
        ],
        content: article?.content ?? "",
        editorProps: {
            attributes: {
                class: "prose prose-sm max-w-none min-h-[180px] p-3 focus:outline-none",
            },
        },
    });

    function validate(): boolean {
        const newErrors: FormErrors = {};
        if (!title.trim()) newErrors.title = "Title is required.";
        else if (title.trim().length > 200) newErrors.title = "Title must be 200 characters or less.";
        if (!editor || editor.isEmpty) newErrors.content = "Content is required.";
        if (!publishDate) newErrors.publishDate = "Publish date is required.";
        else if (publishDate < today) newErrors.publishDate = "Publish date cannot be in the past.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validate()) return;

        setIsBusy(true);
        try {
            const url = isEdit ? `/api/marketing/articles/${article!._id}` : "/api/marketing/articles";
            const method = isEdit ? "PATCH" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: title.trim(),
                    content: editor!.getHTML(),
                    publishDate,
                    status,
                }),
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

            showSuccess(json.message ?? (isEdit ? "Article updated." : "Article created."));
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
            title={isEdit ? "Edit Article" : "Add Article"}
            isBusy={isBusy}
            submitLabel={isEdit ? "Save Changes" : "Publish Article"}
            pendingLabel={isEdit ? "Saving…" : "Publishing…"}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <FormField label="Title" required error={errors.title}>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter article title"
                    className={inputCls(!!errors.title)}
                    maxLength={200}
                />
                <p className="text-xs text-gray-400 mt-1 text-right">{title.length}/200</p>
            </FormField>

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
                        onChange={(e) => setStatus(e.target.value as ArticleStatus)}
                        className={inputCls(false)}
                    >
                        <option value="active">Active</option>
                        <option value="disabled">Disabled</option>
                    </select>
                </FormField>
            )}

            <FormField label="Content" required error={errors.content}>
                <div className={`border rounded-lg overflow-hidden ${errors.content ? "border-red-400" : "border-gray-200"}`}>
                    <div className="flex flex-wrap gap-0.5 p-2 border-b border-gray-100 bg-gray-50">
                        <ToolbarBtn onClick={() => editor?.chain().focus().toggleBold().run()} active={editor?.isActive("bold")} title="Bold"><b>B</b></ToolbarBtn>
                        <ToolbarBtn onClick={() => editor?.chain().focus().toggleItalic().run()} active={editor?.isActive("italic")} title="Italic"><i>I</i></ToolbarBtn>
                        <ToolbarBtn onClick={() => editor?.chain().focus().toggleUnderline().run()} active={editor?.isActive("underline")} title="Underline"><u>U</u></ToolbarBtn>
                        <ToolbarBtn onClick={() => editor?.chain().focus().toggleStrike().run()} active={editor?.isActive("strike")} title="Strikethrough"><s>S</s></ToolbarBtn>
                        <div className="w-px h-5 bg-gray-200 mx-1 self-center" />
                        <ToolbarBtn onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} active={editor?.isActive("heading", { level: 2 })} title="H2">H2</ToolbarBtn>
                        <ToolbarBtn onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} active={editor?.isActive("heading", { level: 3 })} title="H3">H3</ToolbarBtn>
                        <div className="w-px h-5 bg-gray-200 mx-1 self-center" />
                        <ToolbarBtn onClick={() => editor?.chain().focus().toggleBulletList().run()} active={editor?.isActive("bulletList")} title="Bullet List">• List</ToolbarBtn>
                        <ToolbarBtn onClick={() => editor?.chain().focus().toggleOrderedList().run()} active={editor?.isActive("orderedList")} title="Ordered List">1. List</ToolbarBtn>
                        <div className="w-px h-5 bg-gray-200 mx-1 self-center" />
                        <ToolbarBtn onClick={() => editor?.chain().focus().toggleBlockquote().run()} active={editor?.isActive("blockquote")} title="Blockquote">❝</ToolbarBtn>
                        <ToolbarBtn onClick={() => editor?.chain().focus().setTextAlign("left").run()} active={editor?.isActive({ textAlign: "left" })} title="Align Left">≡L</ToolbarBtn>
                        <ToolbarBtn onClick={() => editor?.chain().focus().setTextAlign("center").run()} active={editor?.isActive({ textAlign: "center" })} title="Align Center">≡C</ToolbarBtn>
                        <ToolbarBtn onClick={() => editor?.chain().focus().setTextAlign("right").run()} active={editor?.isActive({ textAlign: "right" })} title="Align Right">≡R</ToolbarBtn>
                        <div className="w-px h-5 bg-gray-200 mx-1 self-center" />
                        <ToolbarBtn onClick={() => editor?.chain().focus().undo().run()} title="Undo">↩</ToolbarBtn>
                        <ToolbarBtn onClick={() => editor?.chain().focus().redo().run()} title="Redo">↪</ToolbarBtn>
                    </div>
                    <EditorContent editor={editor} className="bg-white min-h-4 max-h-75 overflow-y-auto" />
                </div>
            </FormField>
        </FormModal>
    );
}
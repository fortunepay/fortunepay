"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useImperativeHandle, forwardRef } from "react";

export interface RichTextEditorRef {
    getHTML: () => string;
    isEmpty: () => boolean;
    clear: () => void;
}

function Divider() {
    return <div className="w-px h-5 bg-gray-200 mx-1 self-center shrink-0" aria-hidden />;
}

function ToolbarBtn({
    onClick,
    active,
    title,
    children,
}: {
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
            className={`px-2 py-1 rounded text-xs font-medium transition-all shrink-0 ${active
                ? "bg-amber-400 text-white shadow-sm"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                }`}
        >
            {children}
        </button>
    );
}

interface RichTextEditorProps {
    initialValue?: string;
    onChange?: (html: string) => void;
    placeholder?: string;
    hasError?: boolean;
    minHeight?: string;
    maxHeight?: string;
}

const RichTextEditor = forwardRef<RichTextEditorRef, RichTextEditorProps>(
    function RichTextEditor(
        {
            initialValue = "",
            onChange,
            placeholder = "Start writing…",
            hasError = false,
            minHeight = "min-h-[200px]",
            maxHeight = "max-h-[400px]",
        },
        ref,
    ) {
        const editor = useEditor({
            immediatelyRender: false,
            extensions: [
                StarterKit,
                Underline,
                Link.configure({ openOnClick: false }),
                TextAlign.configure({ types: ["heading", "paragraph"] }),
                Placeholder.configure({ placeholder }),
            ],
            content: initialValue || "",
            editorProps: {
                attributes: {
                    class: [
                        "prose prose-sm max-w-none w-full p-3 focus:outline-none",
                        "prose-headings:font-bold prose-headings:text-gray-800",
                        "prose-p:text-gray-700 prose-li:text-gray-700",
                        "prose-blockquote:border-l-amber-400 prose-blockquote:text-gray-500",
                        "prose-a:text-amber-600 prose-a:underline",
                        minHeight,
                    ].join(" "),
                },
            },
            onUpdate({ editor }) {
                onChange?.(editor.getHTML());
            },
        });

        useImperativeHandle(ref, () => ({
            getHTML: () => editor?.getHTML() ?? "",
            isEmpty: () => !editor || editor.isEmpty,
            clear: () => editor?.commands.clearContent(),
        }));

        useEffect(() => {
            if (!editor) return;
            const current = editor.getHTML();
            if (current !== initialValue) {
                editor.commands.setContent(initialValue || "");
            }
        }, [initialValue]);

        const borderClass = hasError
            ? "border-red-400 focus-within:ring-2 focus-within:ring-red-200"
            : "border-gray-200 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-100";

        return (
            <div className={`border rounded-xl overflow-hidden transition-all ${borderClass}`}>

                <div className="flex flex-wrap gap-0.5 px-2 py-1.5 border-b border-gray-100 bg-gray-50">

                    <ToolbarBtn onClick={() => editor?.chain().focus().toggleBold().run()} active={editor?.isActive("bold")} title="Bold (Ctrl+B)"><b>B</b></ToolbarBtn>
                    <ToolbarBtn onClick={() => editor?.chain().focus().toggleItalic().run()} active={editor?.isActive("italic")} title="Italic (Ctrl+I)"><i>I</i></ToolbarBtn>
                    <ToolbarBtn onClick={() => editor?.chain().focus().toggleUnderline().run()} active={editor?.isActive("underline")} title="Underline (Ctrl+U)"><u>U</u></ToolbarBtn>
                    <ToolbarBtn onClick={() => editor?.chain().focus().toggleStrike().run()} active={editor?.isActive("strike")} title="Strikethrough"><s>S</s></ToolbarBtn>

                    <Divider />

                    <ToolbarBtn onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} active={editor?.isActive("heading", { level: 1 })} title="Heading 1">H1</ToolbarBtn>
                    <ToolbarBtn onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} active={editor?.isActive("heading", { level: 2 })} title="Heading 2">H2</ToolbarBtn>
                    <ToolbarBtn onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} active={editor?.isActive("heading", { level: 3 })} title="Heading 3">H3</ToolbarBtn>

                    <Divider />

                    {/* Lists */}
                    <ToolbarBtn onClick={() => editor?.chain().focus().toggleBulletList().run()} active={editor?.isActive("bulletList")} title="Bullet list">• List</ToolbarBtn>
                    <ToolbarBtn onClick={() => editor?.chain().focus().toggleOrderedList().run()} active={editor?.isActive("orderedList")} title="Numbered list">1. List</ToolbarBtn>

                    <Divider />

                    {/* Blocks */}
                    <ToolbarBtn onClick={() => editor?.chain().focus().toggleBlockquote().run()} active={editor?.isActive("blockquote")} title="Blockquote">❝</ToolbarBtn>
                    <ToolbarBtn onClick={() => editor?.chain().focus().toggleCode().run()} active={editor?.isActive("code")} title="Inline code">{"</>"}</ToolbarBtn>
                    <ToolbarBtn onClick={() => editor?.chain().focus().toggleCodeBlock().run()} active={editor?.isActive("codeBlock")} title="Code block">{"{ }"}</ToolbarBtn>
                    <ToolbarBtn onClick={() => editor?.chain().focus().setHorizontalRule().run()} title="Horizontal rule">—</ToolbarBtn>

                    <Divider />

                    {/* Alignment */}
                    <ToolbarBtn onClick={() => editor?.chain().focus().setTextAlign("left").run()} active={editor?.isActive({ textAlign: "left" })} title="Align left">≡L</ToolbarBtn>
                    <ToolbarBtn onClick={() => editor?.chain().focus().setTextAlign("center").run()} active={editor?.isActive({ textAlign: "center" })} title="Align center">≡C</ToolbarBtn>
                    <ToolbarBtn onClick={() => editor?.chain().focus().setTextAlign("right").run()} active={editor?.isActive({ textAlign: "right" })} title="Align right">≡R</ToolbarBtn>
                    <ToolbarBtn onClick={() => editor?.chain().focus().setTextAlign("justify").run()} active={editor?.isActive({ textAlign: "justify" })} title="Justify">≡J</ToolbarBtn>

                    <Divider />

                    {/* History */}
                    <ToolbarBtn onClick={() => editor?.chain().focus().undo().run()} title="Undo (Ctrl+Z)">↩</ToolbarBtn>
                    <ToolbarBtn onClick={() => editor?.chain().focus().redo().run()} title="Redo (Ctrl+Y)">↪</ToolbarBtn>

                    <Divider />

                    {/* Clear */}
                    <ToolbarBtn onClick={() => editor?.chain().focus().clearNodes().unsetAllMarks().run()} title="Clear formatting">Tx</ToolbarBtn>
                </div>

                {/* ── Editor area ── */}
                <div className={`bg-white overflow-y-auto ${maxHeight}`}>
                    <EditorContent editor={editor} />
                </div>
            </div>
        );
    },
);
export default RichTextEditor;
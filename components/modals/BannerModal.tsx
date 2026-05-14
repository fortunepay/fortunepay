"use client";

import { useState, useEffect, useRef } from "react";
import FormModal from "@/components/modals/FormModal";
import { FormField, inputCls } from "@/components/forms/DashboardFormFields";
import { showSuccess, showError } from "@/lib/apiResponse";
import { Image } from "@/components/icons/IconPacks";

export interface BannerItem {
    _id: string;
    image: string;
    imagePublicId: string;
    description: string;
    startDate: string;
    endDate: string;
}

interface BannerModalProps {
    banner?: BannerItem;
    onClose: () => void;
    onSuccess: () => void;
}

interface FormErrors {
    image?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
}

function nowMin() {
    const now = new Date();
    now.setSeconds(0, 0);
    return now.toISOString().slice(0, 16);
}

function toInputValue(iso: string) {
    return iso ? new Date(iso).toISOString().slice(0, 16) : "";
}

export default function BannerModal({ banner, onClose, onSuccess }: BannerModalProps) {
    const isEdit = !!banner;

    const [description, setDescription] = useState(banner?.description ?? "");
    const [startDate, setStartDate] = useState(banner ? toInputValue(banner.startDate) : "");
    const [endDate, setEndDate] = useState(banner ? toInputValue(banner.endDate) : "");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(banner?.image ?? null);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isBusy, setIsBusy] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const blobRef = useRef<string | null>(null);

    useEffect(() => {
        return () => {
            if (blobRef.current) URL.revokeObjectURL(blobRef.current);
        };
    }, []);

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setErrors((prev) => ({ ...prev, image: "Please select a valid image file." }));
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setErrors((prev) => ({ ...prev, image: "Image must be under 5MB." }));
            return;
        }

        if (blobRef.current) URL.revokeObjectURL(blobRef.current);
        const blob = URL.createObjectURL(file);
        blobRef.current = blob;

        setImageFile(file);
        setPreview(blob);
        setErrors((prev) => ({ ...prev, image: undefined }));
    }

    function validate(): boolean {
        const newErrors: FormErrors = {};

        if (!isEdit && !imageFile) newErrors.image = "Banner image is required.";
        if (!description.trim()) newErrors.description = "Description is required.";
        else if (description.trim().length < 5) newErrors.description = "Description must be at least 5 characters.";
        else if (description.trim().length > 300) newErrors.description = "Description must be at most 300 characters.";
        if (!startDate) newErrors.startDate = "Start date is required.";
        if (!endDate) newErrors.endDate = "End date is required.";
        else if (startDate && new Date(endDate) <= new Date(startDate))
            newErrors.endDate = "End date must be after start date.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validate()) return;

        setIsBusy(true);
        try {
            const fd = new FormData();
            if (imageFile) fd.append("image", imageFile);
            fd.append("description", description.trim());
            fd.append("startDate", startDate);
            fd.append("endDate", endDate);

            const url = isEdit
                ? `/api/marketing/banners/${banner!._id}`
                : "/api/marketing/banners";
            const method = isEdit ? "PATCH" : "POST";

            const res = await fetch(url, { method, body: fd });
            const json = await res.json();

            if (!res.ok) {
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

            showSuccess(json.message ?? (isEdit ? "Banner updated." : "Banner created."));
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
            title={isEdit ? "Edit Banner" : "Add Banner"}
            isBusy={isBusy}
            submitLabel={isEdit ? "Save Changes" : "Create Banner"}
            pendingLabel={isEdit ? "Saving…" : "Creating…"}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <FormField label="Banner Image" required={!isEdit} error={errors.image}>
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative w-full h-44 rounded-xl border-2 border-dashed cursor-pointer overflow-hidden transition-all group
                        ${errors.image
                            ? "border-red-400 bg-red-50"
                            : "border-gray-200 hover:border-amber-400 bg-gray-50 hover:bg-amber-50/30"
                        }`}
                >
                    {preview ? (
                        <>
                            <img
                                src={preview}
                                alt="Banner preview"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white text-xs font-semibold flex items-center gap-1.5">
                                    <Image className="w-4 h-4" />
                                    Change Image
                                </span>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-400">
                            <Image className="w-8 h-8" />
                            <span className="text-xs font-medium">Click to upload image</span>
                            <span className="text-xs">PNG, JPG, WEBP · max 5MB</span>
                        </div>
                    )}
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                />
            </FormField>

            <FormField label="Description" required error={errors.description}>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="Enter banner description…"
                    className={`${inputCls(!!errors.description)} resize-none`}
                />
                <p className="text-xs text-gray-400 mt-1 text-right">{description.length}/300</p>
            </FormField>

            <FormField label="Start Date" required error={errors.startDate}>
                <input
                    type="datetime-local"
                    value={startDate}
                    min={nowMin()}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={inputCls(!!errors.startDate)}
                />
            </FormField>

            <FormField label="End Date" required error={errors.endDate}>
                <input
                    type="datetime-local"
                    value={endDate}
                    min={startDate || nowMin()}
                    onChange={(e) => setEndDate(e.target.value)}
                    className={inputCls(!!errors.endDate)}
                />
            </FormField>
        </FormModal>
    );
}
"use client";

import { useEffect, useRef, useState } from "react";
import { promoClientSchema, PromoClientValues } from "@/lib/validations/promoSchema";
import { showSuccess, showError } from "@/lib/apiResponse";
import { PromoItem } from "@/types/dashboardTypes";
import { Image } from "@/components/icons/IconPacks";
import FormModal from "@/components/modals/FormModal";
import { FormField, inputCls } from "@/components/forms/DashboardFormFields";

function toInputValue(iso?: string) {
    if (!iso) return "";
    const d = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function nowMin() {
    return toInputValue(new Date().toISOString());
}

interface PromoModalProps {
    promo?: PromoItem;
    onClose: () => void;
    onSuccess: () => void;
}

type FieldErrors = Partial<Record<keyof PromoClientValues, string>>;

export default function PromoModal({ promo, onClose, onSuccess }: PromoModalProps) {
    const editing = !!promo;

    const [title, setTitle] = useState(promo?.title ?? "");
    const [description, setDescription] = useState(promo?.description ?? "");
    const [startDate, setStartDate] = useState(toInputValue(promo?.startDate));
    const [endDate, setEndDate] = useState(toInputValue(promo?.endDate));
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState(promo?.bannerImage ?? "");
    const [errors, setErrors] = useState<FieldErrors>({});
    const [isBusy, setIsBusy] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        return () => { if (imagePreview.startsWith("blob:")) URL.revokeObjectURL(imagePreview); };
    }, [imagePreview]);

    function handleImage(file: File | undefined | null) {
        if (!file) return;
        setImageFile(file);
        if (imagePreview.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
        setImagePreview(URL.createObjectURL(file));
        setErrors((prev) => ({ ...prev, bannerImage: undefined }));
    }

    async function handleSubmit(e: React.FormEvent<Element>) {
        e.preventDefault();

        const values: PromoClientValues = { title, description, startDate, endDate, bannerImage: imageFile ?? null };
        const result = promoClientSchema.safeParse(values);

        if (!result.success) {
            const flat = result.error.flatten().fieldErrors;
            const mapped: FieldErrors = {};
            for (const key in flat) {
                mapped[key as keyof FieldErrors] = (flat[key as keyof typeof flat] as string[] | undefined)?.[0];
            }
            if (!editing && !imageFile) mapped.bannerImage = "Banner image is required";
            setErrors(mapped);
            return;
        }

        if (!editing && !imageFile) {
            setErrors((prev) => ({ ...prev, bannerImage: "Banner image is required" }));
            return;
        }

        setErrors({});
        setIsBusy(true);

        try {
            const form = new FormData();
            form.append("title", title);
            form.append("description", description);
            form.append("startDate", startDate);
            form.append("endDate", endDate);
            if (imageFile) form.append("bannerImage", imageFile);

            const url = editing ? `/api/marketing/promo/${promo._id}` : "/api/marketing/promo";
            const method = editing ? "PATCH" : "POST";
            const res = await fetch(url, { method, body: form });
            const json = await res.json();

            if (!res.ok || !json.success) { showError(json.message ?? "Something went wrong."); return; }

            showSuccess(editing ? "Promo updated!" : "Promo created!");
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
            title={editing ? "Edit Promo" : "Add New Promo"}
            isBusy={isBusy}
            submitLabel={editing ? "Save Changes" : "Create Promo"}
            pendingLabel={editing ? "Saving…" : "Creating…"}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Banner Image{!editing && <span className="text-red-500 ml-0.5">*</span>}
                </label>
                <div
                    onClick={() => fileRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => { e.preventDefault(); handleImage(e.dataTransfer.files[0]); }}
                    className={`relative w-full h-70 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden
                        ${errors.bannerImage ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-amber-300 bg-gray-50 hover:bg-amber-50/30"}`}
                >
                    {imagePreview ? (
                        <>
                            <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                <Image className="w-5 h-5 text-white mb-1" />
                                <span className="text-xs text-white font-semibold">Change image</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <Image className="w-6 h-6 text-gray-300 mb-2" />
                            <span className="text-xs text-gray-400">Click or drag to upload</span>
                            <span className="text-xs text-gray-300 mt-0.5">PNG, JPG, WEBP</span>
                        </>
                    )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImage(e.target.files?.[0])} />
                {errors.bannerImage && <p className="text-xs text-red-500 mt-1">{errors.bannerImage}</p>}
            </div>

            <FormField label="Title" required error={errors.title}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Promo title" className={inputCls(!!errors.title)} />
            </FormField>

            <div className="grid grid-cols-2 gap-3">
                <FormField label="Start Date" required error={errors.startDate}>
                    <input
                        type="datetime-local"
                        value={startDate}
                        min={nowMin()}
                        onChange={(e) => { setStartDate(e.target.value); if (endDate && e.target.value > endDate) setEndDate(""); }}
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
            </div>

            <FormField label="Description" required error={errors.description}>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the promo…"
                    rows={3}
                    className={inputCls(!!errors.description) + " resize-none"}
                />
            </FormField>
        </FormModal>
    );
}
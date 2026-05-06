//   import { FormField, inputCls } from "@/components/modals/FormField";
//
//   <FormField label="Email" required error={errors.email}>
//     <input className={inputCls(!!errors.email)} ... />
//   </FormField>
//

import { ReactNode } from "react";

interface FormFieldProps {
    label: string;
    required?: boolean;
    error?: string;
    children: ReactNode;
}

export function FormField({ label, required, error, children }: FormFieldProps) {
    return (
        <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                {label}{required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            {children}
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
}

export function inputCls(hasError: boolean) {
    return [
        "w-full px-3 py-2 text-sm rounded-xl border outline-none transition-all focus:ring-2",
        hasError
            ? "border-red-400 focus:ring-red-200 bg-red-50"
            : "border-gray-200 focus:border-amber-400 focus:ring-amber-100 bg-white",
    ].join(" ");
}
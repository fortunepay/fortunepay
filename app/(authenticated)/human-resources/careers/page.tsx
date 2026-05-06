"use client";

import { useState, useRef, useCallback, ChangeEvent, DragEvent, MouseEvent } from "react";
import { Briefcase, CheckCircle, Users, Building2, Image } from "lucide-react";

type JobStatus = "Active" | "Closed" | "Draft";

type Department =
    | "Human Resources"
    | "CS"
    | "Marketing"
    | "Operations"
    | "Sales"
    | "Legal"
    | "Information Technology"
    | "Finance";

type JobType = "Full-time" | "Part-time" | "Contract" | "Internship" | "Freelance";

interface Job {
    id: number;
    title: string;
    department: Department;
    type: JobType;
    salary: string;
    status: JobStatus;
    applicants: number;
    posted: string;
    image: string | null;
    description: string;
}

interface FormState {
    title: string;
    department: Department;
    type: JobType;
    salary: string;
    status: JobStatus;
    image: string | null;
    description: string;
}

const TOOLBAR: { cmd: string; icon: string; title: string; style: string }[] = [
    { cmd: "bold", icon: "B", title: "Bold", style: "font-bold" },
    { cmd: "italic", icon: "I", title: "Italic", style: "italic" },
    { cmd: "underline", icon: "U̲", title: "Underline", style: "underline" },
    { cmd: "insertUnorderedList", icon: "≡", title: "Bullet list", style: "" },
    { cmd: "insertOrderedList", icon: "1≡", title: "Numbered list", style: "" },
    { cmd: "justifyLeft", icon: "⫷", title: "Align left", style: "" },
    { cmd: "justifyCenter", icon: "≡", title: "Center", style: "" },
    { cmd: "justifyRight", icon: "⫸", title: "Align right", style: "" },
];

const HEADING_OPTIONS: { label: string; tag: string }[] = [
    { label: "Paragraph", tag: "div" },
    { label: "Heading 1", tag: "h1" },
    { label: "Heading 2", tag: "h2" },
    { label: "Heading 3", tag: "h3" },
];

const DEPARTMENTS: Department[] = [
    "Human Resources", "CS", "Marketing", "Operations", "Sales", "Legal", "Finance", "Information Technology",
];

const JOB_TYPES: JobType[] = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"];

const JOB_STATUSES: JobStatus[] = ["Draft", "Active", "Closed"];

const INITIAL_JOBS: Job[] = [
    {
        id: 1,
        title: "Junior Customer Support Specialist",
        department: "CS",
        type: "Full-time",
        salary: "₱120,000 – ₱180,000/mo",
        status: "Active",
        applicants: 24,
        posted: "Apr 20, 2026",
        image: null,
        description: "<h2>About the role</h2><p>We're looking for a senior frontend engineer to join our product team...</p>",
    },
    {
        id: 2,
        title: "HR Business Partner",
        department: "Human Resources",
        type: "Full-time",
        salary: "₱80,000 – ₱110,000/mo",
        status: "Active",
        applicants: 41,
        posted: "Apr 15, 2026",
        image: null,
        description: "<p>Partner with department leaders to align HR strategy with business goals.</p>",
    },
    {
        id: 3,
        title: "Data Analyst",
        department: "Information Technology",
        type: "Full-time",
        salary: "₱60,000 – ₱90,000/mo",
        status: "Closed",
        applicants: 67,
        posted: "Mar 28, 2026",
        image: null,
        description: "<p>Analyze large datasets and produce actionable insights for the growth team.</p>",
    },
];

const STATUS_CLASSES: Record<JobStatus, string> = {
    Active: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    Closed: "bg-red-50 text-red-600 ring-1 ring-red-200",
    Draft: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
};

const STATUS_DOT: Record<JobStatus, string> = {
    Active: "bg-emerald-500",
    Closed: "bg-red-500",
    Draft: "bg-amber-400",
};

function StatusBadge({ status }: { status: JobStatus }) {
    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_CLASSES[status]}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[status]}`} />
            {status}
        </span>
    );
}

interface WYSIWYGEditorProps {
    value: string;
    onChange: (val: string) => void;
}

function WYSIWYGEditor({ value, onChange }: WYSIWYGEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);

    const exec = useCallback((cmd: string, val: string | undefined = undefined) => {
        editorRef.current?.focus();
        document.execCommand(cmd, false, val);
        onChange(editorRef.current?.innerHTML ?? "");
    }, [onChange]);

    const handleInput = () => onChange(editorRef.current?.innerHTML ?? "");

    const handleHeading = (e: ChangeEvent<HTMLSelectElement>) => {
        exec("formatBlock", e.target.value);
    };

    const handleLink = () => {
        const url = window.prompt("Enter URL:");
        if (url) exec("createLink", url);
    };

    return (
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <div className="flex flex-wrap items-center gap-1 px-3 py-2 bg-slate-50 border-b border-slate-200">
                <select
                    onChange={handleHeading}
                    className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#FFB502] mr-1"
                >
                    {HEADING_OPTIONS.map((h) => (
                        <option key={h.tag} value={h.tag}>{h.label}</option>
                    ))}
                </select>

                <div className="w-px h-5 bg-slate-200 mx-1" />

                {TOOLBAR.map((t) => (
                    <button
                        key={t.cmd}
                        type="button"
                        title={t.title}
                        onMouseDown={(e) => { e.preventDefault(); exec(t.cmd); }}
                        className={`min-w-7.5 h-7 px-1.5 rounded-lg text-sm text-slate-600 hover:bg-[#FFB502]/10 hover:text-[#FFB502] transition-colors ${t.style}`}
                    >
                        {t.icon}
                    </button>
                ))}

                <div className="w-px h-5 bg-slate-200 mx-1" />

                <button
                    type="button"
                    title="Link"
                    onMouseDown={(e) => { e.preventDefault(); handleLink(); }}
                    className="min-w-[30px] h-7 px-1.5 rounded-lg text-sm text-slate-600 hover:bg-[#FFB502]/10 hover:text-[#FFB502] transition-colors"
                >
                    🔗
                </button>
                <button
                    type="button"
                    title="Clear formatting"
                    onMouseDown={(e) => { e.preventDefault(); exec("removeFormat"); }}
                    className="min-w-[30px] h-7 px-1.5 rounded-lg text-sm text-slate-600 hover:bg-red-100 hover:text-red-600 transition-colors"
                >
                    ✕
                </button>
            </div>

            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleInput}
                dangerouslySetInnerHTML={{ __html: value }}
                className="min-h-[200px] p-4 text-sm text-slate-700 focus:outline-none prose prose-sm max-w-none"
                style={{ lineHeight: "1.7" }}
            />
        </div>
    );
}

// Image Upload
interface ImageUploadProps {
    value: string | null;
    onChange: (val: string | null) => void;
}

function ImageUpload({ value, onChange }: ImageUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);

    const processFile = (file: File) => {
        if (!file || !file.type.startsWith("image/")) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result && typeof e.target.result === "string") {
                onChange(e.target.result);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) processFile(file);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) processFile(file);
    };

    return (
        <div>
            {value ? (
                <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                    <img src={value} alt="Job banner" className="w-full h-48 object-cover" />
                    <button
                        type="button"
                        onClick={() => onChange(null)}
                        className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-slate-700 hover:bg-red-50 hover:text-red-600 rounded-full w-8 h-8 flex items-center justify-center text-sm shadow transition-colors"
                    >
                        ✕
                    </button>
                </div>
            ) : (
                <div
                    onClick={() => inputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    className={`flex flex-col items-center justify-center gap-3 h-40 rounded-xl border-2 border-dashed transition-all
                        ${dragging ? "border-[#FFB502] bg-[#FFB502]/10" : "border-slate-200 bg-slate-50 hover:border-[#FFB502] hover:bg-[#FFB502]/5"}`}
                >
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"><Image /></div>
                    <div className="text-center">
                        <p className="text-sm font-medium text-slate-700">
                            Drop image here or <span className="text-[#FFB502]">browse</span>
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">PNG, JPG, WEBP up to 10MB</p>
                    </div>
                </div>
            )}
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </div>
    );
}

const DEPT_COLORS: Record<Department, string> = {
    "Human Resources": "bg-violet-50 text-violet-700",
    "CS": "bg-blue-50 text-blue-700",
    "Marketing": "bg-pink-50 text-pink-700",
    "Operations": "bg-slate-100 text-slate-600",
    "Sales": "bg-emerald-50 text-emerald-700",
    "Legal": "bg-amber-50 text-amber-700",
    "Finance": "bg-cyan-50 text-cyan-700",
    "Information Technology": "bg-cyan-50 text-cyan-700",
};

interface JobCardProps {
    job: Job;
    onEdit: (job: Job) => void;
    onDelete: (id: number) => void;
}

function JobCard({ job, onEdit, onDelete }: JobCardProps) {
    return (
        <div className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#FFB502]/30 transition-all duration-200 overflow-hidden">
            {job.image ? (
                <div className="h-36 overflow-hidden">
                    <img src={job.image} alt={job.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
            ) : (
                <div className="h-36 bg-gradient-to-br from-[#FFB502]/10 via-amber-50 to-yellow-50 flex items-center justify-center">
                    <div className="text-5xl opacity-30">💼</div>
                </div>
            )}

            <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                        <h3 className="font-semibold text-slate-900 text-base leading-tight">{job.title}</h3>
                        <span className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${DEPT_COLORS[job.department]}`}>
                            {job.department}
                        </span>
                    </div>
                    <StatusBadge status={job.status} />
                </div>

                <div className="space-y-1.5 text-xs text-slate-500 mb-4">
                    <div className="flex items-center gap-1.5"> {job.type}</div>
                    <div className="flex items-center gap-1.5"> {job.salary}</div>
                    <div className="flex items-center gap-1.5"> Posted {job.posted}</div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="text-xs text-slate-500 font-medium">
                        {job.applicants} applicants
                    </div>
                    <div className="flex gap-1.5">
                        <button
                            onClick={() => onEdit(job)}
                            className="text-xs px-3 py-1.5 rounded-lg bg-[#FFB502]/10 text-[#FFB502] hover:bg-[#FFB502]/20 font-medium transition-colors"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(job.id)}
                            className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


interface JobModalProps {
    job: Job | null;
    onClose: () => void;
    onSave: (job: Job) => void;
}

function JobModal({ job, onClose, onSave }: JobModalProps) {
    const isEdit = !!job?.id;

    const [form, setForm] = useState<FormState>({
        title: job?.title ?? "",
        department: job?.department ?? DEPARTMENTS[0],
        type: job?.type ?? JOB_TYPES[0],
        salary: job?.salary ?? "",
        status: job?.status ?? "Draft",
        image: job?.image ?? null,
        description: job?.description ?? "<p>Describe the role, responsibilities, and requirements...</p>",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

    const set = <K extends keyof FormState>(key: K, val: FormState[K]) =>
        setForm((f) => ({ ...f, [key]: val }));

    const validate = (): boolean => {
        const e: Partial<Record<keyof FormState, string>> = {};
        if (!form.title.trim()) e.title = "Job title is required";
        if (!form.salary.trim()) e.salary = "Salary range is required";
        if (!form.description.trim() || form.description === "<br>")
            e.description = "Job description is required";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;
        onSave({
            ...form,
            id: job?.id ?? Date.now(),
            applicants: job?.applicants ?? 0,
            posted: job?.posted ?? new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        });
        onClose();
    };

    const handleSaveAsDraft = () => {
        set("status", "Draft");
        setTimeout(handleSubmit, 0);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">
                            {isEdit ? "Edit Job Posting" : "Post a New Job"}
                        </h2>
                        <p className="text-sm text-slate-400 mt-0.5">
                            {isEdit ? "Update the details below" : "Fill in the details to publish your listing"}
                        </p>
                    </div>
                    <button onClick={onClose} className="w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
                        ✕
                    </button>
                </div>

                <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Job Banner Image</label>
                        <ImageUpload value={form.image} onChange={(v) => set("image", v)} />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                            Job Title <span className="text-red-400">*</span>
                        </label>
                        <input
                            value={form.title}
                            onChange={(e) => set("title", e.target.value)}
                            placeholder="e.g. Senior Backend Engineer"
                            className={`w-full border rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#FFB502] transition ${errors.title ? "border-red-400 bg-red-50" : "border-slate-200"}`}
                        />
                        {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Department</label>
                            <select
                                value={form.department}
                                onChange={(e) => set("department", e.target.value as Department)}
                                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FFB502] bg-white"
                            >
                                {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Employment Type</label>
                            <select
                                value={form.type}
                                onChange={(e) => set("type", e.target.value as JobType)}
                                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FFB502] bg-white"
                            >
                                {JOB_TYPES.map((t) => <option key={t}>{t}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Status</label>
                            <select
                                value={form.status}
                                onChange={(e) => set("status", e.target.value as JobStatus)}
                                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FFB502] bg-white"
                            >
                                {JOB_STATUSES.map((s) => <option key={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                Salary Range <span className="text-red-400">*</span>
                            </label>
                            <input
                                value={form.salary}
                                onChange={(e) => set("salary", e.target.value)}
                                placeholder="e.g. ₱80,000 – ₱120,000/mo"
                                className={`w-full border rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#FFB502] transition ${errors.salary ? "border-red-400 bg-red-50" : "border-slate-200"}`}
                            />
                            {errors.salary && <p className="text-xs text-red-500 mt-1">{errors.salary}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                            Job Description <span className="text-red-400">*</span>
                        </label>
                        <WYSIWYGEditor
                            value={form.description}
                            onChange={(v) => set("description", v)}
                        />
                        {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
                    </div>
                </div>

                <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/70">
                    <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                        Cancel
                    </button>
                    <div className="flex gap-3">
                        <button
                            onClick={handleSaveAsDraft}
                            className="px-5 py-2.5 rounded-xl text-sm font-medium text-[#FFB502] border border-[#FFB502]/30 bg-[#FFB502]/5 hover:bg-[#FFB502]/10 transition-colors"
                        >
                            Save as Draft
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[#FFB502] hover:bg-[#FFB502]/90 shadow-sm transition-all"
                        >
                            {isEdit ? "Update Posting" : "Publish Job"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// StatCard Component
interface StatCardProps {
    label: string;
    value: number;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    color: string;
}

function StatCard({ label, value, icon: Icon, color }: StatCardProps) {
    return (
        <div className={`rounded-2xl p-5 ${color} flex items-center gap-4 border`}>
            <div className="p-3 bg-white rounded-xl shadow-sm">
                <Icon size={28} className="text-slate-700" />
            </div>
            <div>
                <p className="text-3xl font-bold text-slate-900">{value}</p>
                <p className="text-sm text-slate-500 font-medium mt-0.5">{label}</p>
            </div>
        </div>
    );
}

// Main Dashboard
export default function HRDashboard() {
    const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<Job | null>(null);
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState<JobStatus | "All">("All");
    const [filterDept, setFilterDept] = useState<Department | "All">("All");

    const openCreate = () => { setEditingJob(null); setModalOpen(true); };
    const openEdit = (job: Job) => { setEditingJob(job); setModalOpen(true); };
    const closeModal = () => { setModalOpen(false); setEditingJob(null); };

    const handleSave = (job: Job) => {
        setJobs((prev) => {
            const exists = prev.find((j) => j.id === job.id);
            return exists ? prev.map((j) => (j.id === job.id ? job : j)) : [job, ...prev];
        });
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Remove this job posting?")) {
            setJobs((prev) => prev.filter((j) => j.id !== id));
        }
    };

    const filtered = jobs.filter((j) => {
        const matchSearch = j.title.toLowerCase().includes(search.toLowerCase()) ||
            j.department.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === "All" || j.status === filterStatus;
        const matchDept = filterDept === "All" || j.department === filterDept;
        return matchSearch && matchStatus && matchDept;
    });

    const stats = {
        total: jobs.length,
        active: jobs.filter((j) => j.status === "Active").length,
        applicants: jobs.reduce((s, j) => s + j.applicants, 0),
        departments: new Set(jobs.map((j) => j.department)).size,
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Job Listings</h1>
                        <p className="text-slate-500 text-sm mt-1">Manage and publish open positions</p>
                    </div>
                    <button
                        onClick={openCreate}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#FFB502] hover:bg-[#FFB502]/90 text-white text-sm font-semibold rounded-xl shadow-sm transition-all"
                    >
                        <span className="text-lg leading-none">+</span> Post a Job
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <StatCard label="Total Listings" value={stats.total} icon={Briefcase} color="bg-white border border-slate-200" />
                    <StatCard label="Active Jobs" value={stats.active} icon={CheckCircle} color="bg-white border border-slate-200" />
                    <StatCard label="Total Applicants" value={stats.applicants} icon={Users} color="bg-white border border-slate-200" />
                    <StatCard label="Departments" value={stats.departments} icon={Building2} color="bg-white border border-slate-200" />
                </div>

                <div className="flex flex-wrap gap-3 mb-6">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search jobs or departments…"
                        className="flex-1 min-w-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB502] bg-white shadow-sm"
                    />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as JobStatus | "All")}
                        className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB502] bg-white shadow-sm"
                    >
                        {(["All", ...JOB_STATUSES] as const).map((s) => <option key={s}>{s}</option>)}
                    </select>
                    <select
                        value={filterDept}
                        onChange={(e) => setFilterDept(e.target.value as Department | "All")}
                        className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB502] bg-white shadow-sm"
                    >
                        <option value="All">All Departments</option>
                        {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
                    </select>
                </div>

                <p className="text-xs text-slate-400 mb-4 font-medium">
                    Showing {filtered.length} of {jobs.length} postings
                </p>

                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filtered.map((job) => (
                            <JobCard key={job.id} job={job} onEdit={openEdit} onDelete={handleDelete} />
                        ))}

                        <button
                            onClick={openCreate}
                            className="group flex flex-col items-center justify-center gap-3 h-full min-h-[260px] rounded-2xl border-2 border-dashed border-slate-200 hover:border-[#FFB502] hover:bg-[#FFB502]/5 transition-all"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-[#FFB502]/10 group-hover:bg-[#FFB502]/20 flex items-center justify-center text-2xl transition-colors text-[#FFB502]">
                                +
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-semibold text-slate-600 group-hover:text-[#FFB502] transition-colors">Add New Job</p>
                                <p className="text-xs text-slate-400 mt-0.5">Post another listing</p>
                            </div>
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        {/* <div className="text-5xl mb-4">🔍</div> */}
                        <h3 className="text-lg font-semibold text-slate-700">No jobs found</h3>
                        <p className="text-sm text-slate-400 mt-1 mb-5">Try adjusting your search or filters</p>
                        <button
                            onClick={openCreate}
                            className="px-5 py-2.5 bg-[#FFB502] text-white rounded-xl text-sm font-semibold hover:bg-[#FFB502]/90 transition-colors"
                        >
                            Post a Job
                        </button>
                    </div>
                )}
            </div>

            {modalOpen && <JobModal job={editingJob} onClose={closeModal} onSave={handleSave} />}
        </div>
    );
}
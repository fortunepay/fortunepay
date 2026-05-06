"use client";

import { useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { showSuccess, showError } from "@/lib/apiResponse";
import { USER_ROLES, type UserRole } from "@/lib/roles";
import { AdminUser} from "@/types/dashboardTypes";
import FormModal from "@/components/modals/FormModal";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { FormField, inputCls } from "@/components/forms/DashboardFormFields";
import { Plus, UserRoundX, RotateCcwKey, UserRoundCheck } from "@/components/icons/IconPacks";

const roleLabels: Record<UserRole, string> = {
    superadmin: "Super admin",
    hr: "HR",
    marketing: "Marketing",
    cs: "Customer service",
};

function formatDateTime(date?: string | Date | null) {
    if (!date) return "-";
    return new Date(date).toLocaleString("en-PH", {
        year: "numeric", month: "numeric", day: "numeric",
        hour: "numeric", minute: "2-digit", hour12: true,
    });
}

function formatDate(date?: string | Date | null) {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-PH", {
        year: "numeric", month: "numeric", day: "numeric",
    });
}

export default function UserRoleAccess() {
    const { data: session } = useSession();
    const currentUserId = session?.user?.id;

    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [savingId, setSavingId] = useState<string | null>(null);

    // CREATE USER MODAL
    const [createOpen, setCreateOpen] = useState(false);
    const [createName, setCreateName] = useState("");
    const [createEmail, setCreateEmail] = useState("");
    const [createPassword, setCreatePassword] = useState("");
    const [createRole, setCreateRole] = useState<UserRole>("hr");
    const [creating, setCreating] = useState(false);

    // RESET PASS MODAL
    const [resetUser, setResetUser] = useState<AdminUser | null>(null);
    const [resetPassword, setResetPassword] = useState("");
    const [resetting, setResetting] = useState(false);

    // CONFIRM DISABLE/DELETE MODAL
    const [confirmDisable, setConfirmDisable] = useState<AdminUser | null>(null);
    const [confirmEnable, setConfirmEnable] = useState<AdminUser | null>(null);
    const [pendingRoleChange, setPendingRoleChange] = useState<{ user: AdminUser; nextRole: UserRole } | null>(null);

    const sortedRoles = useMemo(() => [...USER_ROLES], []);

    const loadUsers = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/users");
            const data = await res.json();
            if (!res.ok) { showError(data.error ?? data.message ?? "Failed to load users."); return; }
            setUsers(data.users ?? []);
        } catch {
            showError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { void loadUsers(); }, [loadUsers]);

    function applyUserUpdate(responseData: unknown) {
        const json = responseData as { user?: Partial<AdminUser> };
        if (!json?.user) return;
        setUsers((prev) =>
            prev.map((u) => (u.id === json.user!.id ? { ...u, ...json.user } : u))
        );
    }

    function handleRoleChange(user: AdminUser, role: UserRole) {
        if (user.role === role) return;
        setPendingRoleChange({ user, nextRole: role });
    }

    function closeCreateModal() {
        setCreateOpen(false);
        setCreateName("");
        setCreateEmail("");
        setCreatePassword("");
        setCreateRole("hr");
    }

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        setCreating(true);
        try {
            const res = await fetch("/api/admin/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: createName, email: createEmail, password: createPassword, role: createRole }),
            });
            const data = await res.json();
            if (!res.ok) { showError(data.error ?? data.message ?? "Failed to create user."); return; }
            closeCreateModal();
            await loadUsers();
        } catch {
            showError("Network error. Please try again.");
        } finally {
            setCreating(false);
        }
    }

    function closeResetModal() {
        setResetUser(null);
        setResetPassword("");
    }

    async function handleResetPassword(e: React.FormEvent) {
        e.preventDefault();
        if (!resetUser) return;
        setResetting(true);
        try {
            const res = await fetch(`/api/admin/users/${resetUser.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: resetPassword }),
            });
            const data = await res.json();
            if (!res.ok) { showError(data.error ?? data.message ?? "Failed to reset password."); return; }
            showSuccess(data.message ?? "Password reset successfully.");
            closeResetModal();
        } catch {
            showError("Network error. Please try again.");
        } finally {
            setResetting(false);
        }
    }

    return (
        <>
            <section className="sm:p-1">
                <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-black">
                        <h2 className="text-xl font-semibold">User Access Control</h2>
                        <p className="mt-1 text-sm">View accounts, change roles, reset passwords, or disable access.</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setCreateOpen(true)}
                        className="inline-flex items-center gap-1.5 rounded-md bg-[#FFB502] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#FFB502]/80 focus:outline-none focus:ring-2"
                    >
                        <Plus size={14} />
                        Add user
                    </button>
                </div>

                <div className="relative w-full overflow-hidden shadow-md sm:rounded-lg">
                    <table className="w-full table-fixed text-left text-sm text-black">
                        <thead className="bg-gray-100 text-xs uppercase text-black">
                            <tr>
                                <th className="w-[14%] px-4 py-3">Created</th>
                                <th className="w-[28%] px-4 py-3">Email</th>
                                <th className="w-[16%] px-4 py-3">Role</th>
                                <th className="w-[12%] px-4 py-3">Status</th>
                                <th className="w-[18%] px-4 py-3">Last signed in</th>
                                <th className="w-[12%] px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr className="border-b bg-white">
                                    <td colSpan={6} className="px-4 py-8 text-center text-gray-400">Loading users…</td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr className="border-b bg-white">
                                    <td colSpan={6} className="px-4 py-8 text-center text-gray-400">No users found.</td>
                                </tr>
                            ) : (
                                users.map((user) => {
                                    const isSelf = user.id === currentUserId;
                                    const busy = savingId === user.id;

                                    return (
                                        <tr key={user.id} className="bg-white hover:bg-gray-50 transition">
                                            <td className="px-4 py-3 text-gray-600 wrap-break-word">{formatDate(user.createdAt)}</td>
                                            <td className="px-4 py-3 text-gray-600 wrap-break-word">{user.email}</td>

                                            <td className="px-4 py-3">
                                                <select
                                                    className="block w-full rounded-lg border border-gray-300 bg-white p-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                                                    value={pendingRoleChange?.user.id === user.id ? pendingRoleChange.nextRole : user.role}
                                                    disabled={busy || (isSelf && user.role === "superadmin")}
                                                    onChange={(e) => {
                                                        const next = e.target.value as UserRole;
                                                        if (!sortedRoles.includes(next)) { showError("Invalid role"); return; }
                                                        handleRoleChange(user, next);
                                                    }}
                                                >
                                                    {sortedRoles.map((r) => (
                                                        <option key={r} value={r}>{roleLabels[r]}</option>
                                                    ))}
                                                </select>
                                            </td>

                                            <td className="px-4 py-3">
                                                <span className={`rounded-md px-2.5 py-0.5 text-xs font-medium ${user.disabled ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                                                    {user.disabled ? "Disabled" : "Active"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-gray-600 wrap-break-word">{formatDateTime(user.lastSignedInAt)}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <Tooltip label="Reset Password">
                                                        <button
                                                            type="button"
                                                            disabled={busy}
                                                            onClick={() => { setResetUser(user); setResetPassword(""); }}
                                                            className="p-2 text-black disabled:opacity-50"
                                                        >
                                                            <RotateCcwKey size={22} />
                                                        </button>
                                                    </Tooltip>
                                                    <Tooltip label={user.disabled ? "Enable" : "Disable"}>
                                                        <button
                                                            type="button"
                                                            disabled={busy || isSelf}
                                                            onClick={() => user.disabled ? setConfirmEnable(user) : setConfirmDisable(user)}
                                                            className="p-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                        >
                                                            {user.disabled
                                                                ? <UserRoundCheck size={22} className="text-green-600 hover:text-green-700" />
                                                                : <UserRoundX size={22} className="text-red-600 hover:text-red-700" />
                                                            }
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* MODALS */}
            {createOpen && (
                <FormModal
                    title="Create User"
                    isBusy={creating}
                    submitLabel="Create User"
                    pendingLabel="Creating…"
                    onClose={closeCreateModal}
                    onSubmit={handleCreate}
                >
                    <FormField label="Name" required>
                        <input value={createName} onChange={(e) => setCreateName(e.target.value)} required className={inputCls(false)} />
                    </FormField>
                    <FormField label="Email" required>
                        <input type="email" value={createEmail} onChange={(e) => setCreateEmail(e.target.value)} required className={inputCls(false)} />
                    </FormField>
                    <FormField label="Password" required>
                        <input type="password" placeholder="At least 8 characters" minLength={8} value={createPassword} onChange={(e) => setCreatePassword(e.target.value)} required className={inputCls(false)} />
                    </FormField>
                    <FormField label="User Role" required>
                        <select value={createRole} onChange={(e) => setCreateRole(e.target.value as UserRole)} className={inputCls(false)}>
                            {sortedRoles.map((r) => <option key={r} value={r}>{roleLabels[r]}</option>)}
                        </select>
                    </FormField>
                </FormModal>
            )}

            {resetUser && (
                <FormModal
                    title={`Reset Password for ${resetUser.email}`}
                    isBusy={resetting}
                    submitLabel="Save Password"
                    pendingLabel="Saving…"
                    onClose={closeResetModal}
                    onSubmit={handleResetPassword}
                >
                    {/* <p className="text-sm text-gray-500">
                        Set a new password for <span className="font-semibold text-gray-800">{resetUser.email}</span>.
                    </p> */}
                    <FormField label="New Password" required>
                        <input
                            type="password"
                            placeholder="At least 8 characters"
                            minLength={8}
                            autoFocus
                            required
                            value={resetPassword}
                            onChange={(e) => setResetPassword(e.target.value)}
                            className={inputCls(false)}
                        />
                    </FormField>
                </FormModal>
            )}

            {confirmDisable && (
                <ConfirmModal
                    title="Disable User"
                    description={`Disable access for "${confirmDisable.email}"? They won't be able to sign in.`}
                    endpoint={`/api/admin/users/${confirmDisable.id}`}
                    method="PATCH"
                    body={{ disabled: true }}
                    confirmLabel="Yes, disable"
                    confirmColor="red"
                    successMessage="User disabled."
                    onSuccess={applyUserUpdate}
                    onClose={() => setConfirmDisable(null)}
                />
            )}

            {confirmEnable && (
                <ConfirmModal
                    title="Enable User"
                    description={`Restore access for "${confirmEnable.email}"?`}
                    endpoint={`/api/admin/users/${confirmEnable.id}`}
                    method="PATCH"
                    body={{ disabled: false }}
                    confirmLabel="Yes, enable"
                    confirmColor="green"
                    successMessage="User enabled."
                    onSuccess={applyUserUpdate}
                    onClose={() => setConfirmEnable(null)}
                />
            )}

            {pendingRoleChange && (
                <ConfirmModal
                    title="Change Role"
                    description={`Change role of "${pendingRoleChange.user.email}" to ${roleLabels[pendingRoleChange.nextRole]}?`}
                    endpoint={`/api/admin/users/${pendingRoleChange.user.id}`}
                    method="PATCH"
                    body={{ role: pendingRoleChange.nextRole }}
                    confirmLabel="Yes, change role"
                    confirmColor="yellow"
                    successMessage="Role updated."
                    onSuccess={applyUserUpdate}
                    onClose={() => setPendingRoleChange(null)}
                />
            )}
        </>
    );
}

function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="relative group inline-block">
            {children}
            <div className="absolute left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white z-10">
                {label}
                <div className="absolute left-1/2 -translate-x-1/2 -top-1 h-2 w-2 rotate-45 bg-black" />
            </div>
        </div>
    );
}
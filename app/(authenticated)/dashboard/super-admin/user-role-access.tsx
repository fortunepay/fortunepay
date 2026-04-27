'use client';

import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { handleApiError, handleApiResponse, showError } from '@/lib/apiResponse';
import { USER_ROLES, type UserRole } from '@/lib/roles';
import { Plus, UserRoundX, RotateCcwKey, UserRoundCheck } from '@/components/icons/IconPacks';
import { DashboardModal, DashboardModalActions } from '@/components/modals/DashboardModal';

type AdminUser = {
    id: string;
    name?: string | null;
    email: string;
    role: UserRole;
    disabled: boolean;
    createdAt?: string;
    lastSignedInAt?: string | null;
};

const roleLabels: Record<UserRole, string> = {
    superadmin: 'Super admin',
    hr: 'HR',
    marketing: 'Marketing',
    cs: 'Customer service',
};

function formatDateTime(date?: string | Date | null) {
    if (!date) return "-";

    return new Date(date).toLocaleString("en-PH", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
}

function formatDate(date?: string | Date | null) {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-PH", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });
}

export default function UserRoleAccess() {
    const { data: session } = useSession();
    const currentUserId = session?.user?.id;

    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [savingId, setSavingId] = useState<string | null>(null);

    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [createName, setCreateName] = useState('');
    const [createEmail, setCreateEmail] = useState('');
    const [createPassword, setCreatePassword] = useState('');
    const [createRole, setCreateRole] = useState<UserRole>('hr');
    const [creating, setCreating] = useState(false);

    const [resetUser, setResetUser] = useState<AdminUser | null>(null);
    const [resetPassword, setResetPassword] = useState('');
    const [resetting, setResetting] = useState(false);

    const [confirmActionUser, setConfirmActionUser] = useState<AdminUser | null>(null);
    const [confirmActionType, setConfirmActionType] = useState<'enable' | 'disable' | null>(null);

    const [pendingRoleChange, setPendingRoleChange] = useState<{
        user: AdminUser;
        nextRole: UserRole;
    } | null>(null);

    const loadUsers = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/users');
            const data = await res.json();
            if (!res.ok) {
                handleApiResponse(data);
                return;
            }
            setUsers(data.users ?? []);
        } catch (e) {
            handleApiError(e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void loadUsers();
    }, [loadUsers]);

    const sortedRoles = useMemo(() => [...USER_ROLES], []);

    const patchUser = async (id: string, body: Record<string, unknown>) => {
        setSavingId(id);
        try {
            const res = await fetch(`/api/admin/users/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const data = await res.json();
            if (!res.ok) {
                handleApiResponse(data);
                return;
            }
            handleApiResponse(data);
            setUsers((prev) =>
                prev.map((u) => (u.id === id ? { ...u, ...data.user } : u)),
            );
        } catch (e) {
            handleApiError(e);
        } finally {
            setSavingId(null);
        }
    };

    const confirmRoleChange = async () => {
        if (!pendingRoleChange) return;

        await patchUser(pendingRoleChange.user.id, {
            role: pendingRoleChange.nextRole,
        });

        setPendingRoleChange(null);
    };

    const cancelRoleChange = () => {
        setPendingRoleChange(null);
    };

    const handleRoleChange = (user: AdminUser, role: UserRole) => {
        if (user.role === role) return;

        setPendingRoleChange({
            user,
            nextRole: role,
        });
    };

    const handleToggleDisabled = (user: AdminUser) => {
        const nextDisabled = !user.disabled;
        setConfirmActionUser(user);
        setConfirmActionType(nextDisabled ? 'disable' : 'enable');
    };

    const confirmToggleDisabled = async () => {
        if (!confirmActionUser || !confirmActionType) return;

        const newDisabledState = confirmActionType === 'disable';

        await patchUser(confirmActionUser.id, { disabled: newDisabledState });

        setConfirmActionUser(null);
        setConfirmActionType(null);
    };

    const cancelToggleDisabled = () => {
        setConfirmActionUser(null);
        setConfirmActionType(null);
    };

    const closeCreateModal = () => {
        setCreateModalOpen(false);
        setCreateName('');
        setCreateEmail('');
        setCreatePassword('');
        setCreateRole('hr');
    };

    const closeResetModal = () => {
        setResetUser(null);
        setResetPassword('');
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);
        try {
            const res = await fetch('/api/admin/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: createName,
                    email: createEmail,
                    password: createPassword,
                    role: createRole,
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                handleApiResponse(data);
                return;
            }
            handleApiResponse(data);
            closeCreateModal();
            await loadUsers();
        } catch (err) {
            handleApiError(err);
        } finally {
            setCreating(false);
        }
    };

    const submitResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!resetUser) return;
        setResetting(true);
        try {
            const res = await fetch(`/api/admin/users/${resetUser.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: resetPassword }),
            });
            const data = await res.json();
            if (!res.ok) {
                handleApiResponse(data);
                return;
            }
            handleApiResponse(data);
            setResetUser(null);
            setResetPassword('');
        } catch (err) {
            handleApiError(err);
        } finally {
            setResetting(false);
        }
    };

    return (
        <>
            <section className="sm:p-1">
                <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-black">
                        <h2 className="text-xl font-semibold">
                            User Access Control
                        </h2>
                        <p className="mt-1 text-sm">
                            View accounts, change roles, reset passwords, or disable access.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setCreateModalOpen(true)}
                        className="inline-flex items-center gap-1.5 rounded-md bg-[#FFB502] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#FFB502]/80 focus:outline-none focus:ring-2 cursor-pointer"
                    >
                        <Plus size={14} />
                        Add user
                    </button>
                </div>

                <div className="relative w-full overflow-hidden shadow-md sm:rounded-lg">
                    <table className="w-full table-fixed text-left text-sm text-black rtl:text-right">
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
                                    <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                                        Loading users…
                                    </td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr className="border-b bg-white">
                                    <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => {
                                    const isSelf = user.id === currentUserId;
                                    const busy = savingId === user.id;
                                    const displayName =
                                        user.name?.trim() || user.email.split("@")[0];

                                    return (
                                        <tr
                                            key={user.id}
                                            className=" bg-white hover:bg-gray-50 transition"
                                        >
                                            <td className="px-4 py-3 text-gray-600 wrap-break-word">
                                                {formatDate(user.createdAt)}
                                            </td>

                                            <td className="px-4 py-3 text-gray-600 wrap-break-word">
                                                {user.email}
                                            </td>

                                            <td className="px-4 py-3">
                                                <select
                                                    className="block w-full rounded-lg border border-gray-300 bg-white p-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                                                    // value={user.role}
                                                    value={
                                                        pendingRoleChange?.user.id === user.id
                                                            ? pendingRoleChange.nextRole
                                                            : user.role
                                                    }
                                                    disabled={busy || (isSelf && user.role === "superadmin")}
                                                    onChange={(e) => {
                                                        const next = e.target.value as UserRole;
                                                        if (!sortedRoles.includes(next)) {
                                                            showError("Invalid role");
                                                            return;
                                                        }
                                                        handleRoleChange(user, next);
                                                    }}
                                                >
                                                    {sortedRoles.map((r) => (
                                                        <option key={r} value={r}>
                                                            {roleLabels[r]}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>

                                            <td className="px-4 py-3">
                                                <span
                                                    className={`rounded-md px-2.5 py-0.5 text-xs font-medium ${user.disabled
                                                        ? "bg-red-100 text-red-600"
                                                        : "bg-green-100 text-green-600"
                                                        }`}
                                                >
                                                    {user.disabled ? "Disabled" : "Active"}
                                                </span>
                                            </td>

                                            <td className="px-4 py-3 text-gray-600 wrap-break-word">
                                                {formatDateTime(user.lastSignedInAt)}
                                            </td>

                                            <td className="px-4 py-3">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <div className="relative group inline-block">
                                                        <button
                                                            type="button"
                                                            disabled={busy}
                                                            onClick={() => {
                                                                setResetUser(user);
                                                                setResetPassword("");
                                                            }}
                                                            className="p-2 text-black disabled:opacity-50 cursor-pointer"
                                                        >
                                                            <RotateCcwKey size={22} />
                                                        </button>

                                                        <div className="absolute left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white">
                                                            Reset Password

                                                            <div className="absolute left-1/2 -translate-x-1/2 -top-1 h-2 w-2 rotate-45 bg-black"></div>
                                                        </div>
                                                    </div>

                                                    <div className="relative group inline-block">
                                                        <button
                                                            type="button"
                                                            disabled={busy || isSelf}
                                                            onClick={() => handleToggleDisabled(user)}
                                                            className="p-1 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                                                        >
                                                            {user.disabled ? (
                                                                <UserRoundCheck size={22} className="text-green-600 hover:text-green-700" />
                                                            ) : (
                                                                <UserRoundX size={22} className="text-red-600 hover:text-red-700" />
                                                            )}
                                                        </button>

                                                        {/* Tooltip */}
                                                        <div className="absolute left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white">
                                                            {user.disabled ? "Enable" : "Disable"}

                                                            {/* Arrow */}
                                                            <div className="absolute left-1/2 -translate-x-1/2 -top-1 h-2 w-2 rotate-45 bg-black"></div>
                                                        </div>
                                                    </div>
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

            {createModalOpen && (
                <DashboardModal
                    id="create-user-modal-title"
                    title="Create user"
                    isBusy={creating}
                    onClose={closeCreateModal}
                >
                    <form onSubmit={handleCreate} className="p-4 md:p-5">
                        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="create-name"
                                    className="mb-2 block text-sm font-medium text-black"
                                >
                                    Name
                                </label>
                                <input
                                    id="create-name"
                                    required
                                    className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-black 
                  focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none"

                                    value={createName}
                                    onChange={(e) => setCreateName(e.target.value)}
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-black">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-black 
                  focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none"                  value={createEmail}
                                    onChange={(e) => setCreateEmail(e.target.value)}
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-black">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    required
                                    placeholder="At least 8 characters"
                                    minLength={8}
                                    className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-black 
                  focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                                    value={createPassword}
                                    onChange={(e) => setCreatePassword(e.target.value)}
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="create-role"
                                    className="mb-2 block text-sm font-medium text-black"
                                >
                                    User Role
                                </label>
                                <select
                                    id="create-role"
                                    className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-black 
                  focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                                    value={createRole}
                                    onChange={(e) => setCreateRole(e.target.value as UserRole)}
                                >
                                    {sortedRoles.map((r) => (
                                        <option key={r} value={r}>
                                            {roleLabels[r]}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <DashboardModalActions
                            isBusy={creating}
                            onCancel={closeCreateModal}
                            submitLabel="Create user"
                            pendingLabel="Creating…"
                        />
                    </form>
                </DashboardModal>
            )}

            {resetUser && (
                <DashboardModal
                    id="reset-password-modal-title"
                    title="Reset password"
                    isBusy={resetting}
                    onClose={closeResetModal}
                >
                    <form onSubmit={submitResetPassword} className="p-4 md:p-5">
                        <p className="mb-4 text-sm text-gray-700">
                            Set a new password for{' '}
                            <span className="font-bold text-gray-900">{resetUser.email}</span>.
                        </p>
                        <div className="mb-4">
                            <input
                                id="reset-password-input"
                                required
                                type="password"
                                placeholder="New password"
                                minLength={8}
                                autoFocus
                                className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-black 
                focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:outline-none"                value={resetPassword}
                                onChange={(e) => setResetPassword(e.target.value)}
                            />
                        </div>
                        <DashboardModalActions
                            isBusy={resetting}
                            onCancel={closeResetModal}
                            submitLabel="Save password"
                            pendingLabel="Saving…"
                        />
                    </form>
                </DashboardModal>
            )}

            {((confirmActionUser && confirmActionType) || pendingRoleChange) && (
                (() => {
                    const isRoleChange = !!pendingRoleChange;
                    const targetUser = pendingRoleChange?.user ?? confirmActionUser;

                    return (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <button
                                type="button"
                                className="fixed inset-0 bg-gray-900/80"
                                onClick={isRoleChange ? cancelRoleChange : cancelToggleDisabled}
                            />

                            <div className="relative z-10 w-full max-w-md">
                                <div className="rounded-lg bg-white p-5 text-center shadow">
                                    <svg
                                        className="mx-auto mb-4 h-12 w-12 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                        />
                                    </svg>

                                    <h3 className="mb-2 text-lg text-gray-600">
                                        {isRoleChange
                                            ? 'Change user role?'
                                            : confirmActionType === 'disable'
                                                ? 'Disable user?'
                                                : 'Enable user?'}
                                    </h3>

                                    <p className="mb-4 text-sm text-gray-500">
                                        {isRoleChange ? (
                                            <>
                                                Change role of{' '}
                                                <span className="font-semibold text-gray-900">
                                                    {targetUser?.email}
                                                </span>
                                                ?
                                            </>
                                        ) : (
                                            <>
                                                {confirmActionType} access for{' '}
                                                <span className="font-semibold text-gray-900">
                                                    {targetUser?.email}
                                                </span>
                                                ?
                                            </>
                                        )}
                                    </p>

                                    <div className="flex justify-center gap-3">
                                        <button
                                            onClick={isRoleChange ? cancelRoleChange : cancelToggleDisabled}
                                            className="rounded-lg border px-4 py-2 text-sm"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            onClick={isRoleChange ? confirmRoleChange : confirmToggleDisabled}
                                            disabled={
                                                isRoleChange
                                                    ? savingId === pendingRoleChange?.user.id
                                                    : savingId === confirmActionUser?.id
                                            }
                                            className={`rounded-lg px-4 py-2 text-sm text-white ${isRoleChange
                                                ? 'bg-blue-600 hover:bg-blue-700'
                                                : confirmActionType === 'disable'
                                                    ? 'bg-red-600 hover:bg-red-700'
                                                    : 'bg-green-600 hover:bg-green-700'
                                                }`}
                                        >
                                            {isRoleChange
                                                ? 'Yes, change role'
                                                : confirmActionType === 'disable'
                                                    ? 'Yes, disable'
                                                    : 'Yes, enable'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })()
            )}
        </>
    );
}
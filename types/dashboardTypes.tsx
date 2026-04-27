import type { ReactNode } from 'react';

export type DashboardModalProps = {
    id: string;
    title: string;
    isBusy?: boolean;
    onClose: () => void;
    children: ReactNode;
};

export type DashboardModalActionsProps = {
    isBusy?: boolean;
    onCancel: () => void;
    submitLabel: string;
    pendingLabel: string;
};
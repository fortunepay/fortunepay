import type { ReactNode } from 'react';
import { UserRole } from '@/lib/roles';

// ALL COMPONENTS TYPE
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

    export type AdminUser = {
        id: string;
        name?: string | null;
        email: string;
        role: UserRole;
        disabled: boolean;
        createdAt?: string;
        lastSignedInAt?: string | null;
    };
    
// END COMPONENTS TYPE

// ALL DATA DASHBOARD TYPES
    export type EventCategory = "News" | "Promo" | "Event";

    export type EventItem = {
        _id: string;
        category: EventCategory;
        title: string;
        description: string;
        startDate: string;
        endDate: string;
        bannerImage: string;
        createdAt: string;
    }
// END DATA DASHBOARD TYPES

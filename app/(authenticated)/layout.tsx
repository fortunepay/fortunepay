import type { Metadata } from 'next';
import DashboardClient from '@/app/providers/dashboardLayout';
export const metadata: Metadata = {
    title: { default: 'Dashboard', template: '' },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <DashboardClient>{children}</DashboardClient>
    );
}
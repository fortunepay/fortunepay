'use client';

import { useState, Suspense } from 'react';
import AdminAside from '@/components/navigations/AdminAside';
import { useAuth } from '@/hooks/useAuth';
import { SessionProvider } from 'next-auth/react';

function DashboardInner({ children }: { children: React.ReactNode }) {
    useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <main className="flex min-h-screen bg-gray-50">
            <AdminAside sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div
                className="ml-0 flex-1 p-6 pt-16 transition-all duration-300 sm:ml-64 sm:pt-6"
            >
                {children}
            </div>
        </main>
    );
}

export default function DashboardClient({ children }: { children: React.ReactNode }) {
    return (
        <Suspense>
            <SessionProvider refetchInterval={45 * 1000}>
                <DashboardInner>{children}</DashboardInner>
            </SessionProvider>
        </Suspense>
    );
}
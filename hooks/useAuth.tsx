'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import { showSuccess } from '@/lib/apiResponse';
import { useSearchParams } from 'next/navigation';

export function useAuth() {
    const { data: session, status } = useSession();
    const searchParams = useSearchParams();
    const hasShown = useRef(false);

    useEffect(() => {
        if (status === 'loading') return;
        if (!session) return;
        if (searchParams.get('login') !== 'true') return;
        if (hasShown.current) return;

        hasShown.current = true;
        showSuccess(`Welcome back, ${session.user.name ?? session.user.email}!`);
        window.history.replaceState({}, '', '/dashboard');
    }, [session, status, searchParams.toString()]);

    return {
        session,
        status,
        user: session?.user,
        role: session?.user?.role,
        isAuthenticated: !!session,
    };
}

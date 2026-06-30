'use client';

import { signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { showSuccess, showError } from '@/lib/apiResponse';

export default function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const raw = sessionStorage.getItem('pendingToast');
        if (!raw) return;

        const { type, message } = JSON.parse(raw);

        sessionStorage.removeItem('pendingToast');

        const timer = setTimeout(() => {
            type === 'success'
                ? showSuccess(message)
                : showError(message);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const err = searchParams.get('error');

        if (err === 'AccessDenied') {
            showError(
                'Your account has been disabled. Contact a staff memberw31.'
            );

            const next = new URLSearchParams(searchParams.toString());

            next.delete('error');

            const qs = next.toString();

            router.replace(qs ? `/login?${qs}` : '/login');
        }
    }, [router, searchParams]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                showError(res.error);
                return;
            }

            router.push('/dashboard?login=true');
        } catch (err: any) {
            showError(err?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleLogin}
            className="w-full flex flex-col justify-center h-full py-12 space-y-6"
        >
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-blue-700">
                    Get Back to Work.
                </h1>

                <p className="text-sm text-gray-500">
                    Enter your credentials to continue
                </p>
            </div>

            <div className="space-y-4">
                <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border border-gray-200 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />

                <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full border border-gray-200 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition text-sm"
            >
                {loading ? 'Please wait...' : 'SIGN IN'}
            </button>
        </form>
    );
}
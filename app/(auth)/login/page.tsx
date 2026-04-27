'use client';

import { signIn } from 'next-auth/react';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {showSuccess, showError} from '@/lib/apiResponse';

function LoginForm() {
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
            type === 'success' ? showSuccess(message) : showError(message);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const err = searchParams.get('error');
        if (err === 'AccessDenied') {
            showError('Your account has been disabled. Contact a super-admin.');
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
            className="w-full max-w-sm px-8 py-10 bg-white rounded-2xl shadow-2xl space-y-6"
        >
            <div className="space-y-1 text-center">
                <h1 className="text-2xl font-bold text-gray-900">Sign in</h1>
                <p className="text-sm text-gray-500">Enter your credentials to continue</p>
            </div>

            <div className="space-y-4">
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full border border-gray-200 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full border border-gray-200 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition text-sm"
            >
                {loading ? 'Signing in...' : 'Sign in'}
            </button>
        </form>
    );
}

export default function LoginPage() {
    return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #0a1a8f 75%, #feda3f 25%)' }}
        >
            <Suspense>
                <LoginForm />
            </Suspense>
        </div>
    );
}
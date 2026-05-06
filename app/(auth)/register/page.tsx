'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        role: 'superadmin',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            alert('User registered successfully');
            router.push('/login');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md rounded-xl bg-white p-6 shadow"
            >
                <h1 className="mb-4 text-2xl font-bold">Register</h1>

                {error && (
                    <p className="mb-3 rounded bg-red-100 p-2 text-sm text-red-600">
                        {error}
                    </p>
                )}

                <input
                    name="name"
                    placeholder="Name"
                    className="mb-3 w-full rounded border p-2"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="mb-3 w-full rounded border p-2"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="mb-3 w-full rounded border p-2"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <select
                    name="role"
                    className="mb-4 w-full rounded border p-2"
                    value={form.role}
                    onChange={handleChange}
                >
                    <option value="superadmin">Super Admin</option>
                    <option value="hr">HR</option>
                    <option value="marketing">Marketing</option>
                    <option value="cs">Customer Support</option>
                </select>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
}
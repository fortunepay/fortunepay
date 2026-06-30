import Image from 'next/image';
import { Suspense } from 'react';

import LoginForm from '@/components/forms/LoginForm';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex">
            <div className="w-full lg:w-1/2 bg-white flex items-center justify-center">
                <div className="w-full max-w-sm xl:max-w-lg px-6">
                    <Suspense>
                        <LoginForm />
                    </Suspense>
                </div>
            </div>

            <div className="relative w-1/2 hidden lg:block">
                <Image
                    src="/backgrounds/login_bg.webp"
                    alt="Login Background"
                    fill
                    priority
                    sizes="auto"
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-black/20" />
            </div>
        </div>
    );
}
import type { Metadata } from 'next';
import Providers from '@/app/providers/layoutProvider';

export const metadata: Metadata = {
    title: 'Login',
    description: 'Login to your account',
    robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <Providers>{children}</Providers>
    );
}
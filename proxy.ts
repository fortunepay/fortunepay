import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    if (pathname.startsWith('/login')) {
      if (token) return NextResponse.redirect(new URL('/dashboard', req.url));
      return NextResponse.next();
    }

    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    const verifyUrl = new URL('/api/auth/verify', req.url);
    const verifyRes = await fetch(verifyUrl, {
      headers: { cookie: req.headers.get('cookie') ?? '' },
    });

    if (!verifyRes.ok) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    const verifyBody = (await verifyRes.json()) as { disabled?: boolean };
    if (verifyBody.disabled) {
      const login = new URL('/login', req.url);
      login.searchParams.set('error', 'AccessDenied');
      return NextResponse.redirect(login);
    }

    const role = token?.role as string | undefined;

    if (
      pathname.startsWith('/dashboard/super-admin') &&
      role !== 'superadmin'
    ) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    if (role === 'superadmin') return NextResponse.next();

    const roleRoutes: Record<string, string[]> = {
      hr: ['/dashboard', '/dashboard/hr'],
      marketing: ['/dashboard', '/dashboard/marketing'],
      cs: ['/dashboard', '/dashboard/customer-service'],
    };

    const allowed = roleRoutes[role ?? ''] ?? [];
    const isAllowed = allowed.some(
      (route) => route === pathname || pathname.startsWith(route + '/'),
    );

    if (!isAllowed) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  },
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/marketing/:path*',
    '/hr/:path*',
    '/customer-service/:path*',
    '/super-admin/:path*',
    '/login',
  ],
};

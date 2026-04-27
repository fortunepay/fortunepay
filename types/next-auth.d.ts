import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: 'superadmin' | 'marketing' | 'cs' | 'hr';
      disabled?: boolean;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    role: 'superadmin' | 'marketing' | 'cs' | 'hr';
    disabled?: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'superadmin' | 'marketing' | 'cs' | 'hr';
    disabled?: boolean;
    lastDbCheck?: number;
  }
}

import { DefaultSession } from 'next-auth';
import type { UserRole } from '../lib/roles.js';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      disabled?: boolean;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    role: UserRole;
    disabled?: boolean;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: UserRole;
    disabled?: boolean;
    lastDbCheck?: number;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

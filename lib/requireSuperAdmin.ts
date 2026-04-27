import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function requireSuperAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== 'superadmin') {
    return null;
  }
  return session;
}

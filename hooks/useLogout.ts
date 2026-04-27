'use client';

import { signOut } from 'next-auth/react';

export function useLogout() {
  const logout = async () => {
    sessionStorage.setItem(
      'pendingToast',
      JSON.stringify({
        type: 'success',
        message: 'Logged out successfully',
      }),
    );
    await signOut({ redirect: true, callbackUrl: '/login' });
  };

  return { logout };
}

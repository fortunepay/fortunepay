import { ReactNode } from 'react';
import Providers from '@/app/providers/layoutProvider';
import UserNavbar from '@/components/navigations/UserNavbar';

export default function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <UserNavbar />
      <Providers>{children}</Providers>
    </>
  );
}
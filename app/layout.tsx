import localFont from 'next/font/local';
import { ReactNode } from 'react';
import Providers from './providers/layoutProvider';
import { Metadata } from 'next';
import "./global.css";

export const metadata: Metadata = {
  title: {
    default: "FortunePay",
    template: "%s | FortunePay",
  },
  description: "FortunePay - Your Financial Partner",
};

const gotham = localFont({
  src: [
    { path: './fonts/Gotham-Book.otf', weight: '400' },
    { path: './fonts/Gotham-Bold.otf', weight: '700' },
  ],
  variable: '--font-gotham',
})

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={gotham.variable}>
      <body className={gotham.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
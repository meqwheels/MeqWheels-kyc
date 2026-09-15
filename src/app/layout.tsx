import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MEQ WHEELS — Rental Counter KYC Portal',
  description: 'Internal rental counter portal for MEQ WHEELS bike rentals with DigiLocker KYC verification.',
};

export const viewport: Viewport = {
  themeColor: '#08080C',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#08080C] text-neutral-100 selection:bg-orange-500 selection:text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

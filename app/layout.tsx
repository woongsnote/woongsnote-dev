import './globals.css';
import type { Metadata } from 'next';
import BaseLayout from './layouts/BaseLayout';
import localFont from 'next/font/local';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.woongsnote.dev'),
  title: {
    default: 'Woongsnote',
    template: '%s | Woongsnote',
  },
  authors: [{ name: 'woongsnote' }],
  description: 'Tech Blog by Woongsnote',
  applicationName: "Woong's Tech Blog",
  generator: 'Next.js',
  keywords: ['Next.js', 'React', 'TypeScript', 'Web', 'Frontend'],
  themeColor: '#4a90e2',
  manifest: '/manifest.json',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Woongsnote',
    description: 'Tech Blog by Woongsnote',
    url: 'https://www.woongsnote.dev',
    siteName: "Woong's Tech Blog",
    locale: 'ko-KR',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: "Woong's Tech Blog",
      },
    ],
  },
};

const inter = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${inter.variable}`} suppressHydrationWarning>
      <body>
        <BaseLayout>{children}</BaseLayout>
      </body>
    </html>
  );
}

import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Providers from './components/Providers';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BottomNav } from './components/Nav';

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
        <Providers>
          <Header />
          <main className="mx-auto pb-28 px-2 max-w-5xl relative md:pb-16">
            {children}
          </main>
          <Footer />
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}

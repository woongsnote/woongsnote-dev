import './globals.css';
import { Metadata } from 'next';
import localFont from 'next/font/local';
import Providers from './providers';
import { Header, Footer } from '@/components';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.woongsnote.dev'),
  title: {
    default: 'woongsnote.dev',
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

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <Header />
          <main className="mx-auto pb-10 container px-2 lg:px-0 relative max-w-5xl min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

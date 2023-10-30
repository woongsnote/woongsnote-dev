import '@/app/ui/globals.css';
import { Metadata } from 'next';
import { Providers } from '@/app/providers';
import { Header, Footer } from '@/app/ui/layout';
import { pretendard } from '@/app/ui/fonts';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        <Providers>
          <Header />
          <main className="mx-auto container px-0 my-0 flex flex-grow flex-col">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

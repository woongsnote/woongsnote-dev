import "./globals.css";
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Container from "./layouts/Container";

export const metadata: Metadata = {
  title: {
    default: "Woongsnote",
    template: "%s | Woongsnote",
  },
  description: "NextJs Tech Blog by Woongsnote",
  applicationName: "Woongsnote",
  generator: "Next.js",
  keywords: ["Next.js", "React", "TypeScript", "Web", "Frontend"],
  themeColor: "#4a90e2",
  manifest: "/manifest.json",
  openGraph: {
    title: "Woongsnote",
    description: "NextJs Tech Blog by Woongsnote",
    url: "https://woongsnote.dev",
    siteName: "Woongsnote",
    locale: "ko-KR",
    type: "website",
  },
};

const inter = Noto_Sans_KR({
  subsets: ["latin"],
  display: "auto",
  weight: "300",
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${inter.variable}`} suppressHydrationWarning>
      <body>
        <Container>{children}</Container>
      </body>
    </html>
  );
}

import "./globals.css";

export const metadata = {
  title: {
    template: '%s | Woongsnote',
    default: 'Woongsnote',
  },
  description: "NextJs Tech Blog by Woongsnote",
  applicationName: "Woongsnote",
  generator: "Next.js",
  keywords: ['Next.js','React','TypeScript','Web','Frontend'],
  themeColor: "#4a90e2",
  manifest: "/manifest.json",

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

import "styles/globals.css";
import type { AppProps } from "next/app";
import Meta from "components/Meta";
import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";
import { Inter } from "next/font/google";
import BottomNav from "@/components/BottomNav";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Meta />
      <ThemeProvider attribute="class">
        <Header />
        <main
          className={`${inter.variable} font-sans mx-auto pt-16 md:px-8 pb-28 md:pb-16 px-2 relative max-w-5xl`}>
          <Component {...pageProps} />
        </main>
        <BottomNav />
      </ThemeProvider>
    </>
  );
}

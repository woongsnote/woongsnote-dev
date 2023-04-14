"use client";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import BottomNav from "./BottomNav";
import Header from "./Header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class">
      <Header />
      <main
        className={`${inter.variable} font-sans mx-auto pb-28 md:pb-16 px-2 relative max-w-5xl`}>
        {children}
      </main>
      <BottomNav />
    </ThemeProvider>
  );
};

export default Container;

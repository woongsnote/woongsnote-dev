import Head from "next/head";
import Header from "./Header";
import BottomNav from "./BottomNav";
import { Inter } from "next/font/google";

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      {title ? (
        <Head>
          <title>Woongsnote | {title}</title>
        </Head>
      ) : null}
      <Header />
      <main className={`${inter.variable} font-sans`}>{children}</main>
      <BottomNav />
    </>
  );
};

export default Layout;

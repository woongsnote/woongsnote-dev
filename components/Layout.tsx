import Header from "./Header";
import BottomNav from "./BottomNav";
import { Inter } from "next/font/google";

interface LayoutProps {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main className={`${inter.variable} font-sans`}>{children}</main>
      <BottomNav />
    </>
  );
};

export default Layout;

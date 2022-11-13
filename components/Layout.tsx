import Head from "next/head";
import { ReactNode } from "react";
import Footer from "./Footer";
import AppBar from "./appbar";
import BottomNav from "./bottom-nav";

interface MyComponentProps {
  title?: string;
  children: ReactNode;
}
const Layout = ({ title, children }: MyComponentProps) => {
  return (
    <>
      {title ? (
        <Head>
          <title>Woongsnote | {title}</title>
        </Head>
      ) : null}

      <AppBar />
      <main className="pt-10 relative mx-auto container max-w-screen-md pb-20 px-2 lg:px-0">
        {children}
      </main>
      <BottomNav />
    </>
  );
};

export default Layout;

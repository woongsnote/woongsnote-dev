import Head from "next/head";

import NavBar from "./NavBar";
import BottomNav from "./BottomNav";

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      {title ? (
        <Head>
          <title>Woongsnote | {title}</title>
        </Head>
      ) : null}

      <NavBar />
      <main>{children}</main>
      <BottomNav />
    </>
  );
};

export default Layout;

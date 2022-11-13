import { ReactNode } from "react";
import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

type MyComponentProps = {
  children: ReactNode;
};
export default function Layout({ children }: MyComponentProps) {
  return (
    <div>
      <Head>
        <title>WoongsNote</title>
        <meta name="description" content="NextJs Blog by Woongsnote" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="pt-10 relative mx-auto container max-w-screen-md pb-16 px-2 lg:px-0">
        {children}
      </main>
      <Footer />
    </div>
  );
}

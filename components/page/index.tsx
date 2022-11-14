import Head from "next/head";

import AppBar from "../appbar";
import BottomNav from "../bottom-nav";

interface MyComponentProps {
  title?: string;
  children: React.ReactNode;
}
const Page = ({ title, children }: MyComponentProps) => {
  return (
    <>
      {title ? (
        <Head>
          <title>Woongsnote | {title}</title>
        </Head>
      ) : null}

      <AppBar />
      <main className="pt-10 relative mx-auto container max-w-screen-md pb-20 px-2 lg:px-0">
        <div className="px-4 md:px-8 mx-auto">{children}</div>
      </main>
      <BottomNav />
    </>
  );
};

export default Page;

import "styles/globals.css";
import type { AppProps } from "next/app";
import Meta from "components/Meta";
import { ThemeProvider } from "next-themes";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Meta />
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

import "../styles/globals.css";
import type { AppProps } from "next/app";
import Meta from "../components/Meta";
import { ThemeProvider } from "next-themes";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Meta />
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

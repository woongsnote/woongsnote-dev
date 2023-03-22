import Head from "next/head";

const Meta = () => (
  <Head>
    <title>WoongsNote</title>
    <meta charSet="utf-8" />
    <meta name="application-name" content="Woongsnote" />
    <meta name="description" content="NextJs Tech Blog by Woongsnote" />
    <meta name="theme-color" content="#4a90e2" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, viewport-fit=cover"
    />
    <link
      href="/icons/favicon-16x16.png"
      rel="icon"
      type="image/png"
      sizes="16x16"
    />
    <link
      href="/icons/favicon-32x32.png"
      rel="icon"
      type="image/png"
      sizes="32x32"
    />
    <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
    <link rel="icon" href="/favicon.ico" />
    <link rel="manifest" href="/manifest.json" />
  </Head>
);

export default Meta;

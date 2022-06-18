import "@/styles/css/theme.min.css";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  console.log(`[LOG CWD]: ${process.cwd()}`);
  return <Component {...pageProps} />;
}

export default MyApp;

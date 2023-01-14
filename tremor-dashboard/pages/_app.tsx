import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@tremor/react/dist/esm/tremor.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

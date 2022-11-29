import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import axios from "axios";

import "../styles/globals.css";
import { Layout } from "components/layouts/Layout";

axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/api/v1";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NextUIProvider>
  );
}

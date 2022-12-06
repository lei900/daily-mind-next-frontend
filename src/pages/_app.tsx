import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import axios from "axios";

import "../styles/globals.css";
import { Layout } from "components/layouts/Layout";
import { AuthContextProvider } from "context/AuthContext";

axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://127.0.0.1:3001/api/v1";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </NextUIProvider>
  );
}

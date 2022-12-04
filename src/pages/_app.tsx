import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import axios from "axios";

import "../styles/globals.css";
import { Layout } from "components/layouts/Layout";
import { AuthContextProvider } from "context/AuthContext";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_DEV_BASE_URL;

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

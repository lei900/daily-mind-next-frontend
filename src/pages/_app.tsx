import type { AppProps } from "next/app";
import Script from "next/script";
import { NextUIProvider } from "@nextui-org/react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";

import "../styles/globals.css";
import { Layout } from "components/layouts/Layout";
import { AuthContextProvider } from "context/AuthContext";

axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://127.0.0.1:3001/api/v1";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          property="og:url"
          content="https://www.idailymind.com/"
          key="ogurl"
        />
        <meta property="og:image" content="/previewImage.png" key="ogimage" />
        <meta property="og:site_name" content="Daily Mind" key="ogsitename" />
        <meta
          name="twitter:card"
          content="認知療法で心のセルフケアを練習しましょう"
          key="twcard"
        />
        <meta name="twitter:creator" content="@Maize_2" key="twhandle" />
      </Head>
      {/* Google tag  */}
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload" id="google-analytics">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
          page_path: window.location.pathname,
          });`}
      </Script>
      <NextUIProvider>
        <AuthContextProvider>
          <Layout>
            <Component {...pageProps} />
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable={false}
              pauseOnHover={false}
              theme="colored"
            />
          </Layout>
        </AuthContextProvider>
      </NextUIProvider>
      <Analytics />
    </>
  );
}

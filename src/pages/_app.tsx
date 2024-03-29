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
        <meta name="twitter:card" content="summary_large_image" key="twcard" />
        <meta property="twitter:site" content="idailymind.com/" key="twsite" />
        <meta
          name="twitter:title"
          content="Daily Mind | 嫌な気持ちを楽にする"
          key="twtitle"
        />
        <meta
          name="twitter:description"
          content="自己否定感などネガティブな感情から抜け出したい人に、認知療法に基づいたセルフケア方法を提供するサービス"
          key="twdesc"
        />
        <meta
          name="twitter:image"
          content="https://user-images.githubusercontent.com/97896554/216817744-65a74c1c-66ba-436f-abf4-2300b353c474.png"
          key="twimage"
        />

        <meta name="twitter:creator" content="@Maize_2" key="twhandle" />
        <meta
          property="og:url"
          content="https://www.idailymind.com/"
          key="ogurl"
        />
        <meta
          property="og:image"
          content="https://user-images.githubusercontent.com/97896554/216817744-65a74c1c-66ba-436f-abf4-2300b353c474.png"
          key="ogimage"
        />
        <meta property="og:site_name" content="Daily Mind" key="ogsitename" />
        <link rel="icon" href="/favicon.ico" />
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

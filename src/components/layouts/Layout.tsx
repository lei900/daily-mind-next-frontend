import Head from "next/head";
import { Header } from "./Header";
import { ToastContainer } from "react-toastify";

export const Layout = ({ children }: any) => {
  return (
    <>
      <Head>
        <title>Daily Mind | 嫌な気持ちを楽にする</title>
        <meta
          name="description"
          content="認知療法で心のセルフケアを練習しましょう"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

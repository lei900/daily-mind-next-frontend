import Head from "next/head";
import { Header } from "./Header";

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
      <main>{children}</main>
    </>
  );
};

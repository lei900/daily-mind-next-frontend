import Head from "next/head";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

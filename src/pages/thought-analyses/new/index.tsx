import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { useAuthContext } from "context/AuthContext";
import AnalysisForm from "components/entries/thought-analyses/AnalysisForm";

export default function NewAnalysisPage() {
  const { currentUser, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push("/login");
    }
  }, [loading, currentUser]);

  return (
    <>
      <Head>
        <title>思考ゆがみ分析作成 - Daily Mind</title>
        <meta name="description" content="思考ゆがみ分析を作成する。" />
        <meta property="og:title" content="思考ゆがみ分析作成" key="ogtitle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AnalysisForm />
    </>
  );
}

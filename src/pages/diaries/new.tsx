import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { useAuthContext } from "context/AuthContext";
import DiaryForm from "components/entries/diaries/DiaryForm";

export default function NewDiaryPage() {
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
        <title>今日の気持ち作成 - Daily Mind</title>
        <meta name="description" content="今日の気持ちを作成する。" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DiaryForm />
    </>
  );
}

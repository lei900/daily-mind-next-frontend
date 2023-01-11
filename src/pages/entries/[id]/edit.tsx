import { GetServerSideProps } from "next";
import fetch from "node-fetch";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { EntryData } from "types/types";
import { useAuthContext } from "context/AuthContext";
import DiaryForm from "components/entries/diaries/DiaryForm";
import AnalysisForm from "components/entries/thought-analyses/AnalysisForm";

type Props = {
  entryData: EntryData;
};

export default function EditEntryPage({ entryData }: Props) {
  const { currentUser, loading } = useAuthContext();
  const router = useRouter();
  const distortionIds = entryData.attributes.distortions?.map((d) => d.id);

  useEffect(() => {
    if (!loading) {
      if (!currentUser || currentUser.uid !== entryData.attributes.user.uid) {
        router.push("/");
      }
    }
  }, [currentUser]);

  return (
    <>
      <Head>
        <title>
          {entryData.attributes.diary?.title ||
            entryData.attributes.thoughtAnalysis?.negative_thought}
        </title>
        <meta
          name="description"
          content={
            entryData.attributes.diary?.body ||
            entryData.attributes.thoughtAnalysis?.negative_thought
          }
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {entryData.attributes.diary ? (
        <DiaryForm entryData={entryData} />
      ) : (
        <AnalysisForm entryData={entryData} distortionIds={distortionIds} />
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { id } = context.query;

  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/entries/${id}`
      : `http://127.0.0.1:3001/api/v1/entries/${id}`
  );

  const raw = (await res.json()) as any;
  const entryData: EntryData = raw.data;

  return { props: { entryData } };
};

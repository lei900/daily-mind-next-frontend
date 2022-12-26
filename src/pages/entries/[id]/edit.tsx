import { GetServerSideProps } from "next";
import fetch from "node-fetch";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { EntryData } from "types/types";
import { useAuthContext } from "context/AuthContext";
import DiaryForm from "components/entries/diaries/DiaryForm";

type Props = {
  entryData: EntryData;
};

export default function EditEntryPage({ entryData }: Props) {
  const { currentUser, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!currentUser || currentUser.uid !== entryData.attributes.user.uid) {
        router.push("/");
      }
    }
  }, [currentUser]);

  return <DiaryForm entryData={entryData} />;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { id } = context.query;

  // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${id}`);
  const res = await fetch(`http://127.0.0.1:3001/api/v1/entries/${id}`);

  const raw = (await res.json()) as any;
  const entryData: EntryData = raw.data;

  return { props: { entryData } };
};

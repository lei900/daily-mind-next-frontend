import { GetServerSideProps } from "next";
import fetch from "node-fetch";
import { Container } from "@nextui-org/react";

import { EntryData } from "types/types";
import { EntryListItem } from "components/entries/EntryListItem";

type Props = {
  entryData: EntryData;
};

export default function EntryDetailPage({ entryData }: Props) {
  return (
    <Container sm className="sm:px-16 md:px-10 px-4 mt-8">
      <EntryListItem entry={entryData} />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { id } = context.query;

  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${id}`
      : `http://127.0.0.1:3001/api/v1/entries/${id}`
  );

  const data = (await res.json()) as any;
  const entryData: EntryData = data.data;

  res.headers.set(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return { props: { entryData } };
};

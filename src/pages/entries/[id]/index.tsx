import { GetServerSideProps } from "next";
import fetch from "node-fetch";
import { Container } from "@nextui-org/react";
import { useState } from "react";
import Head from "next/head";

import { EntryData, CommentData } from "types/types";
import { EntryDetail } from "components/entries/EntryDetail";
import { AirplaneIcon } from "components/Icons";
import useAxios from "hooks/useAxios";
import { CommentListItem } from "components/entries/CommentListItem";
import { useAuthContext } from "context/AuthContext";

type Props = {
  entryData: EntryData;
};

export default function EntryDetailPage({ entryData }: Props) {
  const { currentUser, loading } = useAuthContext();
  const [commentInputs, setCommentInputs] = useState<string>("");
  const [comments, setComments] = useState(entryData.attributes.comments.data);
  const [commentCount, setCommentCount] = useState(
    Number(entryData.attributes.commentCount)
  );
  const { axioRequest } = useAxios();

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentInputs(e.target.value);
  };

  const sendComment = async (e: React.SyntheticEvent) => {
    const data = {
      comment: {
        body: commentInputs,
      },
    };

    if (commentInputs) {
      const response = await axioRequest(
        "post",
        `/entries/${entryData.id}/comments`,
        undefined,
        undefined,
        data
      );
      if (response?.status === 200) {
        const comment = response.data.data as CommentData;
        setComments([
          {
            id: comment.id,
            attributes: {
              body: comment.attributes.body,
              entryId: comment.attributes.entryId,
              createdAt: comment.attributes.createdAt,
              user: comment.attributes.user,
            },
          },
          ...comments,
        ]);
        setCommentInputs("");
        setCommentCount(commentCount + 1);
      }
    }
  };

  const deleteComment = async (commentId: number) => {
    if (
      window.confirm(
        "削除してよろしいですか？削除したコメントは復旧できません。"
      )
    ) {
      const response = await axioRequest(
        "delete",
        `/entries/${entryData.id}/comments/${commentId}`
      );
      if (response?.status === 200) {
        setComments(comments.filter((comment) => comment.id !== commentId));
        setCommentCount(commentCount - 1);
      }
    }
  };

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
        <meta
          property="og:title"
          content={
            entryData.attributes.diary?.title ||
            entryData.attributes.thoughtAnalysis?.negative_thought
          }
          key="ogtitle"
        />
        <meta
          property="og:description"
          content={
            entryData.attributes.diary?.body ||
            entryData.attributes.thoughtAnalysis?.negative_thought
          }
          key="ogdesc"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container sm className="sm:px-16 md:px-10 px-2 sm:mt-8">
        <div className="flex flex-col sm:p-4 px-2 py-4 gap-2">
          <EntryDetail entry={entryData} commentCount={commentCount} />
          {/* コメント */}
          {!loading && currentUser && (
            <div className="relative">
              <textarea
                value={commentInputs}
                aria-label="Write comment"
                id="comment"
                name="comment"
                rows={2}
                className="pt-2 pb-2 pl-3 w-full bg-blue-50 rounded-lg placeholder:text-slate-600 focus:bg-blue-100 pr-16"
                placeholder="みんなで励まし合いましょう"
                onChange={handleCommentChange}
              />

              <span
                onClick={sendComment}
                className="flex absolute right-3 top-2/4 -mt-5 hover:bg-blue-100 p-2 rounded-full cursor-pointer"
              >
                <AirplaneIcon />
              </span>
            </div>
          )}
          {/* Comments content */}
          <div className="font-semibold sm:text-base text-gray-700 my-2">
            コメント一覧
          </div>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentListItem
                comment={comment}
                entryId={entryData.id}
                onDeleteComment={deleteComment}
                key={comment.id}
              />
            ))
          ) : (
            <div>まだコメントはありません。</div>
          )}
        </div>
      </Container>
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

  const data = (await res.json()) as any;
  const entryData: EntryData = data.data;

  res.headers.set(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return { props: { entryData } };
};

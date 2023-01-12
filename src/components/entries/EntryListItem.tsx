import { Card, Row, Dropdown, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import { useState, useEffect, Key } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import {
  GlobeAsiaIcon,
  BookmarkIcon,
  ChatIcon,
  HeartIcon,
  MoreIcon,
  AvatarIcon,
  EditIcon,
  DeleteIcon,
} from "components/Icons";
import { useAuthContext } from "context/AuthContext";
import { EntryData } from "types/types";
import { DiaryMoodIcon } from "./DiaryMoodIcon";
import { EntryDistortionIcon } from "./EntryDistortionIcon";
import useAxios from "hooks/useAxios";
import Date from "components/Date";

type Props = {
  entry: EntryData;
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export const EntryListItem = ({ entry }: Props) => {
  const { currentUser, loading } = useAuthContext();
  const [isAuthor, setIsAuthor] = useState(false);
  const router = useRouter();
  const { axioRequest } = useAxios();

  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Number(entry.attributes.likes));
  const [hasBookmarked, setHasBookmarked] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(
    Number(entry.attributes.bookmarks)
  );

  const diary = entry.attributes.diary;
  const thoughtAnalysis = entry.attributes.thoughtAnalysis;
  const distortions = entry.attributes.distortions;
  const user = entry.attributes.user;
  const commentCount = Number(entry.attributes.commentCount);

  useEffect(() => {
    if (!loading && currentUser) {
      if (currentUser.uid === user.uid) {
        setIsAuthor(true);
      }
      if (
        entry.attributes.entryLikerUids.some((uid) => uid === currentUser.uid)
      ) {
        setHasLiked(true);
      }
      if (
        entry.attributes.bookmarkerUids.some((uid) => uid === currentUser.uid)
      ) {
        setHasBookmarked(true);
      }
    }
  }, [currentUser]);

  const handleEntryAction = (key: Key) => {
    if (key === "edit") {
      router.push(`/entries/${entry.id}/edit`);
    } else {
      handleDeleteEntry();
    }
  };

  const handleDeleteEntry = () => {
    const method = "delete";
    const url = `/entries/${entry.id}`;
    const onSuccess = { msg: "記録が削除しました", redirectUrl: "" };
    const onFailure = {
      msg: "記録が削除できませんでした",
      redirectUrl: "",
    };

    if (
      window.confirm("削除してよろしいですか？削除した記録は復旧できません。")
    ) {
      axioRequest(method, url, onSuccess, onFailure);
    }
  };

  const handleLikeEntry = () => {
    if (currentUser) {
      hasLiked ? unLikeEntry() : likeEntry();
    }
  };

  const unLikeEntry = async () => {
    const configOptions = {
      params: { likeable_id: entry.id, likeable_type: "Entry" },
    };

    await axioRequest(
      "delete",
      `/likes/${entry.id}`,
      undefined,
      undefined,
      undefined,
      configOptions
    );
    setLikeCount(likeCount - 1);
    setHasLiked(false);
  };

  const likeEntry = async () => {
    const data = {
      like: { likeable_id: entry.id, likeable_type: "Entry" },
    };
    await axioRequest("post", "/likes", undefined, undefined, data);
    setLikeCount(likeCount + 1);
    setHasLiked(true);
  };

  const handleBookmark = () => {
    if (currentUser) {
      hasBookmarked ? unbookmark() : bookmark();
    }
  };

  const unbookmark = async () => {
    const configOptions = {
      params: { entry_id: entry.id },
    };
    await axioRequest(
      "delete",
      `/bookmarks/${entry.id}`,
      undefined,
      undefined,
      undefined,
      configOptions
    );
    setBookmarkCount(bookmarkCount - 1);
    setHasBookmarked(false);
  };

  const bookmark = async () => {
    await axioRequest("post", `/bookmarks`);
    setBookmarkCount(bookmarkCount + 1);
    setHasBookmarked(true);
  };

  return (
    <Card
      variant="flat"
      className="bg-white flex flex-row cursor-pointer rounded-none hover:bg-gray-50 sm:p-4 px-2 py-4 gap-2 border-slate-300 border-t-0 border-r-0 border-l-0 "
    >
      <div className="flex">
        <Link href={`/user/${user.uid}`}>
          <AvatarIcon className="sm:w-12 sm:h-12 w-8 h-8" />
        </Link>
        {/* <Image
            src={user.avatar}
            width={48}
            height={48}
            alt="Avatar"
            className="rounded-full"
          /> */}
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-0.5">
            <Link href={`/user/${user.uid}`}>
              <div className="hover:underline sm:text-base text-sm text-gray-600">
                {user.nickname}
              </div>
            </Link>

            <Date
              className="sm:text-sm text-xs text-slate-500"
              dateString={entry.attributes.createdAt}
            />
          </div>
          {isAuthor && (
            <Dropdown placement="bottom-right">
              <Dropdown.Trigger>
                <div className="group rounded-full p-2 hover:bg-blue-100">
                  <MoreIcon />
                </div>
              </Dropdown.Trigger>
              <Dropdown.Menu
                aria-label="Entry actions"
                onAction={(key) => {
                  handleEntryAction(key);
                }}
                css={{ $$dropdownMenuMinWidth: "130px" }}
              >
                <Dropdown.Item
                  key="edit"
                  icon={<EditIcon className="sm:w-6 sm:h-6 w-5 h-5" />}
                >
                  <p className="sm:text-base text-sm">編集</p>
                </Dropdown.Item>
                <Dropdown.Item
                  key="delete"
                  icon={<DeleteIcon className="sm:w-6 sm:h-6 w-5 h-5" />}
                >
                  <p className="sm:text-base text-sm">削除</p>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
        <div className="p-0">
          <div onClick={() => router.push(`/entries/${entry.id}`)}>
            {diary && (
              <>
                <div className="flex flex-row items-center gap-0.5 mb-2">
                  <DiaryMoodIcon mood={diary.mood} />
                  <div className="font-semibold text-gray-700 sm:text-base text-sm">
                    {diary.title}
                  </div>
                </div>
                <div className="whitespace-pre-line sm:text-base text-sm">
                  {diary.body}
                </div>
              </>
            )}
            {thoughtAnalysis && (
              <>
                <div className="font-semibold text-gray-700 mb-1 sm:text-base text-sm">
                  {thoughtAnalysis.negative_thought}
                </div>
                {distortions && (
                  <Row align="center" wrap="wrap" className="my-2">
                    {distortions.map((distortion) => (
                      <Row
                        gap={1}
                        align="center"
                        className="bg-sky-100 w-fit py-1 px-2 m-1 rounded-lg"
                        key={distortion.id}
                      >
                        <EntryDistortionIcon distortionID={distortion.id} />
                        <p className="sm:text-sm text-xs pl-1">
                          {distortion.name}
                        </p>
                      </Row>
                    ))}
                  </Row>
                )}
                <div className="sm:text-base text-sm font-semibold text-gray-700">
                  反論：
                </div>
                <div className="whitespace-pre-line sm:text-base text-sm">
                  {thoughtAnalysis.new_thought}
                </div>
              </>
            )}
          </div>
          {entry.attributes.community && (
            <div className="flex my-3">
              <button className="bg-slate-100 rounded-2xl flex flex-row pl-2 pr-3 py-2 gap-0.5 items-center hover:bg-slate-200">
                <GlobeAsiaIcon />
                <p className="text-xs sm:text-sm text-sky-600 font-medium">
                  {entry.attributes.community.name}
                </p>
              </button>
            </div>
          )}
          {/* entry reactions */}

          <div className="flex flex-row my-3 px-0 justify-between items-center">
            <Tooltip content="応援する">
              <button
                className="group inline-flex items-center p-2 rounded-xl hover:bg-pink-100"
                onClick={handleLikeEntry}
              >
                <HeartIcon
                  className={classNames(
                    hasLiked
                      ? "stroke-rose-600 fill-rose-600"
                      : "stroke-gray-500",
                    "w-5 h-5 group-hover:stroke-pink-600"
                  )}
                />
                <span className="text-xs sm:text-sm text-gray-500 px-1 group-hover:text-pink-500">
                  {likeCount === 0 ? "応援" : likeCount}
                </span>
              </button>
            </Tooltip>
            <Tooltip content="コメントする">
              <button
                onClick={() => router.push(`/entries/${entry.id}`)}
                className="group inline-flex items-center p-2 rounded-xl hover:bg-blue-100"
              >
                <ChatIcon className="stroke-gray-500 w-5 h-5 group-hover:stroke-blue-500" />
                <span className="text-xs sm:text-sm text-gray-500 px-1 group-hover:text-blue-500">
                  {commentCount === 0 ? "コメント" : commentCount}
                </span>
              </button>
            </Tooltip>
            <Tooltip content="保存する">
              <button
                className="group inline-flex items-center p-2 rounded-xl hover:bg-blue-100"
                onClick={handleBookmark}
              >
                <BookmarkIcon
                  className={classNames(
                    hasBookmarked
                      ? "stroke-blue-600 fill-blue-600"
                      : "stroke-gray-500",
                    "w-5 h-5 group-hover:stroke-blue-600"
                  )}
                />
                <span className="text-xs sm:text-sm text-gray-500 px-1 group-hover:text-blue-500">
                  {bookmarkCount === 0 ? "保存" : bookmarkCount}
                </span>
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </Card>
  );
};

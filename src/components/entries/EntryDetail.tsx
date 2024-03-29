import { Row, Dropdown, Tooltip } from "@nextui-org/react";
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
import classNames from "utils/classNames";

type Props = {
  entry: EntryData;
  commentCount: number;
};

export const EntryDetail = ({ entry, commentCount }: Props) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Number(entry.attributes.likes));
  const [hasBookmarked, setHasBookmarked] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(
    Number(entry.attributes.bookmarks)
  );

  const { currentUser, loading } = useAuthContext();
  const [isAuthor, setIsAuthor] = useState(false);
  const router = useRouter();
  const { axioRequest } = useAxios();

  const diary = entry.attributes.diary;
  const thoughtAnalysis = entry.attributes.thoughtAnalysis;
  const distortions = entry.attributes.distortions;
  const user = entry.attributes.user;

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
      deleteEntry();
    }
  };

  const deleteEntry = () => {
    const method = "delete";
    const url = `/entries/${entry.id}`;
    const onSuccess = { msg: "記録が削除しました", redirectUrl: "/" };
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
    const configOptions = {
      params: { entry_id: entry.id },
    };
    await axioRequest(
      "post",
      `/bookmarks`,
      undefined,
      undefined,
      undefined,
      configOptions
    );
    setBookmarkCount(bookmarkCount + 1);
    setHasBookmarked(true);
  };

  return (
    <div className="border-slate-300 border-t-0 border-r-0 border-l-0 border mb-2">
      <div className="flex flex-row justify-between mb-4">
        <div className="flex flex-row items-center gap-2">
          <Link href={`/user/${user.uid}`}>
            {user.avatar ? (
              <div className="sm:w-12 sm:h-12 w-10 h-10">
                <Image
                  src={user.avatar}
                  width={48}
                  height={48}
                  alt="Avatar"
                  className="rounded-full"
                />
              </div>
            ) : (
              <div className="cursor-pointer">
                <AvatarIcon className="sm:w-12 sm:h-12 w-10 h-10" />
              </div>
            )}
          </Link>
          <div className="flex flex-col">
            <Link href={`/user/${user.uid}`}>
              <div className="hover:underline font-semibold sm:text-lg text-base text-gray-700">
                {user.nickname}
              </div>
            </Link>

            {/* <div className="flex flex-row gap-1">
              <p className="sm:text-sm text-xs text-gray-500">投稿日</p> */}
            <Date
              className="sm:text-sm text-xs text-slate-500"
              dateString={entry.attributes.createdAt}
            />
            {/* </div> */}
          </div>
        </div>

        {/* entry action menu */}

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

      {/* entry body */}

      <div className="p-0">
        {diary && (
          <>
            <div className="flex flex-row items-center gap-1 mb-2">
              <DiaryMoodIcon mood={diary.mood} className="h-6 w-6" />
              <div className="font-semibold sm:text-lg text-base self-center">
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
            <div className="font-semibold mb-1 sm:text-base text-sm">
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
                    <p className="sm:text-sm text-xs pl-1">{distortion.name}</p>
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
        {entry.attributes.community && (
          <div className="flex sm:my-6 my-4">
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
            <button className="group inline-flex items-center p-2 rounded-xl hover:bg-blue-100">
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
  );
};

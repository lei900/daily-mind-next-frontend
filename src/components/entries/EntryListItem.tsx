import { Card, Row, Dropdown } from "@nextui-org/react";
import Image from "next/image";
import { useState, useEffect, Key } from "react";
import { useRouter } from "next/router";

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

type Props = {
  entry: EntryData;
};

export const EntryListItem = ({ entry }: Props) => {
  const { currentUser, loading } = useAuthContext();
  const [isAuthor, setIsAuthor] = useState(false);
  const router = useRouter();
  const { axioRequest } = useAxios();

  const diary = entry.attributes.diary;
  const thoughtAnalysis = entry.attributes.thoughtAnalysis;
  const distortions = entry.attributes.distortions;
  const user = entry.attributes.user;

  useEffect(() => {
    if (!loading) {
      if (currentUser && currentUser.uid === user.uid) {
        setIsAuthor(true);
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

  return (
    <Card
      variant="flat"
      className="bg-white flex flex-row cursor-pointer  sm:rounded-xl rounded-none hover:bg-gray-50 sm:p-4 px-2 py-4 gap-2 border-slate-300 border-t-0 border-r-0 border-l-0 sm:border"
      key={entry.id}
    >
      <div className="flex">
        <AvatarIcon className="sm:w-12 sm:h-12 w-8 h-8" />
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
          <div className="flex flex-col items-center gap-0.5">
            <div className="sm:text-base text-sm text-gray-600">
              {user.nickname}
            </div>
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
        <div
          className="p-0"
          onClick={() => router.push(`/entries/${entry.id}`)}
        >
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
          <Card.Footer className="flex flex-row py-0 px-0 justify-between items-center">
            <button className="group inline-flex items-center p-2 rounded-xl hover:bg-pink-100">
              <HeartIcon className="stroke-gray-500	w-5 h-5 group-hover:stroke-pink-500" />
              <span className="text-xs text-gray-500 px-1 group-hover:text-pink-500">
                応援
              </span>
            </button>
            <button className="group inline-flex items-center p-2 rounded-xl hover:bg-blue-100">
              <ChatIcon className="stroke-gray-500 w-5 h-5 group-hover:stroke-blue-500" />
              <span className="text-xs text-gray-500 px-1 group-hover:text-blue-500">
                コメント
              </span>
            </button>
            <button className="group inline-flex items-center p-2 rounded-xl hover:bg-blue-100">
              <BookmarkIcon className="stroke-gray-500 w-5 h-5 group-hover:stroke-blue-500" />
              <span className="text-xs text-gray-500 px-1 group-hover:text-blue-500">
                保存
              </span>
            </button>
          </Card.Footer>
        </div>
      </div>
    </Card>
  );
};

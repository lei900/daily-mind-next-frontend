import { Card, Row, Dropdown } from "@nextui-org/react";
import Image from "next/image";

import {
  GlobeAsiaIcon,
  BookmarkIcon,
  ChatIcon,
  HeartIcon,
  MoreIcon,
} from "components/Icons";
import { useAuthContext } from "context/AuthContext";
import { EntryData } from "types/types";
import { DiaryMoodIcon } from "./DiaryMoodIcon";
import { EntryDistortionIcon } from "./EntryDistortionIcon";

type Props = {
  entry: EntryData;
};

export const EntryListItem = ({ entry }: Props) => {
  const { currentUser } = useAuthContext();
  const diary = entry.attributes.diary;
  const thoughtAnalysis = entry.attributes.thoughtAnalysis;
  const distortions = entry.attributes.distortions;
  const user = entry.attributes.user;

  return (
    <Card
      variant="flat"
      className="bg-white flex flex-row cursor-pointer rounded-lg hover:bg-gray-50 p-4 gap-2 border-slate-300"
      key={entry.id}
    >
      <div className="flex">
        <div className="sm:w-12 sm:h-12 w-8 h-8">
          <Image
            src={user.avatar}
            width={48}
            height={48}
            alt="Avatar"
            className="rounded-full"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-0.5">
            <div className="inline-block mr-1 sm:text-xl text-lg text-gray-700">
              {user.nickname}
            </div>
            {diary && <DiaryMoodIcon mood={diary.mood} />}
          </div>
          <div className="group rounded-full p-2 hover:bg-blue-100">
            <MoreIcon />
          </div>
        </div>
        <div className="p-0">
          {diary && (
            <>
              <div className="font-semibold text-gray-700 mb-1 text-sm sm:text-base">
                {diary.title}
              </div>
              <div className="whitespace-pre-line text-sm sm:text-base">
                {diary.body}
              </div>
            </>
          )}
          {thoughtAnalysis && (
            <>
              <div className="font-semibold text-gray-700 mb-1 text-sm sm:text-base">
                {thoughtAnalysis.negativeThought}
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

              <div className="whitespace-pre-line text-sm sm:text-base">
                {thoughtAnalysis.newThought}
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

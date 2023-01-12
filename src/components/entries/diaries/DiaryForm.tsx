import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Great, Good, Neutral, Bad, Terrible } from "components/Icons";
import {
  EntryData,
  Mood,
  DiaryData,
  EntryRequestData,
  Status,
  Community,
} from "types/types";
import useAxios from "hooks/useAxios";
import useListBox from "hooks/useListBoxt";
import CommunityListBox from "../CommunityListBox";
import StatusListBox from "../StatusListBox";

type Props = {
  entryData?: EntryData;
};

export default function DiaryForm({ entryData }: Props) {
  const { statuses, selectedEntryCommunity, selectedEntryStatus } =
    useListBox();
  const [showMoodSelect, setShowMoodSelect] = useState(true);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(
    entryData && entryData.attributes.community
      ? selectedEntryCommunity(entryData.attributes.community.id)
      : null
  );
  const [selectedStatus, setSelectedStatus] = useState(
    entryData ? selectedEntryStatus(entryData.attributes.status) : statuses[0]
  );
  const { register, handleSubmit, getValues } = useForm<DiaryData>();
  const { axioRequest } = useAxios();

  const entry = entryData;
  const diary = entry?.attributes.diary;
  const isAddMode = !entry;

  const isCheckedMood = (mood: Mood) => {
    const result = mood === diary?.mood ? true : false;
    return result;
  };

  const onSubmit: SubmitHandler<DiaryData> = (diaryInputData) => {
    const data: EntryRequestData = {
      entry: {
        entryable_type: "Diary",
        status: selectedStatus.name as Status,
        community_id: selectedCommunity ? selectedCommunity.id : null,
        entryable_attributes: diaryInputData,
      },
    };

    if (!showMoodSelect && !diaryInputData.body) {
      toast.info("詳細記録は記入必須です。");
    } else {
      return isAddMode ? createDiary(data) : updateDiary(entry.id, data);
    }
  };

  function createDiary(data: EntryRequestData) {
    const method = "post";
    const url = "/entries";
    const onSuccess = { msg: "気持ち記録が作成しました！", redirectUrl: "/" };
    const onFailure = {
      msg: "気持ち記録が作成できませんでした",
      redirectUrl: "",
    };

    axioRequest(method, url, onSuccess, onFailure, data);
  }

  function updateDiary(id: number, data: EntryRequestData) {
    const method = "patch";
    const url = `/entries/${id}`;
    const onSuccess = {
      msg: "気持ち記録が更新しました！",
      redirectUrl: `/entries/${id.toString()}`,
    };
    const onFailure = {
      msg: "気持ち記録が更新できませんでした",
      redirectUrl: "",
    };

    axioRequest(method, url, onSuccess, onFailure, data);
  }

  const handleClickNext = () => {
    if (getValues("mood")) {
      setShowMoodSelect(false);
    } else {
      toast.info("気分を選んでくださいね");
    }
  };

  return (
    <div className="container px-5 sm:py-24 py-10 mx-auto">
      <div className="lg:w-1/2 md:w-2/3 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          {showMoodSelect && (
            <section className="px-2 w-full">
              <div className="mx-auto">
                <h1 className="sm:text-2xl text-xl text-center font-semibold text-gray-700 sm:mb-14 mb-6">
                  今の気分はどうですか？
                </h1>
                <ul className="flex justify-center">
                  <li className="relative">
                    <input
                      {...register("mood")}
                      type="radio"
                      id="terrible"
                      value="terrible"
                      className="sr-only peer/terrible"
                      defaultChecked={isCheckedMood("terrible")}
                    />
                    <label
                      htmlFor="terrible"
                      className="inline-block sm:mx-2 cursor-pointer hover:bg-gray-50 hover:shadow-sm p-2 peer-checked/terrible:bg-gray-100"
                    >
                      <Terrible className="sm:w-20 sm:h-20 w-14 h-14" />
                      <p className="text-center mt-2 text-indigo-800 font-semibold">
                        最悪
                      </p>
                    </label>
                  </li>
                  <li className="relative">
                    <input
                      {...register("mood")}
                      type="radio"
                      id="bad"
                      value="bad"
                      className="sr-only peer/bad"
                      defaultChecked={isCheckedMood("bad")}
                    />
                    <label
                      htmlFor="bad"
                      className="inline-block sm:mx-2 cursor-pointer hover:bg-gray-50 hover:shadow-sm p-2 peer-checked/bad:bg-gray-100"
                    >
                      <Bad className="sm:w-20 sm:h-20 w-14 h-14" />
                      <p className="text-center mt-2 text-sky-800 font-semibold">
                        悪い
                      </p>
                    </label>
                  </li>
                  <li className="relative">
                    <input
                      {...register("mood")}
                      type="radio"
                      id="neutral"
                      value="neutral"
                      className="sr-only peer/neutral"
                      defaultChecked={isCheckedMood("neutral")}
                    />
                    <label
                      htmlFor="neutral"
                      className="inline-block sm:mx-2 cursor-pointer hover:bg-gray-50 hover:shadow-sm p-2 peer-checked/neutral:bg-gray-100"
                    >
                      <Neutral className="sm:w-20 sm:h-20 w-14 h-14" />

                      <p className="text-center mt-2 text-teal-800 font-semibold">
                        普通
                      </p>
                    </label>
                  </li>
                  <li className="relative">
                    <input
                      {...register("mood")}
                      type="radio"
                      id="good"
                      value="good"
                      className="sr-only peer/good"
                      defaultChecked={isCheckedMood("good")}
                    />
                    <label
                      htmlFor="good"
                      className="inline-block sm:mx-2 cursor-pointer hover:bg-gray-50 hover:shadow-sm p-2 peer-checked/good:bg-gray-100"
                    >
                      <Good className="sm:w-20 sm:h-20 w-14 h-14" />

                      <p className="text-center mt-2 text-lime-800 font-semibold">
                        良い
                      </p>
                    </label>
                  </li>
                  <li className="relative">
                    <input
                      {...register("mood")}
                      type="radio"
                      id="great"
                      value="great"
                      className="sr-only peer/great"
                      defaultChecked={isCheckedMood("great")}
                    />
                    <label
                      htmlFor="great"
                      className="inline-block sm:mx-2 cursor-pointer hover:bg-gray-50 hover:shadow-sm p-2 peer-checked/great:bg-gray-100"
                    >
                      <Great className="sm:w-20 sm:h-20 w-14 h-14" />

                      <p className="text-center mt-2 text-green-800 font-semibold">
                        最高
                      </p>
                    </label>
                  </li>
                </ul>
                <div className="sm:mt-14 mt-10">
                  <button
                    type="button"
                    onClick={handleClickNext}
                    className="block mx-auto sm:w-1/3 w-full text-white font-semibold bg-indigo-500 border-0 py-2 px-8 hover:bg-indigo-600 rounded-lg text-lg"
                  >
                    続ける
                  </button>
                </div>
              </div>
            </section>
          )}
          {!showMoodSelect && (
            <section className="sm:p-2 w-full">
              <div className="sm:p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="title"
                    className="leading-7 text-xl text-blue-500"
                  >
                    <span className="drop-shadow-sm">タイトル</span>
                  </label>
                </div>
                <input
                  {...register("title")}
                  type="text"
                  id="title"
                  name="title"
                  defaultValue={diary?.title}
                  placeholder="タイトルをつけましょう"
                  className="w-full rounded-2xl bg-blue-300 bg-opacity-50  sm:text-lg text-base outline-none  text-blue-600 py-3 px-3 focus:bg-blue-200"
                />
              </div>
              <div className="sm:p-2 w-full">
                <div className="relative">
                  <div className="mb-2">
                    <label
                      htmlFor="body"
                      className="leading-7 text-xl text-blue-500"
                    >
                      <span className="drop-shadow-sm">詳細記録</span>
                    </label>
                  </div>
                  <textarea
                    {...register("body")}
                    id="body"
                    name="body"
                    rows={10}
                    defaultValue={diary?.body}
                    placeholder="今日は何かありましたか？"
                    className="w-full rounded-2xl bg-blue-300 bg-opacity-50 focus:shadow sm:text-lg text-base outline-none  text-blue-600 py-3 px-3 focus:bg-blue-200"
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-between px-2 mt-2 w-full">
                <CommunityListBox
                  selectedCommunity={selectedCommunity}
                  setSelectedCommunity={setSelectedCommunity}
                />
                <StatusListBox
                  selectedStatus={selectedStatus}
                  setSelectedStatus={setSelectedStatus}
                />
              </div>
              <div className="p-2 w-full sm:mt-10 mt-6">
                <button
                  type="submit"
                  className="block mx-auto sm:w-1/2 w-full text-white font-semibold bg-indigo-500 border-0 py-4 focus:outline-none hover:bg-indigo-600 rounded-xl sm:text-lg"
                >
                  {isAddMode ? "気持ち記録を作成する" : "気持ち記録を更新する"}
                </button>
              </div>
            </section>
          )}
        </form>
      </div>
    </div>
  );
}

import { useState, Fragment, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Listbox, Transition } from "@headlessui/react";
import Image from "next/image";

import {
  CheckIcon,
  ChevronUpDownIcon,
  ChevronDownIcon,
  Great,
  Good,
  Neutral,
  Bad,
  Terrible,
} from "components/Icons";
import { useAuthContext } from "context/AuthContext";
import { Community } from "types/types";
import engineerIcon from "components/communities/images/engineerIcon.png";
import careerIcon from "components/communities/images/careerIcon.png";
import lifeIcon from "components/communities/images/lifeIcon.png";
import otherIcon from "components/communities/images/otherIcon.png";
import { EntryData, Mood } from "types/types";

interface DiaryInputs {
  mood: string;
  title: string;
  body: string;
}

type Props = {
  entryData?: EntryData;
};

const communities = [
  {
    id: 1,
    name: "日常生活",
    image: lifeIcon,
  },
  {
    id: 2,
    name: "職場キャリア",
    image: careerIcon,
  },
  {
    id: 3,
    name: "エンジニア部屋",
    image: engineerIcon,
  },
  {
    id: 4,
    name: "その他",
    image: otherIcon,
  },
];

const statuses = [
  { id: 1, displayName: "公開", name: "published" },
  { id: 2, displayName: "非公開", name: "private" },
  { id: 3, displayName: "下書き", name: "draft" },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const selectedEntryCommunity = (id?: number) => {
  if (id) {
    switch (id) {
      case 1:
        return communities[0];
      case 2:
        return communities[1];
      case 3:
        return communities[2];
      case 4:
        return communities[3];
      default:
        return null;
    }
  } else {
    return null;
  }
};

const selectedEntryStatus = (status: string) => {
  switch (status) {
    case "published":
      return statuses[0];
    case "private":
      return statuses[1];
    case "draft":
      return statuses[2];
    default:
      return statuses[0];
  }
};

const selectedMood = (mood: string) => {
  switch (mood) {
    case "terrible":
      return statuses[0];
    case "bad":
      return statuses[1];
    case "neutral":
      return statuses[2];
    default:
      return statuses[0];
  }
};

export default function DiaryForm({ entryData }: Props) {
  const { currentUser } = useAuthContext();
  const router = useRouter();
  const [hasSelectedMood, setHasSelectedMood] = useState(false);
  const [showMoodSelect, setShowMoodSelect] = useState(true);
  const [selectedMood, setSelectedMood] = useState(
    entryData ? entryData.attributes.diary!.mood : ""
  );
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(
    () => selectedEntryCommunity(entryData?.attributes.community?.id)
  );
  const [selectedStatus, setSelectedStatus] = useState(
    entryData ? selectedEntryStatus(entryData.attributes.status) : statuses[0]
  );
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const { register, handleSubmit } = useForm<DiaryInputs>();

  const entry = entryData;
  const diary = entry?.attributes.diary;
  const community = entry?.attributes.community;
  const isAddMode = !entry;

  const isCheckedMood = (mood: Mood) => {
    if (mood === selectedMood) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (community) {
      selectedEntryCommunity(community.id);
    }
  });

  const onSubmit: SubmitHandler<DiaryInputs> = (diaryInputData) => {
    return isAddMode
      ? createDiary(diaryInputData)
      : updateDiary(entry.id, diaryInputData);
  };

  async function setConfig() {
    const token = await currentUser?.getIdToken();
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    return config;
  }

  async function createDiary(diaryInputData: DiaryInputs) {
    const config = await setConfig();

    if (!showMoodSelect && !bodyRef.current?.value) {
      toast.info("詳細記録は記入必須です。");
    } else {
      try {
        const response = await axios.post(
          "/entries",
          {
            entry: {
              entryable_type: "Diary",
              status: selectedStatus.name,
              community_id: selectedCommunity?.id,
              entryable_attributes: diaryInputData,
            },
          },
          config
        );
        if (response.status === 200) {
          toast.success("気持ち記録が作成できました！");
          setTimeout(() => {
            router.push("/");
          }, 3000);
        } else {
          toast.error("気持ち記録が作成できませんでした");
        }
      } catch (err) {
        let message;
        if (axios.isAxiosError(err) && err.response) {
          console.error(err.response.data.message);
        } else {
          message = String(err);
          console.error(message);
        }
      }
    }
  }

  async function updateDiary(id: number, diaryInputData: DiaryInputs) {
    const config = await setConfig();

    if (!showMoodSelect && !bodyRef.current?.value) {
      toast.info("詳細記録は記入必須です。");
    } else {
      try {
        const response = await axios.patch(
          `/entries/${id}`,
          {
            entry: {
              entryable_type: "Diary",
              status: selectedStatus.name,
              community_id: selectedCommunity?.id,
              entryable_attributes: diaryInputData,
            },
          },
          config
        );
        if (response.status === 200) {
          toast.success("気持ち記録が更新できました！");
          setTimeout(() => {
            router.push(`/entries/${id.toString()}`);
          }, 3000);
        } else {
          toast.error("気持ち記録が更新できませんでした");
        }
      } catch (err) {
        let message;
        if (axios.isAxiosError(err) && err.response) {
          console.error(err.response.data.message);
        } else {
          message = String(err);
          console.error(message);
        }
      }
    }
  }

  const handleMoodChange = (mood: Mood) => {
    setSelectedMood(mood);
    setHasSelectedMood(true);
  };

  const handleClickNext = () => {
    if (hasSelectedMood === true) {
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
                      onChange={() => handleMoodChange("terrible")}
                      checked={isCheckedMood("terrible")}
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
                      onChange={() => handleMoodChange("bad")}
                      checked={isCheckedMood("bad")}
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
                      onChange={() => handleMoodChange("neutral")}
                      checked={isCheckedMood("neutral")}
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
                      onChange={() => handleMoodChange("good")}
                      checked={isCheckedMood("good")}
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
                      onChange={() => handleMoodChange("great")}
                      checked={isCheckedMood("great")}
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
                  placeholder="タイトルは任意です。"
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
                    ref={bodyRef}
                    placeholder="今日は何かありましたか？"
                    className="w-full rounded-2xl bg-blue-300 bg-opacity-50 focus:shadow sm:text-lg text-base outline-none  text-blue-600 py-3 px-3 focus:bg-blue-200"
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-between px-2 mt-2 w-full">
                <Listbox
                  value={selectedCommunity}
                  onChange={setSelectedCommunity}
                >
                  {({ open }) => (
                    <>
                      <div className="relative mt-1 w-52">
                        <Listbox.Button className="relative w-full cursor-default rounded-xl bg-blue-50 py-2 pl-3 pr-10 text-left shadow-sm text-sm focus:ring-1 focus:ring-indigo-500">
                          <span className="flex items-center">
                            {selectedCommunity && (
                              <Image
                                src={selectedCommunity.image}
                                alt="日常生活"
                                width={30}
                                height={30}
                                className="h-6 w-6 flex-shrink-0 rounded-full"
                              />
                            )}
                            <span className="ml-3 block truncate text-blue-600">
                              {selectedCommunity
                                ? selectedCommunity.name
                                : "コミュニティーを選ぶ"}
                            </span>
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 w-full overflow-auto rounded-xl bg-white text-sm shadow-lg  p-2">
                            {communities.map((community) => (
                              <Listbox.Option
                                key={community.id}
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? "text-blue-600 bg-blue-50"
                                      : "text-gray-800",
                                    "relative cursor-default py-2 pl-3 pr-9 select-none rounded-xl text-sm"
                                  )
                                }
                                value={community}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <div className="flex items-center">
                                      <Image
                                        src={community.image}
                                        alt={community.name}
                                        width={15}
                                        height={15}
                                        className="h-6 w-6 flex-shrink-0 rounded-full"
                                      />
                                      <span
                                        className={classNames(
                                          "ml-3 block truncate"
                                        )}
                                      >
                                        {community.name}
                                      </span>
                                    </div>

                                    {selected ? (
                                      <span
                                        className="text-blue-600 
                                    absolute inset-y-0 right-0 flex items-center pr-4"
                                      >
                                        <CheckIcon className="h-5 w-5" />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
                <Listbox value={selectedStatus} onChange={setSelectedStatus}>
                  {({ open }) => (
                    <>
                      <div className="relative mt-1 w-24">
                        <Listbox.Button className="relative w-full cursor-default rounded-xl bg-blue-50 py-2 px-2  text-left shadow-sm text-sm focus:ring-1 focus:ring-indigo-500">
                          <span className="flex items-center">
                            <span className="ml-3 block truncate text-blue-600">
                              {selectedStatus.displayName ||
                                statuses[0].displayName}
                            </span>
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 w-full overflow-auto rounded-xl bg-white text-sm shadow-lg  p-2">
                            {statuses.map((status) => (
                              <Listbox.Option
                                key={status.id}
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? "text-blue-600 bg-blue-50"
                                      : "text-gray-800",
                                    "relative cursor-default py-2 px-2 select-none rounded-xl text-sm"
                                  )
                                }
                                value={status}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <div className="flex items-center">
                                      <span
                                        className={classNames(
                                          "ml-3 block truncate"
                                        )}
                                      >
                                        {status.displayName}
                                      </span>
                                    </div>
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
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

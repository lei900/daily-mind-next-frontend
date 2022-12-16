import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axios from "axios";
import { Input, Textarea, Checkbox } from "@nextui-org/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Great,
  Good,
  Neutral,
  Bad,
  Terrible,
} from "components/diaries/EmotionIcons";
import { useAuthContext } from "context/AuthContext";
import useWindowSize from "hooks/useWindowSize";

interface Inputs {
  mood: string;
  title: string;
  body: string;
}

export default function NewDiaryPage() {
  const { currentUser, loading } = useAuthContext();
  const router = useRouter();
  const size = useWindowSize();
  const [hasSelectedMood, setHasSelectedMood] = useState(false);
  const [hasFilledBody, setHasFilledBody] = useState(false);
  const [showMoodSelect, setShowMoodSelect] = useState(true);

  // Listen for changes on loading and currentUser, redirect if not logged in
  useEffect(() => {
    if (!loading && !currentUser) {
      router.push("/login");
    }
  }, [loading, currentUser]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const sendDiary: SubmitHandler<Inputs> = async (diaryData) => {
    if (!showMoodSelect && hasFilledBody === false) {
      toast.info("詳細記録を書いてくださいね");
    } else {
      const token = await currentUser?.getIdToken();
      console.log("Calling API with user token:", token);

      const config = {
        headers: { authorization: `Bearer ${token}` },
      };

      try {
        const response = await axios.post(
          "/entries",
          {
            entry: {
              entryable_type: "Diary",
              status: "published",
              entryable_attributes: diaryData,
            },
          },
          config
        );
        console.log(response.data);
        if (response.status === 200) {
          toast.success("気持ち記録が作成できました！");
          router.push("/");
        }
      } catch (err) {
        toast.error("気持ち記録が作成できませんでした");
        let message;
        if (axios.isAxiosError(err) && err.response) {
          console.error(err.response.data.message);
        } else {
          message = String(err);
          console.error(message);
        }
      }
    }
  };

  const handleMoodChange = () => {
    setHasSelectedMood(true);
  };

  const handleClickNext = () => {
    if (hasSelectedMood === true) {
      setShowMoodSelect(false);
    } else {
      toast.info("気分を選んでくださいね");
    }
  };

  const MoodComponent = () => {
    return (
      <div className="p-2 w-full">
        <div className="relative mx-auto">
          <h4 className="sm:text-2xl text-xl text-center font-semibold text-gray-700 sm:mb-14 mb-6">
            今の気分はどうですか？
          </h4>
          <ul className="flex justify-center">
            <li className="relative">
              <input
                {...register("mood")}
                type="radio"
                id="terrible"
                value="terrible"
                className="sr-only peer/terrible"
                onChange={handleMoodChange}
              />
              <label
                htmlFor="terrible"
                className="inline-block sm:mx-2 cursor-pointer hover:bg-gray-50 p-2 peer-checked/terrible:bg-gray-100"
              >
                {size.width! < 650 ? (
                  <Terrible width={50} height={50} />
                ) : (
                  <Terrible width={80} height={80} />
                )}
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
                onChange={handleMoodChange}
              />
              <label
                htmlFor="bad"
                className="inline-block sm:mx-2 cursor-pointer hover:bg-gray-50 p-2 peer-checked/bad:bg-gray-100"
              >
                {size.width! < 650 ? (
                  <Bad width={50} height={50} />
                ) : (
                  <Bad width={80} height={80} />
                )}{" "}
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
                onChange={handleMoodChange}
              />
              <label
                htmlFor="neutral"
                className="inline-block sm:mx-2 cursor-pointer hover:bg-gray-50 p-2 peer-checked/neutral:bg-gray-100"
              >
                {size.width! < 650 ? (
                  <Neutral width={50} height={50} />
                ) : (
                  <Neutral width={80} height={80} />
                )}
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
                onChange={handleMoodChange}
              />
              <label
                htmlFor="good"
                className="inline-block sm:mx-2 cursor-pointer hover:bg-gray-50 p-2 peer-checked/good:bg-gray-100"
              >
                {size.width! < 650 ? (
                  <Good width={50} height={50} />
                ) : (
                  <Good width={80} height={80} />
                )}
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
                onChange={handleMoodChange}
              />
              <label
                htmlFor="great"
                className="inline-block sm:mx-2 cursor-pointer hover:bg-gray-50 p-2 peer-checked/great:bg-gray-100"
              >
                {size.width! < 650 ? (
                  <Great width={50} height={50} />
                ) : (
                  <Great width={80} height={80} />
                )}
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
              className="block mx-auto sm:w-1/3 w-full text-white font-semibold bg-indigo-500 border-0 py-2 px-8 hover:bg-indigo-600 rounded text-lg"
            >
              次へ
            </button>
          </div>
        </div>
      </div>
    );
  };

  const DiaryInputComponent = () => {
    return (
      <>
        <div className="p-2 w-full">
          <div className="relative">
            <div className="mb-2">
              <label
                htmlFor="タイトル"
                className="leading-7 text-xl text-gray-600"
              >
                タイトル
              </label>
            </div>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="任意"
                  size="xl"
                  status="primary"
                  fullWidth
                />
              )}
            />
          </div>
        </div>
        <div className="p-2 w-full">
          <div className="relative">
            <div className="mb-2">
              <label htmlFor="body" className="leading-7 text-xl text-gray-600">
                詳細記録
              </label>
            </div>
            <Controller
              name="body"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  fullWidth
                  rows={10}
                  size="xl"
                  required
                  placeholder="今日は何かありましたか？"
                  status="primary"
                  onChange={() => setHasFilledBody(true)}
                />
              )}
            />
          </div>
        </div>
        <div className="px-4 mt-2">
          <Checkbox
            color="primary"
            isRounded={true}
            labelColor="primary"
            size="sm"
          >
            非公開にする
          </Checkbox>
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select an option
          </label>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose a country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </div>
        <div className="p-2 w-full sm:mt-10 mt-6">
          <button
            type="submit"
            className="block mx-auto sm:w-1/2 w-full text-white font-semibold bg-indigo-500 border-0 py-4 focus:outline-none hover:bg-indigo-600 rounded-xl sm:text-lg"
          >
            気持ちの記録を作成する
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <form
            onSubmit={handleSubmit(sendDiary)}
            className="flex flex-wrap -m-2"
          >
            {showMoodSelect && <MoodComponent />}
            {!showMoodSelect && <DiaryInputComponent />}
          </form>
        </div>
      </div>
    </>
  );
}

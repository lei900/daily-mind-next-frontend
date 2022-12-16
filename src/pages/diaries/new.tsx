import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axios from "axios";
import { Spacer, Input, Textarea } from "@nextui-org/react";
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
        alert("Diary is created successfully");
        router.push("/");
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
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <>
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <form
            onSubmit={handleSubmit(sendDiary)}
            className="flex flex-wrap -m-2"
          >
            <div className="p-2 w-full">
              <div className="relative mx-auto">
                <div className="mx-auto">
                  <h4 className="leading-7 text-xl text-gray-600 mb-2">
                    今はどんな気分ですか
                  </h4>
                  <input
                    {...register("mood")}
                    type="radio"
                    id="terrible"
                    value="terrible"
                    className="sr-only peer/terrible"
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

                  <input
                    {...register("mood")}
                    type="radio"
                    id="bad"
                    value="bad"
                    className="sr-only peer/bad"
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

                  <input
                    {...register("mood")}
                    type="radio"
                    id="neutral"
                    value="neutral"
                    className="sr-only peer/neutral"
                  />
                  <label
                    htmlFor="neutral"
                    className="inline-block sm:mx-2 cursor-pointer hover:bg-gray-50 p-2 peer-checked/neutral:bg-gray-100"
                  >
                    {size.width! < 650 ? (
                      <Neutral width={50} height={50} />
                    ) : (
                      <Neutral width={80} height={80} />
                    )}{" "}
                    <p className="text-center mt-2 text-teal-800 font-semibold">
                      普通
                    </p>
                  </label>

                  <input
                    {...register("mood")}
                    type="radio"
                    id="good"
                    value="good"
                    className="sr-only peer/good"
                  />
                  <label
                    htmlFor="good"
                    className="inline-block sm:mx-2 cursor-pointer hover:bg-gray-50 p-2 peer-checked/good:bg-gray-100"
                  >
                    {size.width! < 650 ? (
                      <Good width={50} height={50} />
                    ) : (
                      <Good width={80} height={80} />
                    )}{" "}
                    <p className="text-center mt-2 text-lime-800 font-semibold">
                      良い
                    </p>
                  </label>

                  <input
                    {...register("mood")}
                    type="radio"
                    id="great"
                    value="great"
                    className="sr-only peer/great"
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
                </div>
              </div>
            </div>
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
                      placeholder="Next UI"
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
                  <label
                    htmlFor="body"
                    className="leading-7 text-xl text-gray-600"
                  >
                    本文
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
                      placeholder="本文"
                      status="primary"
                    />
                  )}
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <button
                type="submit"
                className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

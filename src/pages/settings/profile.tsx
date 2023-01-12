import { GetServerSideProps } from "next";
import nookies from "nookies";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Container, Radio } from "@nextui-org/react";
import Head from "next/head";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCookie, destroyCookie } from "nookies";

import { UserData } from "types/types";
import axios from "axios";
import { AvatarIcon } from "components/Icons";
import { useAuthContext } from "context/AuthContext";
import useAxios from "hooks/useAxios";

type Props = {
  userData: UserData;
};

interface profileInputs {
  avatar: string | null;
  nickname: string;
  bio: string | null;
}

export default function ProfilePage({ userData }: Props) {
  const [checked, setChecked] = useState(
    userData.avatar ? "social" : "default"
  );
  const { currentUser, loading } = useAuthContext();
  const [profileInputs, setProfileInputs] = useState<profileInputs>({
    avatar: userData.avatar,
    nickname: userData.nickname,
    bio: userData.bio ? userData.bio : "",
  });
  const router = useRouter();

  const { axioRequest } = useAxios();
  const socialAvatarUrl = currentUser?.photoURL!;

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push("/login");
    }
  }, [loading, currentUser]);

  const handleChangeAvatar = (value: string) => {
    setChecked(value);
    if (value == "default") {
      setProfileInputs({ ...profileInputs, avatar: "" });
    } else {
      setProfileInputs({ ...profileInputs, avatar: socialAvatarUrl });
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileInputs({ ...profileInputs, nickname: e.target.value });
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProfileInputs({ ...profileInputs, bio: e.target.value });
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const data = {
      user: profileInputs,
    };

    if (!profileInputs.nickname) {
      toast.info("ニックネームは必須です。");
    } else {
      return updateProfile(data);
    }
  };

  const updateProfile = async (data: { user: profileInputs }) => {
    const onSuccess = {
      msg: "プロフィール更新しました！",
      redirectUrl: "",
    };
    const onFailure = {
      msg: "プロフィール更新失敗しました。",
      redirectUrl: "",
    };

    const res = await axioRequest(
      "patch",
      "/profile",
      onSuccess,
      onFailure,
      data
    );
    if (res?.status === 200) {
      setCookie(null, "avatar", profileInputs.avatar || "", {
        path: "/",
      });
      setCookie(null, "nickname", profileInputs.nickname, {
        path: "/",
      });
    }
  };

  return (
    <>
      <Head>
        <title>プロフィールの編集 - Daily Mind</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container md>
        <div className="max-w-4xl mx-auto">
          <header className="sm:py-12 py-6">
            <h1 className="font-semibold sm:text-2xl text-xl text-center">
              公開用プロフィール
            </h1>
          </header>
          <article className="max-w-xl mx-auto flex flex-col gap-3">
            <form onSubmit={onSubmit}>
              <div className="flex flex-row items-center gap-3">
                <div className="UserHeader_avatarContainaer">
                  {profileInputs.avatar ? (
                    <div className="sm:w-24 sm:h-24 w-20 h-20">
                      <Image
                        src={socialAvatarUrl}
                        width={96}
                        height={96}
                        alt="Avatar"
                        className="rounded-full"
                      />
                    </div>
                  ) : (
                    <AvatarIcon className="sm:w-24 sm:h-24 w-20 h-20" />
                  )}
                </div>
                <Radio.Group
                  aria-label="Options"
                  value={checked}
                  onChange={handleChangeAvatar}
                >
                  <Radio value="default" size="sm">
                    <span className="text-gray-700">デフォルト画像を使う</span>
                  </Radio>
                  <Radio value="social" size="sm">
                    <span className="text-gray-700">ソーシャル画像を使う</span>
                  </Radio>
                </Radio.Group>
              </div>
              <div className="p-2 w-full my-4">
                <label
                  htmlFor="nickname"
                  className="text-lg font-semibold text-gray-700"
                >
                  ニックネーム<span className="text-red-600">*</span>
                </label>
                <input
                  value={profileInputs.nickname}
                  id="nickname"
                  name="nickname"
                  placeholder="表示名を入力"
                  className="w-full rounded-xl bg-blue-200 bg-opacity-50 focus:shadow text-base outline-none  text-blue-600 py-3 px-3 focus:bg-blue-200"
                  onChange={handleNicknameChange}
                />
              </div>
              <div className="p-2 w-full my-4">
                <label
                  htmlFor="bio"
                  className="text-lg font-semibold text-gray-700"
                >
                  自己紹介
                </label>
                <textarea
                  value={profileInputs.bio || ""}
                  id="bio"
                  name="bio"
                  rows={3}
                  placeholder="自己紹介を入力"
                  className="w-full rounded-xl bg-blue-200 bg-opacity-50 focus:shadow text-base outline-none  text-blue-600 py-3 px-3 focus:bg-blue-200"
                  onChange={handleBioChange}
                />
              </div>
              <div className="p-2 w-full sm:mt-8 mt-4">
                <button
                  type="submit"
                  className="block mx-auto sm:w-1/2 w-full text-white font-semibold bg-indigo-500 border-0 py-3 focus:outline-none hover:bg-indigo-600 rounded-xl sm:text-lg"
                >
                  更新する
                </button>
              </div>
            </form>
          </article>
        </div>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const cookies = nookies.get(context);

  const requestData = async () => {
    const config = {
      headers: { authorization: `Bearer ${cookies.token}` },
    };

    const res = await axios.get("/profile", config);
    const userData = res.data.data.attributes;
    return { props: { userData } };
  };

  return requestData();
};

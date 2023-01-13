import axios from "axios";
import Head from "next/head";
import { User } from "firebase/auth";

import {
  GoogleLogo,
  TwitterLogo,
  UserCircleIcon,
  InformationCircleIcon,
} from "components/Icons";
import { useAuthContext } from "context/AuthContext";
import { handleAxiosError } from "hooks/useAxios";
import { setUserInfoCookies } from "utils/manageCookies";
import { UserInfo } from "types/types";
import { Tooltip } from "@nextui-org/react";

export default function LoginPage() {
  const {
    loginWithGoogle,
    loginWithTwitter,
    loginAnonymously,
    updateUserInfo,
  } = useAuthContext();

  const handleLogin = (loginMethod: string) => {
    const getUser = () => {
      switch (loginMethod) {
        case "google":
          return loginWithGoogle();
        case "twitter":
          return loginWithTwitter();
        case "guest":
          return loginAnonymously();
      }
    };

    const verifyIdToken = async () => {
      const user = await getUser();
      const token = await user?.getIdToken();

      const config = {
        headers: { authorization: `Bearer ${token}` },
      };

      try {
        const res = await axios.post("/auth", null, config);
        const userInfo: UserInfo = res.data.data.attributes;
        setUserInfoCookies(userInfo);
        updateUserInfo(userInfo);
        // console.log(response.data);
      } catch (err) {
        handleAxiosError(err);
      }
    };
    verifyIdToken();
  };

  return (
    <>
      <Head>
        <title>ログイン - Daily Mind</title>
        <meta name="description" content="ログインしてください。" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-lg mx-auto bg-white p-8 sm:mt-40 sm:rounded-xl sm:shadow shadow-slate-300">
        <h1 className="text-3xl font-medium">ログイン</h1>
        <p className="text-slate-500">認知療法を一緒に実践しましょう。</p>

        <div className="my-5">
          <button
            onClick={() => handleLogin("google")}
            className="w-full text-center py-3 my-5 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
          >
            <GoogleLogo />
            <span className="font-bold text-base">Google でログイン</span>
          </button>
          <button
            onClick={() => handleLogin("twitter")}
            className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
          >
            <TwitterLogo />
            <span className="font-bold text-base">Twitter でログイン</span>
          </button>
          <button
            onClick={() => handleLogin("guest")}
            className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
          >
            <UserCircleIcon />
            <span className="font-bold text-base">ゲストでログイン</span>
          </button>

          <div className="flex flex-row justify-center underline cursor-pointer">
            <Tooltip
              contentColor="primary"
              content={
                <div className="p-2 w-80 ">
                  <p>
                    臨時アカウントが発行され、サイト全ての機能を試すことは可能です。
                  </p>
                  <p className="mt-2">
                    ただし、
                    <span className="underline font-semibold">
                      同じアカウントで再度ログインはできません
                    </span>
                    。
                  </p>
                  <p className="mt-2">
                    ログイン後、通常アカウントへアップデートすることが可能です。
                  </p>
                </div>
              }
            >
              <InformationCircleIcon className="h-5 w-5 stroke-gray-600" />
              <p className="text-center text-sm text-gray-700">
                ゲストログインとは
              </p>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
}

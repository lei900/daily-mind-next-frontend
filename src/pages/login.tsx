import axios from "axios";
import Head from "next/head";

import { GoogleLogo, TwitterLogo } from "components/Icons";
import { useAuthContext } from "context/AuthContext";
import { handleAxiosError } from "hooks/useAxios";
import { setUserInfoCookies } from "utils/manageCookies";
import { UserInfo } from "types/types";

export default function LoginPage() {
  const { loginWithGoogle, loginWithTwitter, updateUserInfo } =
    useAuthContext();

  const handleGoogleLogin = () => {
    const verifyIdToken = async () => {
      const user = await loginWithGoogle();
      const token = await user?.getIdToken();
      // console.log("Calling API with user token:", token);

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

  const handleTwitterLogin = () => {
    const verifyIdToken = async () => {
      const user = await loginWithTwitter();
      const token = await user?.getIdToken();
      // console.log("Calling API with user token:", token);

      const config = {
        headers: { authorization: `Bearer ${token}` },
      };

      try {
        const response = await axios.post("/auth", null, config);
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
      <div className="max-w-lg mx-auto bg-white p-8 mt-40 rounded-xl shadow shadow-slate-300">
        <h1 className="text-3xl font-medium">ログイン</h1>
        <p className="text-slate-500">認知療法を一緒に実践しましょう。</p>

        <div className="my-5">
          <button
            onClick={handleGoogleLogin}
            className="w-full text-center py-3 my-5 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
          >
            <GoogleLogo />
            <span className="font-bold text-base">Google でログイン</span>
          </button>
          <button
            onClick={handleTwitterLogin}
            className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
          >
            <TwitterLogo />
            <span className="font-bold text-base">Twitter でログイン</span>
          </button>
        </div>
      </div>
    </>
  );
}

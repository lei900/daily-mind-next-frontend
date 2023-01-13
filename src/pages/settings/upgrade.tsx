import { useEffect } from "react";
import { useRouter } from "next/router";
import { Container } from "@nextui-org/react";
import Head from "next/head";

import { useAuthContext } from "context/AuthContext";
import useAxios from "hooks/useAxios";
import { setUserInfoCookies } from "utils/manageCookies";
import { GoogleLogo, TwitterLogo, FacebookLogo } from "components/Icons";

export default function UpgradePage() {
  const { currentUser, loading, upgradeAccount } = useAuthContext();

  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push("/login");
    }
  }, [loading, currentUser]);
  return (
    <>
      <Head>
        <title>アカウントアップグレード - Daily Mind</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container md>
        <div className="max-w-4xl mx-auto">
          <header className="sm:py-12 py-6">
            <h1 className="font-semibold sm:text-2xl text-xl text-center">
              アカウントアップグレード
            </h1>
          </header>
          <section className="max-w-xl mx-auto flex flex-col gap-3">
            <div className="p-2 w-full my-4">
              <p className="text-lg font-semibold text-gray-700">
                ソーシャルアカウントと連携することにより、通常アカウントへアップグレードします。
              </p>
              <p className="text-lg font-semibold text-gray-700 mt-1">
                連携成功後、次回以降は、連携したソーシャルアカウントでログインできます。
              </p>
            </div>
            <div className="my-5">
              <button
                onClick={() => upgradeAccount("google")}
                className="w-full text-center py-3 my-5 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
              >
                <GoogleLogo />
                <span className="font-bold text-base">
                  Google アカウントと連携
                </span>
              </button>
              <button
                onClick={() => upgradeAccount("twitter")}
                className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
              >
                <TwitterLogo />
                <span className="font-bold text-base">
                  Twitter アカウントと連携
                </span>
              </button>
              <button
                onClick={() => upgradeAccount("facebook")}
                className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
              >
                <FacebookLogo />
                <span className="font-bold text-base">
                  Facebook アカウントと連携
                </span>
              </button>
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}

import { GetServerSideProps } from "next";
import nookies from "nookies";
import { Container, Spacer, Card } from "@nextui-org/react";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { UserData } from "types/types";
import { AirplaneIcon } from "components/Icons";
import useAxios from "hooks/useAxios";
import axios from "axios";
import { useAuthContext } from "context/AuthContext";
import { AvatarIcon } from "components/Icons";

type Props = {
  userData: UserData;
};

export default function UserPage({ userData }: Props) {
  const isMypage = userData.isMypage;
  const { publishedEntries, nondraftEntries, draftEntries, bookmarkedEntries } =
    userData;
  console.log(userData);

  return (
    <>
      <Head>
        <title>{userData.nickname} - Daily Mind</title>
        <meta name="description" content={userData.bio || "ユーザーページ"} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container md>
        <header className="UserHeader_container max-w-4xl mx-auto">
          <div className="UserHeader_profile flex-col sm:py-12 py-6">
            <div className="UserHeader_profileMain flex sm:gap-7 gap-3 justify-between items-center">
              <div className="UserHeader_avatarContainaer">
                <AvatarIcon className="sm:w-28 sm:h-28 w-20 h-20" />
              </div>
              <div className="UserHeader_profileMain flex-1">
                <h1 className="UserHeader_userName sm:text-2xl text-xl">
                  {userData.nickname}
                </h1>
                <p className="UserHeader_userBio text-gray-700 text-xs sm:text-sm">{`uid: ${userData.uid}`}</p>
              </div>
            </div>
            <p className="UserHeader_userBio text-gray-700 mt-3">
              {userData.bio || "自己紹介はまだありません"}
            </p>
            <div className="UserHeader_actions mt-3">
              <Link
                href={""}
                type="button"
                className="mx-auto sm:w-1/3 w-full text-white font-semibold bg-indigo-500 border-0 py-2 px-8 hover:bg-indigo-600 rounded-lg text-base text-center"
              >
                プロフィールを編集
              </Link>
            </div>
          </div>
        </header>
        <div className="UserTabs_container max-w-4xl mx-auto">
          <div className="flex align-center">
            <div></div>
          </div>
        </div>

        <div>{nondraftEntries && nondraftEntries.data[0].id}</div>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { uid } = context.query;
  const cookies = nookies.get(context);

  const requestMyPage = async () => {
    const config = {
      headers: { authorization: `Bearer ${cookies.token}` },
    };

    const res = await axios.get("/mypage", config);
    const userData = res.data.data.attributes;
    return { props: { userData } };
  };

  const requestUserPage = async () => {
    const res = await axios.get(`/users/${uid}`);
    const userData = res.data.data.attributes;
    return { props: { userData } };
  };

  const requestData = () => {
    if (uid === cookies.uid) {
      return requestMyPage();
    } else {
      return requestUserPage();
    }
  };

  return requestData();
};

import { GetServerSideProps } from "next";
import nookies from "nookies";
import { Container } from "@nextui-org/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { UserData } from "types/types";
import axios from "axios";
import { AvatarIcon } from "components/Icons";
import { EntryListItem } from "components/entries/EntryListItem";

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
                <p className="UserHeader_userBio text-gray-700 text-xs sm:text-sm mt-1">{`uid: ${userData.uid}`}</p>
              </div>
            </div>
            <p className="UserHeader_userBio text-gray-700 mt-3">
              {userData.bio || "自己紹介はまだありません"}
            </p>
            {isMypage && (
              <div className="UserHeader_actions mt-4">
                <Link
                  href="/settings/profile"
                  type="button"
                  className="mx-auto sm:w-1/3 w-full text-gray-100 font-semibold bg-indigo-500 border-0 py-2 px-8 hover:bg-indigo-600 rounded-md text-sm text-center"
                >
                  プロフィールを編集
                </Link>
              </div>
            )}
          </div>
        </header>
        <div className="UserTabs_container max-w-4xl mx-auto">
          <div className="flex align-center">
            <Tabs className="w-full">
              <TabList>
                <div className="flex flex-row justify-between sm:px-16 px-2 sm:max-w-xl mx-auto">
                  <Tab className="hover:bg-slate-100 hover:text-gray-900 font-semibold rounded-lg px-6 py-2 cursor-pointer text-lg text-gray-500">
                    記録
                  </Tab>
                  {isMypage && (
                    <Tab className="hover:bg-slate-100 hover:text-gray-900 font-semibold rounded-lg px-8 py-2 cursor-pointer text-lg text-gray-500">
                      下書き
                    </Tab>
                  )}
                  {!isMypage && (
                    <Tab className="font-semibold px-8 py-2 text-lg" disabled>
                      下書き
                    </Tab>
                  )}
                  {isMypage && (
                    <Tab className="hover:bg-slate-100 hover:text-gray-900 font-semibold rounded-lg px-8 py-2 cursor-pointer text-lg text-gray-500">
                      保存
                    </Tab>
                  )}
                  {!isMypage && (
                    <Tab className="font-semibold px-8 py-2 text-lg" disabled>
                      保存
                    </Tab>
                  )}
                </div>
              </TabList>

              <TabPanel>
                {isMypage && (
                  <div className="flex items-center flex-col w-full sm:px-2 sm:gap-2 gap-1">
                    {nondraftEntries && nondraftEntries.data.length > 0
                      ? nondraftEntries.data.map((entry) => (
                          <EntryListItem entry={entry} key={entry.id} />
                        ))
                      : "公開・非公開記録はありません"}
                  </div>
                )}
                {!isMypage && (
                  <div className="flex items-center flex-col w-full sm:px-2 sm:gap-2 gap-1">
                    {publishedEntries && publishedEntries.data.length > 0
                      ? publishedEntries.data.map((entry) => (
                          <EntryListItem entry={entry} key={entry.id} />
                        ))
                      : "公開記録はありません"}
                  </div>
                )}
              </TabPanel>
              <TabPanel>
                <div className="flex items-center flex-col w-full sm:px-2 sm:gap-2 gap-1">
                  {isMypage && draftEntries && draftEntries.data.length > 0
                    ? draftEntries.data.map((entry) => (
                        <EntryListItem entry={entry} key={entry.id} />
                      ))
                    : "下書き記録はありません"}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="flex items-center flex-col w-full sm:px-2 sm:gap-2 gap-1">
                  {isMypage &&
                  bookmarkedEntries &&
                  bookmarkedEntries.data.length > 0
                    ? bookmarkedEntries.data.map((entry) => (
                        <EntryListItem entry={entry} key={entry.id} />
                      ))
                    : "保存した記録はありません"}
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
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

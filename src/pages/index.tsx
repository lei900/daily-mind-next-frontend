import { useState } from "react";
import {
  Container,
  Spacer,
  Grid,
  Card,
  Row,
  Col,
  Modal,
} from "@nextui-org/react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";

import { useAuthContext } from "context/AuthContext";
import { CommunityList } from "components/communities/communityList";
import { ExerciseSection } from "components/home/ExerciseSection";
import { HeroSection } from "components/home/HeroSection";
import engineerIcon from "components/communities/images/engineerIcon.png";
import careerIcon from "components/communities/images/engineerIcon.png";
import lifeIcon from "components/communities/images/engineerIcon.png";
import otherIcon from "components/communities/images/engineerIcon.png";
import diaryIcon from "components/home/images/diaryIcon.png";
import analysisIcon from "components/home/images/analysisIcon.png";
import {
  BlackAndWhiteThinking,
  Overgeneralization,
  Personalization,
  ShouldStatements,
  MagnificationAndMinimization,
  MentalFilter,
  DisqualifyPositive,
  MindReading,
  FortuneTeller,
  Labeling,
  EmotionalReasoning,
} from "components/entries/thought-analyses/distortionIcon";
import {
  Great,
  Good,
  Neutral,
  Bad,
  Terrible,
  GlobeAsiaIcon,
  BookmarkIcon,
  ChatIcon,
  HeartIcon,
  MoreIcon,
  ExclamationCircleIcon,
} from "components/Icons";
import { entryCardInfo } from "types/types";

interface entry {
  id: number;
  entryableType: string;
  status: string;
  user: {
    uid: string;
    avatar: string;
    nickname: string;
  };
  diary: {
    title: string;
    body: string;
    mood: ({ className }: { className?: string | undefined }) => JSX.Element;
  } | null;
  community: {
    id: number;
    name: string;
    icon: StaticImageData;
  } | null;
  thoughtAnalysis: {
    negativeThought: string;
    newThought: string;
  } | null;
  distortions:
    | {
        id: number;
        name: string;
        icon: ({
          className,
        }: {
          className?: string | undefined;
        }) => JSX.Element;
      }[]
    | null;
}

const ENTRIES: entry[] = [
  {
    id: 1,
    entryableType: "Diary",
    status: "published",
    user: {
      uid: "GQeQoXhM4aQOoKeGQxd12kuE7VN2",
      avatar:
        "https://pbs.twimg.com/profile_images/1517837311631040514/aCaLxlJ1_normal.jpg",
      nickname: "Lei",
    },
    diary: {
      title: "上司に叱れた、もう辞めたい",
      body: "先週提出した提案書、結構完璧だと思ったけど、また受注できなかった。\n\n上司はまた頑張ろうと言ってくれたけど、本当は失望しているだろう。情けない。\n\nこんなダメな私は、やっぱりこの仕事に向いていないだろう。",
      mood: Terrible,
    },
    community: {
      id: 1,
      name: "日常生活",
      icon: lifeIcon,
    },
    thoughtAnalysis: null,
    distortions: null,
  },
  {
    id: 2,
    entryableType: "ThoughtAnalysis",
    status: "published",
    user: {
      uid: "GQeQoXhM4aQOoKeGQxd12kuE7VN2",
      avatar:
        "https://lh3.googleusercontent.com/a/ALm5wu32vHBl6Mz_K6eEb3fTK5yNsGk-1Ktnaf5HjXTJgg=s96-c",
      nickname: "Lei",
    },
    diary: null,
    community: {
      id: 1,
      name: "職場キャリア",
      icon: careerIcon,
    },
    thoughtAnalysis: {
      negativeThought:
        "いつも失敗している。このままじゃクビになったらどうしよう。",
      newThought:
        "いつも失敗している訳ではない。この間の提案は結構良いと言われた。ただ今期予算が足りないということだけだ。\n\n受注できないのは、いろんな原因があり、私のせいではない。営業側ともっと連携できたら良いかも。\n\nクビになるのは考え過ぎたな。未来のことは、誰も予測できないし。私はそんなにダメなわけでもない。",
    },
    distortions: [
      { id: 1, name: "白黒思考", icon: BlackAndWhiteThinking },
      { id: 2, name: "過度の一般化", icon: Overgeneralization },
    ],
  },
  {
    id: 3,
    entryableType: "Diary",
    status: "published",
    user: {
      uid: "GQeQoXhM4aQOoKeGQxd12kuE7VN2",
      avatar:
        "https://lh3.googleusercontent.com/a/ALm5wu32vHBl6Mz_K6eEb3fTK5yNsGk-1Ktnaf5HjXTJgg=s96-c",
      nickname: "Lei",
    },
    diary: {
      title: "上司に叱れた、もう辞めたい",
      body: "先週提出した提案書、結構完璧だと思ったけど、また受注できなかった。\n\n上司はまた頑張ろうと言ってくれたけど、本当は失望しているだろう。情けない。\n\nこんなダメな私は、やっぱりこの仕事に向いていないだろう。",
      mood: Bad,
    },
    community: {
      id: 1,
      name: "日常生活",
      icon: lifeIcon,
    },
    thoughtAnalysis: null,
    distortions: null,
  },
  {
    id: 4,
    entryableType: "ThoughtAnalysis",
    status: "published",
    user: {
      uid: "GQeQoXhM4aQOoKeGQxd12kuE7VN2",
      avatar:
        "https://lh3.googleusercontent.com/a/ALm5wu32vHBl6Mz_K6eEb3fTK5yNsGk-1Ktnaf5HjXTJgg=s96-c",
      nickname: "Lei",
    },
    diary: null,
    community: {
      id: 1,
      name: "職場キャリア",
      icon: careerIcon,
    },
    thoughtAnalysis: {
      negativeThought:
        "いつも失敗している。このままじゃクビになったらどうしよう。",
      newThought:
        "いつも失敗している訳ではない。この間の提案は結構良いと言われた。ただ今期予算が足りないということだけだ。\n\n受注できないのは、いろんな原因があり、私のせいではない。営業側ともっと連携できたら良いかも。\n\nクビになるのは考え過ぎたな。未来のことは、誰も予測できないし。私はそんなにダメなわけでもない。",
    },
    distortions: [
      { id: 1, name: "白黒思考", icon: BlackAndWhiteThinking },
      { id: 2, name: "過度の一般化", icon: Overgeneralization },
    ],
  },
  {
    id: 5,
    entryableType: "Diary",
    status: "published",
    user: {
      uid: "GQeQoXhM4aQOoKeGQxd12kuE7VN2",
      avatar:
        "https://lh3.googleusercontent.com/a/ALm5wu32vHBl6Mz_K6eEb3fTK5yNsGk-1Ktnaf5HjXTJgg=s96-c",
      nickname: "Lei",
    },
    diary: {
      title: "上司に叱れた、もう辞めたい",
      body: "先週提出した提案書、結構完璧だと思ったけど、また受注できなかった。\n\n上司はまた頑張ろうと言ってくれたけど、本当は失望しているだろう。情けない。\n\nこんなダメな私は、やっぱりこの仕事に向いていないだろう。",
      mood: Bad,
    },
    community: {
      id: 1,
      name: "日常生活",
      icon: lifeIcon,
    },
    thoughtAnalysis: null,
    distortions: null,
  },
  {
    id: 6,
    entryableType: "ThoughtAnalysis",
    status: "published",
    user: {
      uid: "GQeQoXhM4aQOoKeGQxd12kuE7VN2",
      avatar:
        "https://lh3.googleusercontent.com/a/ALm5wu32vHBl6Mz_K6eEb3fTK5yNsGk-1Ktnaf5HjXTJgg=s96-c",
      nickname: "Lei",
    },
    diary: null,
    community: {
      id: 1,
      name: "職場キャリア",
      icon: careerIcon,
    },
    thoughtAnalysis: {
      negativeThought:
        "いつも失敗している。このままじゃクビになったらどうしよう。",
      newThought:
        "いつも失敗している訳ではない。この間の提案は結構良いと言われた。ただ今期予算が足りないということだけだ。\n\n受注できないのは、いろんな原因があり、私のせいではない。営業側ともっと連携できたら良いかも。\n\nクビになるのは考え過ぎたな。未来のことは、誰も予測できないし。私はそんなにダメなわけでもない。",
    },
    distortions: [
      { id: 1, name: "白黒思考", icon: BlackAndWhiteThinking },
      { id: 2, name: "過度の一般化", icon: Overgeneralization },
    ],
  },
];

const entryCardInfos = [
  {
    id: 1,
    kind: "dairy",
    url: "/diaries/new",
    title: "今日の気持ち",
    src: diaryIcon,
  },
  {
    id: 2,
    kind: "thought analysis",
    url: "/thought-analyses/new",
    title: "ゆがみ分析",
    src: analysisIcon,
  },
];

export default function Home() {
  const { currentUser, loading } = useAuthContext();
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const handleClickEntry = (item: entryCardInfo) => {
    if (!loading && !currentUser) {
      setVisible(true);
    } else {
      router.push(item.url);
    }
  };

  const closeHandler = () => {
    setVisible(false);
  };

  const EntrySection = () => {
    return (
      <section className="text-gray-800 mx-auto">
        <header className="container mx-auto flex flex-row items-center">
          <h1 className="title sm:text-3xl text-2xl mb-4 font-bold text-gray-700">
            記録
          </h1>
          <Spacer x={0.5} />
          <p className="text-gray-600 sm:text-base text-sm">
            自分の気持ちや悩みを整理しましょう
          </p>
        </header>
        <Grid.Container
          gap={1}
          justify="flex-start"
          css={{
            "@xsMax": { mw: "650px", margin: "auto" },
          }}
        >
          {entryCardInfos.map((item) => (
            <Grid sm={3} xs={6} key={item.id}>
              <Card
                isPressable
                isHoverable
                variant="bordered"
                css={{ mw: "650px", margin: "auto" }}
                onClick={() => handleClickEntry(item)}
              >
                <Card.Body>
                  <Col>
                    <Row justify="center">
                      <Image alt={item.title} src={item.src} width={150} />
                    </Row>
                    <Spacer y={0.5} />
                    <Row justify="center">
                      <h2 className="title sm:text-2xl text-xl font-bold text-gray-700">
                        {item.title}
                      </h2>
                    </Row>
                  </Col>
                </Card.Body>
              </Card>
            </Grid>
          ))}
        </Grid.Container>
      </section>
    );
  };

  return (
    <Container lg className="sm:px-16 md:px-10 px-4 mt-8">
      <HeroSection />
      <Spacer y={2} />
      <ExerciseSection />
      <Spacer y={2} />
      <EntrySection />
      <Spacer y={2} />
      <section className="text-gray-800 mx-auto">
        <header className="container mx-auto flex sm:flex-row justify-start items-center">
          <h1 className="title sm:text-3xl text-2xl mb-4 font-bold text-gray-700">
            コミュニティ
          </h1>
          <Spacer x={0.5} />
          <p className="text-gray-600 sm:text-base text-sm">
            みんなで励まし合いましょう
          </p>
        </header>
        <CommunityList />
        <Spacer y={0.5} />
        <div className="flex items-center flex-col max-w-3xl px-2 gap-2">
          {ENTRIES.map((entry) => (
            <Card
              variant="flat"
              className="bg-white flex flex-row cursor-pointer rounded-lg hover:bg-gray-50 p-4 gap-2 border-slate-300"
              key={entry.id}
            >
              <div className="flex">
                <div className="sm:w-12 sm:h-12 w-8 h-8">
                  <Image
                    src={entry.user.avatar}
                    width={48}
                    height={48}
                    alt="Avatar"
                    className="rounded-full"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row items-center gap-0.5">
                    <div className="inline-block mr-1 sm:text-xl text-lg text-gray-700">
                      {entry.user.nickname}
                    </div>
                    {entry.diary && <entry.diary.mood />}
                  </div>
                  <div className="group rounded-full p-2 hover:bg-blue-100">
                    <MoreIcon />
                  </div>
                </div>
                <div className="p-0">
                  {entry.diary && (
                    <>
                      <div className="font-semibold text-gray-700 mb-1 text-sm sm:text-base">
                        {entry.diary.title}
                      </div>
                      <div className="whitespace-pre-line text-sm sm:text-base">
                        {entry.diary.body}
                      </div>
                    </>
                  )}
                  {entry.thoughtAnalysis && (
                    <>
                      <div className="font-semibold text-gray-700 mb-1 text-sm sm:text-base">
                        {entry.thoughtAnalysis.negativeThought}
                      </div>
                      {entry.distortions && (
                        <Row align="center" wrap="wrap" className="my-2">
                          {entry.distortions.map((distortion) => (
                            <Row
                              gap={1}
                              align="center"
                              className="bg-sky-100 w-fit py-1 px-2 m-1 rounded-lg"
                              key={distortion.id}
                            >
                              <distortion.icon className="w-4 h-4" />
                              <p className="sm:text-sm text-xs pl-1">
                                {distortion.name}
                              </p>
                            </Row>
                          ))}
                        </Row>
                      )}

                      <div className="whitespace-pre-line text-sm sm:text-base">
                        {entry.thoughtAnalysis.newThought}
                      </div>
                    </>
                  )}
                  {entry.community && (
                    <div className="flex my-3">
                      <button className="bg-slate-100 rounded-2xl flex flex-row pl-2 pr-3 py-2 gap-0.5 items-center hover:bg-slate-200">
                        <GlobeAsiaIcon />
                        <p className="text-xs sm:text-sm text-sky-600 font-medium">
                          {entry.community.name}
                        </p>
                      </button>
                    </div>
                  )}
                  <Card.Footer className="flex flex-row py-0 px-0 justify-between items-center">
                    <button className="group inline-flex items-center p-2 rounded-xl hover:bg-pink-100">
                      <HeartIcon className="stroke-gray-500	w-5 h-5 group-hover:stroke-pink-500" />
                      <span className="text-xs text-gray-500 px-1 group-hover:text-pink-500">
                        応援
                      </span>
                    </button>
                    <button className="group inline-flex items-center p-2 rounded-xl hover:bg-blue-100">
                      <ChatIcon className="stroke-gray-500 w-5 h-5 group-hover:stroke-blue-500" />
                      <span className="text-xs text-gray-500 px-1 group-hover:text-blue-500">
                        コメント
                      </span>
                    </button>
                    <button className="group inline-flex items-center p-2 rounded-xl hover:bg-blue-100">
                      <BookmarkIcon className="stroke-gray-500 w-5 h-5 group-hover:stroke-blue-500" />
                      <span className="text-xs text-gray-500 px-1 group-hover:text-blue-500">
                        保存
                      </span>
                    </button>
                  </Card.Footer>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
      <Spacer y={4} />
      <Modal
        closeButton
        aria-labelledby="modal-title"
        width="45em"
        open={visible}
        onClose={closeHandler}
        className="sm:w-3/5 mx-auto py-4"
      >
        <Modal.Header className="flex-col">
          <ExclamationCircleIcon className="sm:w-24 h-24 stroke-amber-500" />
          <h1
            id="modal-title"
            className="sm:text-2xl text-xl font-semibold text-gray-700 my-3"
          >
            ログインしてください
          </h1>
        </Modal.Header>
        <Modal.Body className="mx-auto">
          <p className="sm:text-base text-base text-gray-700">
            記録作成にはログインが必要です。
          </p>
        </Modal.Body>
        <Modal.Footer className="mx-auto gap-5">
          <button
            className="block rounded-lg bg-gray-500 px-6 py-3 text-white transition hover:bg-gray-700 focus:outline-none focus:ring"
            onClick={closeHandler}
          >
            <span className="text-base font-semibold">キャンセル</span>
          </button>
          <button
            className="block rounded-lg bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
            onClick={() => {
              router.push("/login");
            }}
          >
            <span className="text-base font-semibold">ログインへ</span>
          </button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

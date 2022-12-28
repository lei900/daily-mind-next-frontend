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
import Image from "next/image";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import fetch from "node-fetch";

import { useAuthContext } from "context/AuthContext";
import { CommunityList } from "components/communities/communityList";
import { ExerciseSection } from "components/home/ExerciseSection";
import { HeroSection } from "components/home/HeroSection";
import diaryIcon from "components/home/images/diaryIcon.png";
import analysisIcon from "components/home/images/analysisIcon.png";
import { ExclamationCircleIcon } from "components/Icons";
import { EntryCardInfo, EntryData } from "types/types";
import { EntryListItem } from "components/entries/EntryListItem";

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
const ENTRIES: EntryData[] = [
  {
    id: 2,
    attributes: {
      entryableType: "ThoughtAnalysis",
      status: "published",
      user: {
        uid: "testuid1",
        avatar: "avatar",
        nickname: "User_test",
        role: "gerenal",
        bio: null,
      },
      diary: null,
      community: {
        id: 2,
        name: "職場キャリア",
      },
      thoughtAnalysis: {
        negativeThought:
          "いつも失敗している。このままじゃクビになったらどうしよう。",
        newThought:
          "いつも失敗している訳ではない。この間の提案は結構良いと言われた。ただ今期予算が足りないということだけだ。\n\n受注できないのは、いろんな原因があり、私のせいではない。営業側ともっと連携できたら良いかも。\n\nクビになるのは考え過ぎたな。未来のことは、誰も予測できないし。私はそんなにダメなわけでもない。",
      },
      distortions: [
        { id: 1, name: "白黒思考" },
        { id: 2, name: "過度の一般化" },
      ],
    },
  },
];

type Props = {
  entriesData: EntryData[];
};

export default function Home({ entriesData }: Props) {
  const { currentUser, loading } = useAuthContext();
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const handleClickEntry = (item: EntryCardInfo) => {
    if (!loading && !currentUser) {
      setVisible(true);
    } else {
      router.push(item.url);
    }
  };

  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <Container lg className="sm:px-16 md:px-10 px-4 mt-8">
      <HeroSection />
      <Spacer y={2} />
      <ExerciseSection />
      <Spacer y={2} />
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
        <div className="flex items-center flex-col max-w-3xl sm:px-2 sm:gap-2 gap-1">
          {entriesData.map((entry) => (
            <EntryListItem entry={entry} key={entry.id} />
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

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/entries/`
      : "http://127.0.0.1:3001/api/v1/entries/"
  );

  const data = (await res.json()) as any;
  const entriesData = data.data;

  res.headers.set(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return { props: { entriesData } };
};

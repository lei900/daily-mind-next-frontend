import { useState } from "react";
import { Card, Row, Grid, Spacer, Modal, FormElement } from "@nextui-org/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { EntryData } from "types/types";
import useListBox from "hooks/useListBoxt";
import useAxios from "hooks/useAxios";
import CommunityListBox from "../CommunityListBox";
import StatusListBox from "../StatusListBox";
import { FightIcon, IdeaIcon, InformationCircleIcon } from "components/Icons";
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
  DistortionInfo,
  Community,
  EntryRequestData,
  Status,
  DistortionIds,
} from "types/types";

const distortionArray = [
  {
    id: 1,
    name: "白黒思考",
    definition:
      "好きか嫌いか、成功か失敗か、YESかNOか、灰色さえない、物事を白か黒かという極端的な視点で考える。",
    description: [
      "有能か無能か、仕事ができるかできないかといった二択の基準だけで人を判断する。",
      "「一流企業に入れないのなら、就職は完全に失敗だ。」",
      "「1位になれないなら、チャレンジする意味がない。」",
      "「99点だったけど100点でなければ0点と同じだ。」",
    ],
    brief: "例:「成功しなければ努力は全部無駄になる」",
    icon: BlackAndWhiteThinking,
  },
  {
    id: 2,
    name: "過度の一般化",
    definition:
      "たった一つか二つの事例から、全てのことが同様の結果になるだろうと結論づけてしまう。",
    description: [
      "一度、お茶の誘いを断られると、「自分は一生誰からも好かれない」と思い込んでしまう。",
      "仕事が思ったように進まないときに、過去の失敗を思い出して、「なんで仕事はいつもうまくいかないんだろう」と思ってしまう。",
    ],
    brief: "例:「なんでいつもうまくいかないんだろう」",
    icon: Overgeneralization,
  },
  {
    id: 3,
    name: "自分への関連付け",
    definition:
      "何か良くないことが起こった時、なんでも自分に原因があるかのように考えて、自分を責めてしまう。",
    description: [
      "「この案件を取れなかったのは、きっと私のプレゼンが足りなかったからだ」",
      "「夫が職場でミスを犯したのは、今朝私が朝食の準備を遅らせたせいだ」",
      "「子どもの成績が良くないのは、全て私の責任だ、私がダメな母親だから」",
    ],
    brief: "例:「あの件はきっと私のせいだ」",
    icon: Personalization,
  },
  {
    id: 4,
    name: "すべき思考",
    definition:
      "「～すべき」「～でなくてはならない」と自分で考えた厳しい基準を作り上げて、自分を追い詰めてしまう。他人に対して向けると、怒りや失望を感じる。",
    description: [
      "「社会人だから、会社の飲み会は積極的に参加すべき。」",
      "「主婦なら家事を完璧にするべきだ。」",
      "「子どもは親の言いつけを守るべきだ。」",
      "「もう40代だから、人生は落ち着くべき。」",
    ],
    brief: "例:「社会人だからこういうミスはあってはならない」",
    icon: ShouldStatements,
  },
  {
    id: 5,
    name: "拡大解釈と過小評価",
    definition:
      "自分の短所や失敗を実際よりも過大に考え、長所や成功を過小評価する。逆に、他人の成功を過大に評価し、他人の失敗を見逃す。",
    description: [
      "自分が些細なミスで失敗すると「なんて無能なのだ」と拡大解釈し、成功しても「こんなことはただ運が良かっただけで、大したことではない」と過小評価してしまう。",
      "自分の長所をもっとアピールするより、自分の短所を他人の長所と比べて落ち込んでしまう。",
    ],
    brief: "例:「周りの人は私よりずっと優秀だ」",
    icon: MagnificationAndMinimization,
  },
  {
    id: 6,
    name: "心のフィルター",
    definition: "良いことを全て無視して、悪いことだけに注目してしまう。",
    description: [
      "試験で97問正解取れたけど、間違えた3問だけにこだわってしまう。",
      "社内でたくさんの好評をもらったにも関わらず、ある人から受けた一つの指摘が頭から離れず落ち込んでしまう。",
      "悪いことばかり考えて、自分の人生には何も良いことがないと思ってしまう。",
    ],
    brief: "例:「私の人生には良いことなんて一つもないんだ」",
    icon: MentalFilter,
  },
  {
    id: 7,
    name: "マイナス化思考",
    definition:
      "単に良いことを無視するのでなく、なんでもないことや良いことを全て悪い方向に考えしてまう。良いことがあっても喜びを感じられない。",
    description: [
      "仕事が上手くいかないと「やっぱりそうなんだ」と思い、上手くいっても「これはまぐれだ」と考える。",
      "友達がたくさんできても、「私のことを知らないだけで、本当の私を知ったら、絶対に離れていく」と考える。",
      "たとえ受賞しても、「こんな私でも受賞できたのは運が良かっただけ」と努力で得た成果を否定する。",
    ],
    brief: "例:「今回の成果は運が良かっただけ」",
    icon: DisqualifyPositive,
  },
  {
    id: 8,
    name: "心の読みすぎ",
    definition:
      "はっきりとした根拠がないまま、相手が考えていることや相手の行動の意図を、悲観的に結論づけてしまう。",
    description: [
      "誘いを断れたら、「きっと私のことを見下しているだろう」と思い込んでしまう。",
      "上司から返信が来ない時、「私なんて役に立たないやつと思われている」と考え始める。",
      "「LINEの返事がこない。私の話はつまらないと思ってるだろ」",
    ],
    brief: "例:「きっと私は嫌われている」",
    icon: MindReading,
  },
  {
    id: 9,
    name: "先読みの誤り",
    definition: "まるで不幸しか見えない占い師のように、悲観的な予言をする。",
    description: [
      "「私は一生幸せになれないんだ。」",
      "「この仕事は絶対うまくいかないんだ。」",
      "「この不幸は永遠に続く。」",
    ],
    brief: "例:「絶対うまくいかないんだ」",
    icon: FortuneTeller,
  },
  {
    id: 10,
    name: "レッテル貼り",
    definition:
      "自分や他人に否定的なラベルをつけてイメージを固定化する。過度の一般化より極端になるケース。",
    description: [
      "「彼はゆとり世代だから根性なしだろう。」",
      "「彼は勝ち組で、私はただの負け犬だ。」",
      "一度失敗したら、失敗の原因を考えるわかりに、「自分はやっぱりダメな人間だ」と考える。",
    ],
    brief: "例:「私はやはりダメな人間だ」",
    icon: Labeling,
  },
  {
    id: 11,
    name: "感情による決めつけ",
    definition:
      "客観的な事実ではなく、自分の感情に基づいて、結論を決めつけてしまう。",
    description: [
      "「嫌な感じがするから、きっと何か悪いことが起こった。」",
      "「私はダメな人間のように感じているから、やはり私は価値のない人間だ。」",
      "「さっきのプレゼンはうまくできていない」と感じて、自分の気持ちを真実のように信じてしまい、落ち込んでしまう。",
    ],
    brief: "例:「こんなに不安なんて、やはり私の悪いんだ」",
    icon: EmotionalReasoning,
  },
];

type Props = {
  entryData?: EntryData;
  distortionIds?: DistortionIds;
};

interface thoughtInputs {
  negatetiveThought: string;
  distortions: DistortionInfo[] | [];
  newThought: string;
}

export default function AnalysisForm({ entryData, distortionIds }: Props) {
  const { statuses, selectedEntryCommunity, selectedEntryStatus } =
    useListBox();
  const [showNegaThoughtSection, setShowNegaThoughtSection] = useState(true);
  const [showNegaThoughtInfo, setShowNegaThoughtInfo] = useState(true);
  const [showDistortionSection, setShowDistortionSection] = useState(false);
  const [showDistortionInfo, setShowDistortionInfo] = useState(false);
  const [showNewThoughtSection, setShowNewThoughtSection] = useState(false);
  const [showNewThoughInfo, setShowNewThoughtInfo] = useState(false);
  const [visible, setVisible] = useState(false);
  const [distortionToModal, setDistortionToModal] = useState<DistortionInfo>();
  const [thoughtInputs, setThoughtInputs] = useState<thoughtInputs>({
    negatetiveThought:
      entryData?.attributes.thoughtAnalysis?.negative_thought || "",
    distortions: [],
    newThought: entryData?.attributes.thoughtAnalysis?.new_thought || "",
  });
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(
    entryData && entryData.attributes.community
      ? selectedEntryCommunity(entryData.attributes.community.id)
      : null
  );
  const [selectedStatus, setSelectedStatus] = useState(
    entryData ? selectedEntryStatus(entryData.attributes.status) : statuses[0]
  );
  const { axioRequest } = useAxios();

  const entry = entryData;
  const isAddMode = !entry;

  const handleNegaInputChange = (e: React.ChangeEvent<FormElement>) => {
    setThoughtInputs({
      ...thoughtInputs,
      negatetiveThought: e.target.value,
    });
  };

  const handleDistortionConfirm = (distortion: DistortionInfo) => {
    if (isSelected(distortion)) {
      setThoughtInputs({
        ...thoughtInputs,
        distortions: thoughtInputs.distortions.filter(
          (d) => d.id !== distortion.id
        ),
      });
    } else {
      setThoughtInputs({
        ...thoughtInputs,
        distortions: [
          ...thoughtInputs.distortions,
          {
            id: distortion.id,
            name: distortion.name,
            definition: distortion.definition,
            description: distortion.description,
            brief: distortion.brief,
            icon: distortion.icon,
          },
        ],
      });
    }
    closeHandler();
  };

  const handleNewInputChange = (e: React.ChangeEvent<FormElement>) => {
    setThoughtInputs({
      ...thoughtInputs,
      newThought: e.target.value,
    });
  };

  const isSelected = (distortion: DistortionInfo) => {
    return thoughtInputs.distortions.some((d) => d.id === distortion.id);
  };

  const handleOpenDistortionModal = (distortion: DistortionInfo) => {
    setDistortionToModal(distortion);
    setVisible(true);
  };

  const closeHandler = () => {
    setVisible(false);
  };

  const handleGoDistortionSection = () => {
    if (thoughtInputs.negatetiveThought) {
      setShowNegaThoughtSection(false);
      setShowNegaThoughtInfo(false);
      setShowDistortionSection(true);
      setShowDistortionInfo(true);
    } else {
      toast.info("ネガティブ思考を記入してください。");
    }
  };

  const handleBackToNegaSection = () => {
    setShowDistortionSection(false);
    setShowDistortionInfo(false);
    setShowNegaThoughtSection(true);
    setShowNegaThoughtInfo(true);
  };

  const handleGoNewThoughtSection = () => {
    setShowDistortionSection(false);
    setShowDistortionInfo(false);
    setShowNewThoughtSection(true);
    setShowNewThoughtInfo(true);
  };

  const handleBackToDistortionSection = () => {
    setShowNewThoughtSection(false);
    setShowNewThoughtInfo(false);
    setShowDistortionSection(true);
    setShowDistortionInfo(true);
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const distortionIds: DistortionIds = thoughtInputs.distortions!.map(
      (d) => d.id
    ) as DistortionIds;

    const data: EntryRequestData = {
      entry: {
        entryable_type: "ThoughtAnalysis",
        status: selectedStatus.name as Status,
        community_id: selectedCommunity?.id || null,
        distortion_ids: distortionIds,
        entryable_attributes: {
          negative_thought: thoughtInputs.negatetiveThought,
          new_thought: thoughtInputs.newThought,
        },
      },
    };

    if (!thoughtInputs.newThought) {
      toast.info("反論を書き出てみしましょう。");
    } else {
      return isAddMode ? createAnalysis(data) : updateAnalysis(entry.id, data);
    }
  };

  function createAnalysis(data: EntryRequestData) {
    const method = "post";
    const url = "/entries";
    const onSuccess = {
      msg: "分析記録が作成しました！",
      redirectUrl: "/thought-analyses/new/feedback",
    };
    const onFailure = {
      msg: "分析記録が作成できませんでした",
      redirectUrl: "",
    };

    axioRequest(method, url, onSuccess, onFailure, data);
  }

  function updateAnalysis(id: number, data: EntryRequestData) {
    const method = "patch";
    const url = `/entries/${id}`;
    const onSuccess = {
      msg: "分析記録が更新しました！",
      redirectUrl: `/entries/${id.toString()}`,
    };
    const onFailure = {
      msg: "分析記録が更新できませんでした",
      redirectUrl: "",
    };

    axioRequest(method, url, onSuccess, onFailure, data);
  }

  return (
    <div className="container sm:px-5 px-1 sm:mt-10 mt-6 mx-auto">
      <div className="lg:w-1/2 md:w-2/3 mx-auto">
        <form onSubmit={onSubmit}>
          {showNegaThoughtSection && (
            <section className="p-2 w-full">
              <div className="mx-auto">
                <div className="sm:mr-10">
                  <h1 className="sm:text-2xl text-xl text-center font-semibold text-gray-700 ">
                    どのようなネガティブ思考が浮かんでいたか？
                  </h1>
                  <Spacer y={1} />
                  <Row
                    className="sm:w-40 mx-auto p-2 rounded-lg justify-center items-center cursor-pointer hover:bg-gray-100"
                    onClick={() => setVisible(true)}
                  >
                    <InformationCircleIcon className="w-6 h-6 inline-block" />
                    <p className="sm:text-lg text-base text-center text-gray-700 ">
                      自動思考とは
                    </p>
                  </Row>
                </div>

                <div className="p-2 w-full">
                  <div className="relative">
                    <textarea
                      value={thoughtInputs.negatetiveThought}
                      aria-label="Negative thought"
                      id="negative-thought"
                      name="negative-thought"
                      rows={10}
                      placeholder="頭の中に浮かんだイヤな考えやイメージを書き出しましょう"
                      className="w-full rounded-2xl bg-blue-300 bg-opacity-50 focus:shadow sm:text-lg text-base outline-none  text-blue-600 py-3 px-3 focus:bg-blue-200"
                      onChange={handleNegaInputChange}
                    ></textarea>
                  </div>
                </div>
                <div className="p-2 w-full sm:mt-10 mt-6">
                  <button
                    type="button"
                    className="block mx-auto sm:w-1/2 w-full text-white font-semibold bg-indigo-500 border-0 py-4 focus:outline-none hover:bg-indigo-600 rounded-xl sm:text-lg"
                    onClick={handleGoDistortionSection}
                  >
                    続ける
                  </button>
                </div>
              </div>
            </section>
          )}
          {showDistortionSection && (
            <section className="p-2 w-full">
              <div className="relative mx-auto">
                <div className="sm:mr-10">
                  <h1 className="sm:text-2xl text-xl text-center font-semibold text-gray-700 ">
                    その考えには、ゆがみがありますか？
                  </h1>
                  <p className="sm:text-base text-sm text-center sm:mb-10 mb-6 text-gray-700">
                    自分に当てはまると思うゆがみを選んでください。
                  </p>
                </div>
                <div>
                  {distortionArray.map((distortion) => (
                    <Card
                      isPressable
                      variant="bordered"
                      className={`${
                        isSelected(distortion) ? "bg-blue-200" : "bg-blue-50"
                      } border-none focus:outline-none hover:bg-blue-300 rounded-xl pl-4 my-2 mx-auto`}
                      onClick={() => handleOpenDistortionModal(distortion)}
                      key={distortion.id}
                    >
                      <Card.Header>
                        <distortion.icon />
                        <Grid.Container gap={0.5} css={{ pl: "$6" }}>
                          <Grid xs={12} className="">
                            <h2 className="sm:text-xl text-lg  text-gray-900">
                              {distortion.name}
                            </h2>
                          </Grid>
                          <Grid xs={12}>
                            <p className="sm:text-sm text-xs text-gray-600">
                              {distortion.brief}
                            </p>
                          </Grid>
                        </Grid.Container>
                      </Card.Header>
                    </Card>
                  ))}
                </div>
                <Row className="p-2 w-full sm:mt-10 mt-6">
                  <button
                    type="button"
                    className="block mx-auto text-white font-semibold bg-indigo-500 border-0 w-1/3 py-4 focus:outline-none hover:bg-indigo-600 rounded-xl sm:text-lg"
                    onClick={handleBackToNegaSection}
                  >
                    前へ
                  </button>
                  <button
                    type="button"
                    className="block mx-auto  text-white font-semibold bg-indigo-500 border-0 w-1/3 py-4 focus:outline-none hover:bg-indigo-600 rounded-xl sm:text-lg"
                    onClick={handleGoNewThoughtSection}
                  >
                    続ける
                  </button>
                </Row>
              </div>
            </section>
          )}
          {showNewThoughtSection && (
            <section className="p-2 w-full">
              <div className="relative mx-auto">
                <h1 className="sm:text-2xl text-xl text-center font-semibold text-gray-700 ">
                  その考えに反論するために、どうしたら良いですか？
                </h1>
                <Spacer y={0.5} />
                <Row
                  className="sm:w-40 mx-auto p-2 rounded-lg justify-center items-center cursor-pointer hover:bg-gray-100"
                  onClick={() => setVisible(true)}
                >
                  <InformationCircleIcon className="w-6 h-6 inline-block" />
                  <p className="sm:text-lg text-base text-center text-gray-700 ml-2">
                    反論の出し方
                  </p>
                </Row>
                <Spacer y={1} />
                <Row align="center" wrap="wrap" className="px-2">
                  {thoughtInputs.distortions.map((distortion) => (
                    <Row
                      gap={1}
                      align="center"
                      className="bg-blue-100 w-fit py-1 px-2 m-1 rounded-lg"
                      key={distortion.id}
                    >
                      <distortion.icon className="w-4 h-4" />
                      <p className="sm:text-sm text-xs pl-1">
                        {distortion.name}
                      </p>
                    </Row>
                  ))}
                </Row>
                <div className="p-2 w-full">
                  <div className="relative">
                    <textarea
                      value={thoughtInputs.newThought}
                      aria-label="New thought"
                      id="new-thought"
                      name="new-thought"
                      rows={10}
                      placeholder="ネガティブ思考に反論を書き出しましょう"
                      className="w-full rounded-2xl bg-blue-300 bg-opacity-50 focus:shadow sm:text-lg text-base outline-none  text-blue-600 py-3 px-3 focus:bg-blue-200"
                      onChange={handleNewInputChange}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="flex justify-between px-2 mt-2 w-full">
                <CommunityListBox
                  selectedCommunity={selectedCommunity}
                  setSelectedCommunity={setSelectedCommunity}
                />
                <StatusListBox
                  selectedStatus={selectedStatus}
                  setSelectedStatus={setSelectedStatus}
                />
              </div>
              <Row className="sm:p-2 w-full sm:mt-10 mt-6">
                <button
                  type="button"
                  className="block mx-auto text-white font-semibold bg-indigo-500 border-0 py-4 px-8 focus:outline-none hover:bg-indigo-600 rounded-xl sm:text-lg text-base"
                  onClick={handleBackToDistortionSection}
                >
                  前へ
                </button>
                <button
                  type="submit"
                  className="block mx-auto  text-white font-semibold bg-indigo-500 border-0 py-4 px-10 focus:outline-none hover:bg-indigo-600 rounded-xl sm:text-lg text-base"
                >
                  作成する
                </button>
              </Row>
            </section>
          )}
          <Modal
            aria-labelledby="modal-title"
            width="50em"
            open={visible}
            onClose={closeHandler}
            className="sm:w-4/5 mx-auto"
          >
            {showDistortionInfo && (
              <Modal.Header className="py-6">
                {distortionToModal && <distortionToModal.icon />}
                <Spacer x={1} />
                <h1
                  id="modal-title"
                  className="sm:text-3xl text-2xl font-semibold text-gray-700"
                >
                  {distortionToModal?.name}
                </h1>
              </Modal.Header>
            )}

            <Modal.Body>
              {showNegaThoughtInfo && (
                <div className="sm:p-4 mx-auto">
                  <Row justify="center" align="center">
                    <IdeaIcon />
                    <h2 className="sm:text-2xl text-lg font-semibold text-gray-700">
                      自動思考とは
                    </h2>
                  </Row>
                  <Spacer y={1.5} />
                  <p className="sm:text-lg text-base text-left text-gray-700">
                    自動的に根拠なく思い浮かぶ考えは「自動思考」と言います。
                  </p>
                  <p className="sm:text-lg text-base text-left text-gray-700">
                    自分で考えているつもりはないのに、
                    <strong className="sm:text-lg text-base border-b-2 border-purple-700 text-gray-700 border-opacity-50">
                      瞬間的に頭に浮かんでくる
                    </strong>
                    考えやイメージです。
                  </p>
                  <Spacer y={1} />
                  <h3 className="sm:text-lg text-base text-left">例：</h3>
                  <p className="sm:text-lg text-base text-left text-gray-700">
                    「どうぜまた嫌われるんだろう」
                  </p>
                  <p className="sm:text-lg text-base text-left text-gray-700">
                    「なんなんだあの人、ひどい」
                  </p>
                  <p className="sm:text-lg text-base text-left text-gray-700">
                    「また怒られた! なんで毎回こうなんだ」
                  </p>
                  <p className="sm:text-lg text-base text-left text-gray-700">
                    「今度失敗したら、もう終わりだ」
                  </p>
                  <p className="sm:text-lg text-base text-left text-gray-700">
                    「やってしまった! 私は本当ダメ人間だ」
                  </p>
                </div>
              )}
              {showDistortionInfo && (
                <div className="mx-auto px-4">
                  <p className="text-lg sm:text-xl font-semibold">定義：</p>
                  <p className="sm:text-xl text-lg text-gray-800">
                    {distortionToModal?.definition}
                  </p>
                  <br />
                  <p className="text-lg sm:text-xl font-semibold">具体例：</p>

                  {distortionToModal?.description.map((desc, index) => (
                    <li
                      className="sm:text-xl text-lg text-gray-800 pl-4"
                      key={index}
                    >
                      {desc}
                    </li>
                  ))}
                </div>
              )}
              {showNewThoughInfo && (
                <div className="sm:p-8 p-2 mx-auto">
                  <Row justify="center" align="center">
                    <FightIcon />
                    <h2 className="sm:text-2xl text-lg font-semibold text-gray-700 pl-2">
                      反論の出し方
                    </h2>
                  </Row>
                  <Spacer y={1} />
                  <p className="sm:text-lg text-base text-left text-gray-700">
                    自動思考と矛盾する事実や自分に対してのアドバイスを書き出してみましょう。
                  </p>
                  <Spacer y={1} />
                  <h3 className="sm:text-lg text-base text-left text-indigo-700 font-semibold">
                    ヒント：
                  </h3>
                  <ul className="list-disc px-6">
                    <li className="sm:text-lg text-base text-left text-gray-700">
                      客観的な事実と自分の考えをちゃんと分けたでしょうか。
                    </li>
                    <li className="sm:text-lg text-base text-left text-gray-700">
                      相手の心を読むような勝手な思い込みや自分の解釈ではないでしょうか。
                    </li>
                    <li className="sm:text-lg text-base text-left text-gray-700">
                      その考えを裏づける根拠となる事実はあるでしょうか。
                    </li>
                    <li className="sm:text-lg text-base text-left text-gray-700">
                      その証拠と矛盾する事実はないでしょうか。
                    </li>
                    <li className="sm:text-lg text-base text-left text-gray-700">
                      見逃していることはないでしょうか。
                    </li>
                    <li className="sm:text-lg text-base text-left text-gray-700">
                      自分の力だけではどうしようもない事柄について自分を責めてはないでしょうか。
                    </li>
                    <li className="sm:text-lg text-base text-left text-gray-700">
                      親しい人が同じような考え方をしていたら、あなたはどのようにアドバイスしますか。
                    </li>
                    <li className="sm:text-lg text-base text-left text-gray-700">
                      その考えが当たっているとして、その先、最悪のシナリオはどんなものでしょう。そして最良のシナリオと一番現実的なシナリオはどんなものでしょう。
                    </li>
                  </ul>
                  <Spacer y={2} />
                  <p className="sm:text-base text-sm text-left text-gray-500">
                    参照：
                  </p>
                  <p className="sm:text-base text-sm text-left text-gray-500">
                    大野裕『こころが晴れるノート
                    うつと不安の認知療法自習帳』（創元社、2003）
                  </p>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              {showDistortionInfo ? (
                <Row justify="center">
                  <button
                    type="button"
                    onClick={() => handleDistortionConfirm(distortionToModal!)}
                    className="block rounded-lg bg-indigo-500 px-8 py-3 text-white  transition hover:bg-indigo-700 focus:outline-none focus:ring"
                  >
                    <span className="text-base sm:text-lg font-semibold">
                      {isSelected(distortionToModal!) ? "選択解除" : "選択する"}
                    </span>
                  </button>
                  <Spacer x={4} />
                  <button
                    type="button"
                    onClick={closeHandler}
                    className="block rounded-lg bg-indigo-500 px-8 py-3 text-white  transition hover:bg-indigo-700 focus:outline-none focus:ring"
                  >
                    <span className="text-base sm:text-lg font-semibold">
                      戻る
                    </span>
                  </button>
                </Row>
              ) : (
                <button
                  type="button"
                  onClick={closeHandler}
                  className="block rounded-lg bg-indigo-500 px-8 py-3 text-white mx-auto transition hover:bg-indigo-700 focus:outline-none focus:ring"
                >
                  <span className="text-base sm:text-lg font-semibold">
                    閉じる
                  </span>
                </button>
              )}
            </Modal.Footer>
          </Modal>
        </form>
      </div>
    </div>
  );
}

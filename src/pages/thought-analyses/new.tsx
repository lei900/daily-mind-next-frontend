import { Fragment, useEffect, useRef, useState } from "react";
import { Card, Col, Row, Grid, Spacer, Modal } from "@nextui-org/react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Listbox, Transition } from "@headlessui/react";
import Image from "next/image";

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
  CheckIcon,
  ChevronUpDownIcon,
  ChevronDownIcon,
  InformationCircleIcon,
} from "components/Icons";
import { DistortionInfo } from "types/types";
import { useAuthContext } from "context/AuthContext";
import { Community } from "types/types";
import engineerIcon from "components/communities/images/engineerIcon.png";
import careerIcon from "components/communities/images/careerIcon.png";
import lifeIcon from "components/communities/images/lifeIcon.png";
import otherIcon from "components/communities/images/otherIcon.png";

const communities = [
  {
    id: 1,
    name: "日常生活",
    image: lifeIcon,
  },
  {
    id: 2,
    name: "職場キャリア",
    image: careerIcon,
  },
  {
    id: 3,
    name: "エンジニア部屋",
    image: engineerIcon,
  },
  {
    id: 4,
    name: "その他",
    image: otherIcon,
  },
];

const statuses = [
  { id: 1, displayName: "公開", name: "published" },
  { id: 2, displayName: "非公開", name: "private" },
  { id: 3, displayName: "下書き", name: "draft" },
];
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

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function NewAnalysisPage() {
  const { currentUser, loading } = useAuthContext();
  const router = useRouter();
  const [distortionModalVisible, setDistortionModalVisible] = useState(false);
  const [distortionToModal, setDistortionToModal] = useState<DistortionInfo>();
  const [selectedDistortions, setSeletecdDistortions] = useState<
    DistortionInfo[]
  >([]);
  const [showDistortionSection, setShowDistortionSection] = useState(false);
  const [showNewThoughtSection, setShowNewThoughtSection] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(
    null
  );
  const [selectedStatus, setSelectedStatus] = useState(statuses[0]);
  const [visible, setVisible] = useState(false);
  const [showAutothoughInfo, setShowAutothoughtInfo] = useState(false);
  const [showDistortionInfo, setShowDistortionInfo] = useState(false);
  const [showNewthoughInfo, setShowNewthoughtInfo] = useState(false);

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push("/login");
    }
  }, [loading, currentUser]);

  const handleConfirm = (distortion: DistortionInfo) => {
    if (isSelected(distortion)) {
      setSeletecdDistortions(
        selectedDistortions.filter((d) => d.id !== distortion.id)
      );
    } else {
      setSeletecdDistortions([
        ...selectedDistortions,
        {
          id: distortion.id,
          name: distortion.name,
          definition: distortion.definition,
          description: distortion.description,
          brief: distortion.brief,
          icon: distortion.icon,
        },
      ]);
    }
    closeHandler();
  };

  const isSelected = (distortion: DistortionInfo) => {
    return selectedDistortions.some((d) => d.id === distortion.id);
  };

  const handleOpenDistortionModal = (distortion: DistortionInfo) => {
    setDistortionToModal(distortion);
    setVisible(true);
  };

  const closeHandler = () => {
    setVisible(false);
  };

  const sendEntry = async () => {
    const distortion_ids = selectedDistortions.map((d) => d.id);
    const token = await currentUser?.getIdToken();
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };

    try {
      const response = await axios.post(
        "/entries",
        {
          entry: {
            entryable_type: "ThoughtAnalysis",
            status: selectedStatus.name,
            community_id: selectedCommunity?.id,
            distortion_ids: distortion_ids,
            entryable_attributes: {
              // negative_thought: negativeThought,
              // new_thought: newThought,
            },
          },
        },
        config
      );
      console.log(response.data);
      if (response.status === 200) {
        toast.success("思考分析記録が作成できました！");
        router.push("/");
      }
    } catch (err) {
      toast.error("思考分析記録が作成できませんでした");
      let message;
      if (axios.isAxiosError(err) && err.response) {
        console.error(err.response.data.message);
      } else {
        message = String(err);
        console.error(message);
      }
    }
  };

  const ModalComponent = () => {
    return (
      <Modal
        aria-labelledby="modal-title"
        width="50em"
        open={visible}
        onClose={closeHandler}
        className="sm:w-4/5 mx-auto"
      >
        {showAutothoughInfo && <div>自動思考とは</div>}
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
        </Modal.Body>
        <Modal.Footer>
          {showDistortionInfo && (
            <Row justify="center">
              <button
                type="button"
                onClick={() => handleConfirm(distortionToModal!)}
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
                <span className="text-base sm:text-lg font-semibold">戻る</span>
              </button>
            </Row>
          )}
        </Modal.Footer>
      </Modal>
    );
  };

  const NegativeThoughtSection = () => {
    return (
      <section className="p-2 w-full">
        <div className="relative mx-auto">
          <div className="sm:w-3/4 w-5/6 mx-auto">
            <h1 className="sm:text-2xl text-xl text-center font-semibold text-gray-700 ">
              頭の中に浮かんだイヤな考えやイメージを整理しましょう
            </h1>
            <Spacer y={1} />
            <Row className="sm:w-40 mx-auto p-2 rounded-lg justify-center items-center cursor-pointer hover:bg-gray-100">
              <InformationCircleIcon className="w-6 h-6 inline-block" />
              <p className="sm:text-lg text-base text-center text-gray-700 ">
                自動思考とは
              </p>
            </Row>
            <ModalComponent />
          </div>
        </div>
      </section>
    );
  };

  const DistortionSection = () => {
    return (
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
          <ModalComponent />
        </div>
      </section>
    );
  };

  const NewThoughtSection = () => {
    return (
      <>
        <div className="flex justify-between px-4 mt-2 w-full">
          <Listbox value={selectedCommunity} onChange={setSelectedCommunity}>
            {({ open }) => (
              <>
                <div className="relative mt-1 w-56">
                  <Listbox.Button className="relative w-full cursor-default rounded-xl bg-blue-50 py-2 pl-3 pr-10 text-left shadow-sm text-sm focus:ring-1 focus:ring-indigo-500">
                    <span className="flex items-center">
                      {selectedCommunity && (
                        <Image
                          src={selectedCommunity.image}
                          alt="日常生活"
                          width={30}
                          height={30}
                          className="h-6 w-6 flex-shrink-0 rounded-full"
                        />
                      )}
                      <span className="ml-3 block truncate text-blue-600">
                        {selectedCommunity
                          ? selectedCommunity.name
                          : "コミュニティーを選ぶ"}
                      </span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 w-full overflow-auto rounded-xl bg-white text-sm shadow-lg  p-2">
                      {communities.map((community) => (
                        <Listbox.Option
                          key={community.id}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "text-blue-600 bg-blue-50"
                                : "text-gray-800",
                              "relative cursor-default py-2 pl-3 pr-9 select-none rounded-xl text-sm"
                            )
                          }
                          value={community}
                        >
                          {({ selected, active }) => (
                            <>
                              <div className="flex items-center">
                                <Image
                                  src={community.image}
                                  alt={community.name}
                                  width={15}
                                  height={15}
                                  className="h-6 w-6 flex-shrink-0 rounded-full"
                                />
                                <span
                                  className={classNames("ml-3 block truncate")}
                                >
                                  {community.name}
                                </span>
                              </div>

                              {selected ? (
                                <span
                                  className="text-blue-600 
                                absolute inset-y-0 right-0 flex items-center pr-4"
                                >
                                  <CheckIcon className="h-5 w-5" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
          <Listbox value={selectedStatus} onChange={setSelectedStatus}>
            {({ open }) => (
              <>
                <div className="relative mt-1 w-24">
                  <Listbox.Button className="relative w-full cursor-default rounded-xl bg-blue-50 py-2 px-2  text-left shadow-sm text-sm focus:ring-1 focus:ring-indigo-500">
                    <span className="flex items-center">
                      <span className="ml-3 block truncate text-blue-600">
                        {selectedStatus.displayName}
                      </span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                      <ChevronDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 w-full overflow-auto rounded-xl bg-white text-sm shadow-lg  p-2">
                      {statuses.map((status) => (
                        <Listbox.Option
                          key={status.id}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "text-blue-600 bg-blue-50"
                                : "text-gray-800",
                              "relative cursor-default py-2 px-2 select-none rounded-xl text-sm"
                            )
                          }
                          value={status}
                        >
                          {({ selected, active }) => (
                            <>
                              <div className="flex items-center">
                                <span
                                  className={classNames("ml-3 block truncate")}
                                >
                                  {status.displayName}
                                </span>
                              </div>
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>
        <div className="p-2 w-full sm:mt-10 mt-6">
          <button
            type="submit"
            className="block mx-auto sm:w-1/2 w-full text-white font-semibold bg-indigo-500 border-0 py-4 focus:outline-none hover:bg-indigo-600 rounded-xl sm:text-lg"
          >
            思考分析記録を作成する
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="container sm:px-5 px-1 sm:mt-10 mt-6 mx-auto">
      <div className="lg:w-1/2 md:w-2/3 mx-auto">
        <form className="flex flex-wrap ">
          <NegativeThoughtSection />
          {showDistortionSection && <DistortionSection />}
          {showNewThoughtSection && <NewThoughtSection />}
        </form>
      </div>
    </div>
  );
}

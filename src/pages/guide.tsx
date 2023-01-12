import {
  Text,
  Spacer,
  Container,
  Link,
  Card,
  Row,
  Col,
  Collapse,
  Modal,
} from "@nextui-org/react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Head from "next/head";

import { ExclamationCircleIcon } from "components/Icons";
import { useAuthContext } from "context/AuthContext";
import exercisePic_1 from "components/exercises/images/exercisePic_1.png";
import exercisePic_2 from "components/exercises/images/exercisePic_2.png";
import exercisePic_3 from "components/exercises/images/exercisePic_3.png";
import diaryIcon from "components/home/images/diaryIcon.png";
import analysisIcon from "components/home/images/analysisIcon.png";

export default function GuidePage() {
  const { currentUser, loading } = useAuthContext();
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const handleClickEntry = (url: string) => {
    if (!loading && !currentUser) {
      setVisible(true);
    } else {
      router.push(url);
    }
  };

  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <>
      <Head>
        <title>認知行動療法とは - Daily Mind</title>
        <meta
          name="description"
          content="「認知療法・認知行動療法」とは、認知に働きかけて、心のストレスを軽くしていく治療法です。"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container sm css={{ px: "$12", mt: "$8", "@xsMax": { px: "$10" } }}>
        <Text size="$3xl" b>
          認知療法・認知行動療法とは
        </Text>
        <Spacer y={1} />
        <Text size="$lg">認知は、ものの受け取り方や考え方という意味です。</Text>
        <Text size="$lg">
          「認知療法・認知行動療法」とは、認知に働きかけて、心のストレスを軽くしていく治療法です。
        </Text>
        <Spacer y={1} />
        <Text size="$lg">私たちの気持ちは考え方に影響されます。</Text>
        <Text size="$lg">
          辛い気持ちを感じるとき、考え方や思考パターンも悲観的でネガティブになっている場合がよくあります。
        </Text>
        <Text size="$lg">
          そうした偏った考え方をより合理的な考え方に修正することで、ストレスを減軽することが認知療法の目的です。
        </Text>
        <Spacer y={1} />
        <Text size="$lg">
          認知療法は、うつ病や不安障害、不眠症などの治療法として、医療現場で広く活用されています。
        </Text>
        <Link
          href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/shougaishahukushi/kokoro/index.html"
          isExternal
          target="_blank"
        >
          <span className="text-sm">
            参照：厚生労働省のホームページ「こころの健康」
          </span>
        </Link>
        <Spacer y={1} />
        <Text size="$lg">
          私たちの日常生活の中でも、認知療法を実践することで、辛い気持ちを改善し、問題解決に役立てることができます。
        </Text>
        <Text size="$lg">
          本サイトは、認知療法の日常的な実践をサポートします。
        </Text>
        <Spacer y={1} />
        <Text size="$3xl" b>
          認知療法に関する三つのキーワード
        </Text>
        <Spacer y={1} />
        <Text size="$xl" b>
          1. 自動思考
        </Text>
        <Text size="$lg">
          何かの出来事があった時に瞬間的に頭に浮かんでくる考えやイメージは「自動思考」といいます。
        </Text>
        <Text size="$lg">
          つまり、自動的に根拠なく思い浮かぶ考えのことです。
        </Text>
        <Spacer y={1} />
        <Text size="$lg">
          その「自動思考」は、私たちがその出来事に対しての解釈でもあります。
        </Text>
        <Text size="$lg">
          その解釈によって、気持ちが大きく動揺したりします。
        </Text>
        <Spacer y={1} />
        <Text size="$lg">
          例えば、好きな子に食事の誘いを送ったけど、ずっと返信きていない。
        </Text>
        <Text size="$lg">このような時、どのような考えが浮かびますか？</Text>
        <Text size="$lg" className="text-gray-700">
          「きっと嫌われたんだ」と考えると、
          <span className="underline">悲しみ</span>
          がわいてくるでしょう。
        </Text>
        <Text size="$lg" className="text-gray-700">
          「やはり先日の件で怒られたかな」と考えると、
          <span className="underline">不安</span>を感じるでしょう。
        </Text>
        <Text size="$lg" className="text-gray-700">
          「仕事でずいぶん忙しいそうだな」と考えると、
          <span className="underline">気遣い</span>になるでしょう。
        </Text>
        <Spacer y={1} />
        <Text size="$lg">
          認知療法は、私たちの気持ちを影響するのは「現実」そのものではなく、「自動思考」だと考えています。
        </Text>
        <Text size="$lg">
          ストレスを軽くするため、まずそのストレスの要因となる「自動思考」を意識しましょう。
        </Text>
        <Spacer y={1} />
        <Text size="$lg">
          本サイトの練習「自分の感情を理解する」では、自動思考と気分の関係をクイズ形式で理解を深めるので、ぜひお試しください。
        </Text>
        <Card
          isPressable
          variant="bordered"
          css={{ mw: "650px", margin: "auto" }}
        >
          <Link href="/exercise/understand-why-feel-this-way">
            <Card.Body>
              <Row align="center">
                <Image
                  alt="自分の感情を理解する"
                  src={exercisePic_1}
                  height={100}
                  width={100}
                />
                <Spacer x={1} />
                <Col span={10}>
                  <h2 className="title sm:text-2xl text-xl font-bold text-gray-700">
                    自分の感情を理解する
                  </h2>
                  <p className="text-gray-600 sm:text-lg text-sm">
                    気分を決めるものは現実ではなく、考え方だ
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Link>
        </Card>
        <Spacer y={1} />
        <Text size="$xl" b>
          2. ネガティブ信念
        </Text>
        <Text size="$lg">
          ネガティブな気持ちや自動思考が生み出されるとき、その裏には、自分が信じている信念や価値観が宿っています。
        </Text>
        <Text size="$lg">
          その信念の基となるのは小さい頃の人生体験であったり、周りの人の言葉であったりします。
        </Text>
        <Spacer y={1} />
        <Text size="$lg">「大企業に入れないと人生終わり」</Text>
        <Text size="$lg">「自分は人よりも劣っている」</Text>
        <Text size="$lg">「こんなつまらない自分は誰にも好かれない」など</Text>
        <Text size="$lg">
          そういったネガティブ信念は、潜在意識の奥底に刻まれて、まるで真実かのように信じ込んでしまいます。
        </Text>
        <Spacer y={1} />
        <Text size="$lg">
          ネガティブな感情から抜け出すためには、その元となるネガティブ信念を考え直すことが必要です。
        </Text>
        <Text size="$lg">
          その前に、まず「自分の思考や信念は真実ではないこと」を意識することが必要です。
        </Text>
        <Spacer y={1} />
        <Text size="$lg">
          本サイトの練習「認知と事実を分ける」では、認知と事実を区別する方法を練習できるので、ぜひお試しください。
        </Text>
        <Spacer y={1} />
        <Card
          isPressable
          variant="bordered"
          css={{ mw: "650px", margin: "auto" }}
        >
          <Link href="/exercise/separate-thoughts-from-facts">
            <Card.Body>
              <Row align="center">
                <Image
                  alt="認知と事実を分ける"
                  src={exercisePic_2}
                  height={100}
                  width={100}
                />
                <Spacer x={1} />
                <Col span={10}>
                  <h2 className="title sm:text-2xl text-xl font-bold text-gray-700">
                    認知と事実を分ける
                  </h2>
                  <p className="text-gray-600 sm:text-lg text-sm">
                    自分を苦しめているのは、「事実」ではないかも
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Link>
        </Card>
        <Spacer y={1} />
        <Text size="$xl" b>
          3. 認知の歪み
        </Text>
        <Text size="$lg">
          ネガティブな信念には、大抵「認知のゆがみ」が潜んでいます。
        </Text>
        <Text size="$lg">
          認知療法では、現実から大きく偏った、特徴的な「考え方のクセ」を「認知のゆがみ」と呼びます。
        </Text>
        <Spacer y={1} />
        <Text size="$lg">
          ネガティブ信念を考え直すためには、自分の「考え方のクセ」に気づくことが必要です。
        </Text>
        <Text size="$lg">
          よくある認知の歪みのパターンは十数種類があるようですが、本サイトでは11種類を取り上げます。
        </Text>
        <Spacer y={1} />
        <Collapse
          title={
            <Text b size="$lg">
              認知の歪み一覧
            </Text>
          }
          shadow
          className="px-4"
        >
          <Collapse.Group>
            <Collapse title="1. 白黒思考">
              <Text b>定義：</Text>
              <Text>
                好きか嫌いか、成功か失敗か、YESかNOか、灰色さえない、物事を白か黒かという極端的な視点で考える。
              </Text>
              <Text>このような考え方の基盤は完璧主義だ。</Text>
              <Spacer y={1} />
              <Text b>具体例：</Text>
              <Text>「一流企業に入れないのなら、就職は完全に失敗だ。」 </Text>
              <Text>「1位になれないなら、チャレンジする意味がない。」 </Text>
              <Text>「99点だったけど100点でなければ0点と同じだ。」</Text>
            </Collapse>
            <Collapse title="2. 過度の一般化">
              <Text b>定義：</Text>
              <Text>
                たった一つか二つの事例から、全てのことが同様の結果になるだろうと結論づけてしまう。
              </Text>
              <Spacer y={1} />
              <Text b>具体例：</Text>
              <Text>
                一度、お茶の誘いを断られると、「自分は一生誰からも好かれない」と思い込んでしまう。
              </Text>
              <Text>
                仕事が思ったように進まないときに、過去の失敗を思い出して、「なんで仕事はいつもうまくいかないんだろう」と思ってしまう。
              </Text>
            </Collapse>
            <Collapse title="3. 自分への関連付け">
              <Text b>定義：</Text>
              <Text>
                何か良くないことが起こった時、なんでも自分に原因があるかのように考えて、自分を責めてしまう。
              </Text>
              <Spacer y={1} />
              <Text b>具体例：</Text>
              <Text>
                「この案件を取れなかったのは、きっと私のプレゼンが足りなかったからだ」
              </Text>
              <Text>
                「夫が職場でミスを犯したのは、今朝私が朝食の準備を遅らせたせいだ」
              </Text>
              <Text>
                「子どもの成績が良くないのは、全て私の責任だ、私がダメな母親だから」
              </Text>
            </Collapse>
            <Collapse title="4. すべき思考">
              <Text b>定義：</Text>
              <Text>
                「～すべき」「～でなくてはならない」と自分で考えた厳しい基準を作り上げて、自分を追い詰めてしまう。他人に対して向けると、怒りや失望を感じる。
              </Text>
              <Spacer y={1} />
              <Text b>具体例：</Text>
              <Text>「社会人だからこういうミスはあってはならない。」</Text>
              <Text>「主婦なら家事を完璧にするべきだ。」</Text>
              <Text>「子どもは親の言いつけを守るべきだ。」</Text>
            </Collapse>
            <Collapse title="5. 拡大解釈と過小評価">
              <Text b>定義：</Text>
              <Text>
                自分の短所や失敗を実際よりも過大に考え、長所や成功を過小評価する。逆に、他人の成功を過大に評価し、他人の失敗を見逃す。
              </Text>
              <Text>
                つまり、自分で自分を評価するときと他人を評価するときとで基準が違う「二重規範」を持っている状態。特に他人に甘く、自分に厳しい基準を適用する傾向がみられる。
              </Text>
              <Spacer y={1} />
              <Text b>具体例：</Text>
              <Text>
                自分が些細なミスで失敗すると「なんて無能なのだ」と拡大解釈し、成功しても「こんなことはただ運が良かっただけで、大したことではない」と過小評価してしまう。
              </Text>
              <Text>
                自分の長所をもっとアピールするより、自分の短所を他人の長所と比べて落ち込んでしまう。
              </Text>
            </Collapse>
            <Collapse title="6. 心のフィルター">
              <Text b>定義：</Text>
              <Text>
                良いことを全て無視して、悪いことだけに注目してしまう。
              </Text>
              <Spacer y={1} />
              <Text b>具体例：</Text>
              <Text>
                試験で97問正解取れたけど、間違えた3問だけにこだわってしまう。
              </Text>
              <Text>
                社内でたくさんの好評をもらったにも関わらず、ある人から受けた一つの指摘が頭から離れず落ち込んでしまう。
              </Text>
            </Collapse>
            <Collapse title="7. マイナス化思考">
              <Text b>定義：</Text>
              <Text>
                単に良いことを無視するのでなく、なんでもないことや良いことを全て悪い方向に考えしてまう。
              </Text>
              <Spacer y={1} />
              <Text b>具体例：</Text>
              <Text>
                仕事が上手くいかないと「やっぱりそうなんだ」と思い、上手くいっても「これはまぐれだ」と考える。
              </Text>
              <Text>
                友達がたくさんできても、「私のことを知らないだけで、本当の私を知ったら、絶対に離れていく」と考える。
              </Text>
            </Collapse>
            <Collapse title="8. 心の読みすぎ">
              <Text b>定義：</Text>
              <Text>
                はっきりとした根拠がないまま、相手が考えていることや相手の行動の意図を、悲観的に結論づけてしまう。
              </Text>
              <Spacer y={1} />
              <Text b>具体例：</Text>
              <Text>
                誘いを断れたら、「きっと私のことを見下しているだろう」と思い込んでしまう。
              </Text>
              <Text>
                上司から返信が来ない時、「企画書には何か問題があるかな」と考え始める。
              </Text>
            </Collapse>
            <Collapse title="9. 先読みの誤り">
              <Text b>定義：</Text>
              <Text>
                まるで不幸しか見えない占い師のように、悲観的な予言をする。
              </Text>
              <Text>
                特に「自分で実現してしまう予言」になる場合がよくある。自分で否定的予測を立てて、自分の行動を制限し、その結果は予測通り失敗してしまう。そして、否定的な予測をますます信じ込みという悪循環に陥ってしまう。
              </Text>
              <Spacer y={1} />
              <Text b>具体例：</Text>
              <Text>「私は一生幸せになれないんだ。」</Text>
              <Text>「この仕事は絶対うまくいかないんだ。」</Text>
              <Text>「この不幸は永遠に続く。」</Text>
            </Collapse>
            <Collapse title="10.レッテル貼り">
              <Text b>定義：</Text>
              <Text>
                自分や他人に否定的なラベルをつけてイメージを固定化する。過度の一般化より極端になるケース。
              </Text>
              <Spacer y={1} />
              <Text b>具体例：</Text>
              <Text>「彼はゆとり世代だから根性なしだろう。」</Text>
              <Text>「彼は勝ち組で、私はただの負け犬だ。」</Text>
              <Text>
                一度失敗したら、失敗の原因を考えるわかりに、「自分はやっぱりダメな人間だ」と考える。
              </Text>
            </Collapse>
            <Collapse title="11.感情による決めつけ">
              <Text b>定義：</Text>
              <Text>
                客観的な事実ではなく、自分の感情に基づいて、結論を決めつけてしまう。
              </Text>
              <Spacer y={1} />
              <Text b>具体例：</Text>
              <Text>
                「嫌な感じがするから、きっと何か悪いことが起こった。」
              </Text>
              <Text>
                「私はダメな人間のように感じているから、やはり私は価値のない人間だ。」
              </Text>
              <Text>
                「さっきのプレゼンはうまくできていない」と感じて、自分の気持ちを真実のように信じてしまい、落ち込んでしまう。
              </Text>
            </Collapse>
          </Collapse.Group>
        </Collapse>
        <Spacer y={1} />
        <Text size="$lg">
          それぞれの歪みに対しての理解を深めるため、本サイトでは簡単なクイズ練習を提供しています。
        </Text>
        <Spacer y={1} />
        <Card
          isPressable
          variant="bordered"
          css={{ mw: "650px", margin: "auto" }}
        >
          <Link href="/exercise/recognize-cognitive-distortions">
            <Card.Body>
              <Row align="center">
                <Image
                  alt="認知のゆがみに気づく"
                  src={exercisePic_3}
                  height={80}
                  width={80}
                />
                <Spacer x={1} />
                <Col span={10}>
                  <h2 className="title sm:text-2xl text-xl font-bold text-gray-700">
                    認知のゆがみに気づく
                  </h2>
                  <p className="text-gray-600 sm:text-lg text-sm">
                    「考え方のクセ」に気づくことが、変化への第一歩
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Link>
        </Card>
        <Spacer y={1} />
        <Text size="$3xl" b>
          4つのステップで認知療法を簡単実践
        </Text>
        <Spacer y={1} />
        <Text size="$lg">
          認知療法で最も用いられる方法の一つは、「コラム法（思考記録法）」です。
        </Text>
        <Text size="$lg">
          コラム法は出来事や考え、気持ちを振り返る記録表の形式で、自宅で一人でも簡単実践できます。
        </Text>
        <Spacer y={1} />
        <Text size="$lg">
          本サイトでは、認知療法をより実践しやすくするために、コラム法に基づいて開発した、
        </Text>
        <Text size="$lg">
          「今日の気持ち」と「ゆがみ分析」の機能を提供しています。
        </Text>
        <Spacer y={1} />
        <Text size="$lg">
          認知療法を簡単実践するには、基本的に四つのステップがあります。
        </Text>
        <Spacer y={1} />
        <Text size="$xl" b>
          STEP 1: 状況と気持ちを整理する
        </Text>
        <Text size="$lg">
          まずは、ストレスを感じたり、気持ちがつらくなったりした時の状況を整理します。
        </Text>
        <Text size="$lg">
          どこで何があったのか、そして、どのような気分や感情を感じたのか、を書き出します。
        </Text>
        <Spacer y={1} />
        <Text size="$lg">
          例:
          今月の業績が良くないので、定例会で上司に叱れた。劣等感と自己嫌悪感を感じて落ち込んでいる。
        </Text>
        <Spacer y={1} />
        <Text size="$lg">
          状況や気持ちを記録することで、自分の感情のトリガーをより意識することができます。
        </Text>
        <Text size="$lg">
          「今日の気持ち」機能を活用して、自分の感情の変化を記録しましょう。
        </Text>
        <Text>※「今日の気持ち」機能を使うには、ログインが必要です。</Text>
        <Spacer y={1} />
        <Card
          isPressable
          variant="bordered"
          css={{ mw: "650px", margin: "auto" }}
          onClick={() => handleClickEntry("/diaries/new")}
        >
          <Card.Body>
            <Row align="center">
              <Image
                alt="今日の気持ち"
                src={diaryIcon}
                height={80}
                width={100}
              />
              <Spacer x={1} />
              <h2 className="title sm:text-2xl text-xl font-bold text-gray-700">
                今日の気持ち
              </h2>
            </Row>
          </Card.Body>
        </Card>
        <Spacer y={1} />
        <Text size="$xl" b>
          STEP 2: ネガティブ思考を意識する
        </Text>
        <Text size="$lg">
          そのとき、頭の中に瞬間に浮かんでいた考えやイメージを思い出して、目を向けてください。
        </Text>
        <Spacer y={1} />
        <Text size="$lg">
          例：「なんで私だけが案件取れないんだ、本当にダメだ」
        </Text>
        <Spacer y={1} />
        <Text size="$xl" b>
          STEP 3: ネガティブ思考にチャレンジする
        </Text>
        <Text size="$lg">
          ネガティブ思考を見直すには、まず自分の考えのどこが歪んでいるかを認識する必要があります。
        </Text>
        <Text size="$lg">
          下記のように自分に問いかけて、自分の考えにチャレンジしてみてください。
        </Text>
        <Spacer y={1} />
        <div className="pl-4">
          <li>その考えに根拠はありますか？</li>
          <li>何か見逃していることはありませんか？</li>
          <li>
            ほかの人が同じような考え方をしていたら、あなたはどんなアドバイスをしますか？
          </li>
          <li>
            自分の力だけではどうしようもない事について、自分を責めていませんか？
          </li>
        </div>
        <Spacer y={1} />
        <Text size="$lg">
          考えの歪みを発見するには、よくある認知の歪みのパターンに陥っていないかどうかをチェックするのが良いでしょう。
        </Text>
        <Spacer y={1} />
        <Text size="$xl" b>
          STEP 4: より合理的な思考を考える
        </Text>
        <Text size="$lg">
          ネガティブ思考に矛盾する根拠に基づいた新しい見方を考えましょう。
        </Text>
        <Text size="$lg">
          どこで何があったのか、そして、どのような気分や感情を感じたのか、を書き出します。
        </Text>
        <Spacer y={1} />
        <Text size="$lg">例:</Text>
        <Text size="$lg">
          誰でも毎回案件取れる訳ではない。先月は結構大きな案件を取れたし、今月はうまくいかなかっただけだ。
        </Text>
        <Text size="$lg">
          しかも、案件取れないのは色々な原因があり、今回はクライアント側の予算が合わなかっただけ、私のせいではない。
        </Text>
        <Spacer y={1} />
        <Text size="$lg">
          Step 2 ~ 4までは、「ゆがみ分析」機能を活用して、実践できます。
        </Text>
        <Text size="$lg">
          自分の思考の歪みを分析して、ネガティブ思考を見直しましょう。
        </Text>
        <Text>※「ゆがみ分析」機能を使うには、ログインが必要です。</Text>
        <Spacer y={1} />
        <Card
          isPressable
          variant="bordered"
          css={{ mw: "650px", margin: "auto" }}
          onClick={() => handleClickEntry("/thought-analyses/new")}
        >
          <Card.Body>
            <Row align="center">
              <Image
                alt="ゆがみ分析"
                src={analysisIcon}
                height={80}
                width={100}
              />
              <Spacer x={1} />
              <h2 className="title sm:text-2xl text-xl font-bold text-gray-700">
                ゆがみ分析
              </h2>
            </Row>
          </Card.Body>
        </Card>
        <Spacer y={3} />
        <Text size="$xl">参考文献</Text>
        <Text size="$lg">
          <span className="font-semibold">
            いやな気分よ、さようなら―自分で学ぶ「抑うつ」克服法
          </span>
          . デビッド・D.バーンズ／著, 野村 総一郎／訳, 夏苅 郁子／訳, 山岡
          功一／訳
        </Text>
        <Text size="$lg">
          <span className="font-semibold">
            こころが晴れるノート うつと不安の認知療法自習帳
          </span>
          . 大野　裕／著
        </Text>
        <Text size="$lg">
          <span className="font-semibold">
            うつと不安の認知療法練習帳(増補改訂版)
          </span>
          . デニス・グリーンバーガー／著 クリスティーン・Ａ．パデスキー／著
          大野裕／監訳 岩坂彰／訳
        </Text>
        <Text size="$lg">
          <span className="font-semibold">
            悩み・不安・怒りを小さくするレッスン「認知行動療法」入門
          </span>
          . 中島　美鈴／著
        </Text>
        <Text size="$lg">
          <span className="font-semibold">
            「考え方のクセ」を変えるとストレスはなくなる
          </span>
          . 清水　栄司／著
        </Text>
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
        <Spacer y={4} />
      </Container>
    </>
  );
}

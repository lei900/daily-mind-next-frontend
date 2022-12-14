import { Container, Spacer, Card, Grid, Row, Col } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import exercisePic from "components/exercises/images/exercisePic_1.png";

export default function ExerciseFinalPage() {
  return (
    <>
      <Head>
        <title>自分の感情を理解する - Daily Mind</title>
        <meta
          name="description"
          content="自動思考はどのように気持ちを影響するのか。この練習で体験してみましょう。"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container md css={{ px: "$18", mt: "$12", "@mdMax": { px: "$10" } }}>
        <Card css={{ p: "$sm", mw: "900px", margin: "auto" }}>
          <Card.Header css={{ py: "$10" }}>
            <Grid.Container justify="center">
              <Grid xs={12} sm={6}>
                <Row align="center">
                  <Image alt="exercisePic_1" src={exercisePic} width={70} />
                  <Spacer x={0.5} />
                  <Col>
                    <h2 className="text-2xl font-semibold sm:text-3xl text-gray-700">
                      自分の感情を理解する
                    </h2>
                    <p className="text-gray-600 sm:text-base text-sm">
                      気分を決めるものは現実ではなく、考え方だ
                    </p>
                  </Col>
                </Row>
              </Grid>
            </Grid.Container>
          </Card.Header>
          <Card.Divider />
          <Card.Body
            css={{
              py: "$12",
              px: "$lg",
              "@mdMin": { px: "$2xl" },
              margin: "auto",
            }}
          >
            <div className="exercise-intro">
              <p className="sm:text-lg text-base">練習お疲れさまでした！</p>
              <br />
              <p className="sm:text-lg text-base">
                今回の質問で、それぞれ不安、怒り、悲しみ、気遣いという四つの気分を体験できたでしょう。
              </p>
              <br />
              <p className="sm:text-lg text-base">
                同じ場面に対しても、
                <strong className="sm:text-xl text-lg border-b-4 border-purple-700 border-opacity-50">
                  自動思考（認知）
                </strong>
                の変化によって、気分はずいぶん変わってきますね。
              </p>
              <br />
              <p className="sm:text-lg text-base">
                日常生活の中で、どんな自動思考が浮かんでくるか、意識してみましょう。
              </p>
            </div>
          </Card.Body>
          <Card.Footer>
            <Row justify="center">
              <Link
                href="/"
                className="block rounded-lg bg-indigo-500 px-4 py-3 text-white  transition hover:bg-indigo-700 focus:outline-none focus:ring text-center"
                type="button"
              >
                <span className="sm:text-lg text-base font-semibold">
                  ホームへ戻る
                </span>
              </Link>
            </Row>
          </Card.Footer>
        </Card>
      </Container>
    </>
  );
}

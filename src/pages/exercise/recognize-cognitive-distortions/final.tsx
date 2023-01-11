import { Container, Spacer, Card, Grid, Row, Col } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import exercisePic from "components/exercises/images/exercisePic_3.png";

export default function Exercise3FinalPage() {
  return (
    <>
      <Head>
        <title>認知のゆがみに気づく - Daily Mind</title>
        <meta
          name="description"
          content="認知の歪みに対しての理解を深めるため、簡単なクイズで練習しましょう。"
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
                      認知のゆがみに気づく
                    </h2>
                    <p className="text-gray-600 sm:text-base text-sm">
                      「考え方のクセ」に気づくことが、変化の第一歩
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
              "@mdMin": { px: "$3xl" },
              margin: "auto",
            }}
          >
            <div className="exercise-intro">
              <p className="sm:text-lg text-base">練習お疲れさまでした！</p>
              <br />
              <p className="sm:text-lg text-base">
                この練習では、認知の歪みという概念をどれだけ正確に把握できることよりも、
              </p>
              <p className="sm:text-lg text-base">
                「私の思考にはクセがあるかもしれない」という意識を持つことが大切です。
              </p>
              <br />
              <p className="sm:text-lg text-base">
                歪みの存在に気づいたら、新しい視点でより
                <strong className="sm:text-xl text-lg border-b-4 border-purple-700 border-opacity-50">
                  合理的な考え方に見直す
                </strong>
                ことが可能になります。
              </p>
              <br />
              <p className="sm:text-lg text-base">
                時には、ネガティブな感情に囚われ、自分ではなかなか気づけないこともよくあります。
              </p>
              <br />
              <p className="sm:text-lg text-base">
                そんなときは、
                <strong className="sm:text-xl text-lg border-b-4 border-purple-700 border-opacity-50">
                  「今の自分の考え方にゆがみはないか」
                </strong>
                と自分に問いかけたり、第三者に意見を求めたりしましょう。
              </p>
              <br />
              <p className="sm:text-lg text-base">
                認知の歪みの定義リストを参照するのも良いでしょう。
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

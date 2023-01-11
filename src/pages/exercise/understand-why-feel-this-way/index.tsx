import { Container, Spacer, Card, Grid, Row, Col } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";

import exercisePic from "components/exercises/images/exercisePic_1.png";

export default function Exercise1IntroPage() {
  const router = useRouter();
  const handleStart = async () => {
    router.push("/exercise/separate-thoughts-from-feelings/questions/1");
    axios.patch("/exercises/1/participations");
  };

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
              "@mdMin": { px: "$4xl" },
              margin: "auto",
            }}
          >
            <div className="exercise-intro">
              <p className="sm:text-lg text-base">
                私たちの気持ちはすべて、考え方に影響されます。
              </p>
              <br />
              <p className="sm:text-lg text-base">
                私たちの感情を決めるのは、現実ではなく、その現実の受け取り方。
              </p>
              <p className="sm:text-lg text-base">
                つまり、物事に対しての
                <strong className="sm:text-xl text-lg border-b-4 border-purple-700 border-opacity-50">
                  認知
                </strong>
                です。
              </p>
              <br />
              <p className="sm:text-lg text-base">
                良いこと、悪いこと、意味のないこと。
              </p>
              <p className="sm:text-lg text-base">
                私たちは自分なりに、周りのことを解釈しています。
              </p>
              <p className="sm:text-lg text-base">
                その解釈によって、気持ちが違ってきます。
              </p>
              <br />
              <p className="sm:text-lg text-base">
                認知行動療法では、その解釈に注目します。
              </p>
              <p className="sm:text-lg text-base">
                特に、頭の中に
                <strong className="sm:text-xl text-lg border-b-4 border-purple-700 border-opacity-50">
                  瞬間に浮かんでくる考えやイメージ
                </strong>
                。
              </p>
              <p className="sm:text-lg text-base">
                それを
                <strong className="sm:text-xl text-lg border-b-4 border-purple-700 border-opacity-50">
                  「自動思考」
                </strong>
                と呼びます。
              </p>
              <br />
              <p className="sm:text-lg text-base">
                その自動思考はどのように気持ちを影響するのか。
              </p>
              <p className="sm:text-lg text-base">
                この練習で体験してみましょう。
              </p>
            </div>
          </Card.Body>
          <Card.Footer>
            <Row justify="center">
              <button
                onClick={handleStart}
                className="block rounded-lg bg-indigo-500 px-16 py-3 text-white  transition hover:bg-indigo-700 focus:outline-none focus:ring text-center"
                type="button"
              >
                <span className="sm:text-lg text-base font-semibold">
                  スタート
                </span>
              </button>
            </Row>
          </Card.Footer>
        </Card>
      </Container>
    </>
  );
}

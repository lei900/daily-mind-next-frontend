import { Container, Spacer, Card, Grid, Row, Col } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";

import exercisePic from "components/exercises/images/exercisePic_3.png";

export default function Exercise3IntroPage() {
  const router = useRouter();
  const handleStart = async () => {
    router.push("/exercise/recognize-cognitive-distortions/questions/1");
    axios.patch("/exercises/3/participations");
  };

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
                      「考え方のクセ」に気づくことが、変化への第一歩
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
              <p className="sm:text-lg text-base">
                ネガティブな感情に陥るのは、たいていその時の認知がマイナスになっているためです。
              </p>
              <p className="sm:text-lg text-base">
                無自覚のうちに
                <strong className="sm:text-xl text-lg border-b-4 border-purple-700 border-opacity-50">
                  「認知のゆがみ」
                </strong>
                に陥っているかもしれません。
              </p>
              <br />
              <p className="sm:text-lg text-base">
                私たちの思考パターンには人それぞれクセがあります。
              </p>
              <p className="sm:text-lg text-base">
                認知療法では、
                <strong className="sm:text-xl text-lg border-b-4 border-purple-700 border-opacity-50">
                  現実から大きく偏った「考え方のクセ」
                </strong>
                を「認知のゆがみ」 と呼びます。
              </p>
              <br />
              <p className="sm:text-lg text-base">
                自分の「考え方のクセ」を知り、それをもっと合理的な考え方に修正できれば、
                極端なマイナス思考に囚われ消耗することなく、適切な行動をとることができるようになります。
              </p>
              <br />
              <p className="sm:text-lg text-base">
                自分の「考え方のクセ」に気づくことが、変化への第一歩です。
              </p>
              <br />
              <p className="sm:text-lg text-base">
                よくある認知の歪みのパターンは十数種類があるようですが、この練習では11種類を取り上げます。
              </p>
              <br />
              <p className="sm:text-lg text-base">
                それぞれに対しての理解を深めるため、簡単なクイズで練習しましょう。
              </p>

              <div className="sm:text-lg text-base"></div>
            </div>
          </Card.Body>
          <Card.Footer>
            <Row justify="center">
              <button
                onClick={handleStart}
                className="block rounded-lg bg-indigo-500 px-16 py-3 text-white  transition hover:bg-indigo-700 focus:outline-none focus:ring  text-center"
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

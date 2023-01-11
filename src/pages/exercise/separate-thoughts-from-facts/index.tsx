import { Container, Spacer, Card, Grid, Row, Col } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";

import exercisePic from "components/exercises/images/exercisePic_2.png";

export default function Exercise2IntroPage() {
  const router = useRouter();
  const handleStart = async () => {
    router.push("/exercise/separate-thoughts-from-facts/questions/1");
    axios.patch("/exercises/2/participations");
  };

  return (
    <>
      <Head>
        <title>認知と事実を分ける - Daily Mind</title>
        <meta
          name="description"
          content="認知と事実の区別がつくかどうか、試してみてください。"
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
                      認知と事実を分ける
                    </h2>
                    <p className="text-gray-600 sm:text-base text-sm">
                      自分を苦しめているのは、「事実」ではないかも
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
                私たちはいつも「主観」で物事を判断しています。
              </p>
              <p className="sm:text-lg text-base">
                何かを思い込んでしまうと、それがまるで事実かのように仮定してしまいます。
              </p>
              <br />
              <p className="sm:text-lg text-base">
                しかし、主観的な信念は事実ではありません。
              </p>
              <p className="sm:text-lg text-base">
                例え「常識」だとしても、それは「事実」だとは限りません。
              </p>
              <br />
              <p className="sm:text-lg text-base">
                認知療法では、私たちを苦しめているのは事実ではなく、
              </p>
              <p className="sm:text-lg text-base">
                <strong className="sm:text-xl text-lg border-b-4 border-purple-700 border-opacity-50">
                  自分の信念や思考、
                </strong>
                つまり、
                <strong className="sm:text-xl text-lg border-b-4 border-purple-700 border-opacity-50">
                  認知
                </strong>
                だと指摘しています。
              </p>
              <br />
              <p className="sm:text-lg text-base">
                ネガティブな感情から抜け出すためには、
              </p>
              <p className="sm:text-lg text-base">
                まず
                <strong className="sm:text-xl text-lg border-b-4 border-purple-700 border-opacity-50">
                  「自分の思考は事実ではないこと」
                </strong>
                を認識する必要があります。
              </p>
              <br />
              <p className="sm:text-lg text-base">
                <strong>認知</strong>
                は、主観的な思考や意見であり、それを「証明」したり「反証」したりする方法はなく、単に好みや視点を反映したものです。
              </p>
              <p className="sm:text-lg text-base">
                一方、<strong>事実</strong>
                は、証明も反証もできるものです。誰が何を言おうが、変わらないのが事実です。
              </p>
              <br />
              <p className="sm:text-lg text-base">
                この練習では、認知と事実の区別がつくかどうか、試してみてください。
              </p>
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

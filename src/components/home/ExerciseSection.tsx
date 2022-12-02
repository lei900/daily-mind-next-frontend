import { Grid, Card, Row, Text, Col, Spacer } from "@nextui-org/react";
import Image from "next/image";

import exercisePic_1 from "./images/exercisePic_1.png";
import exercisePic_2 from "./images/exercisePic_2.png";
import exercisePic_3 from "./images/exercisePic_3.png";

export const ExerciseSection = () => {
  return (
    <section className="text-gray-800 mx-auto">
      <header className="container mx-auto flex flex-row items-center">
        <h1 className="title sm:text-4xl text-3xl mb-4 font-bold text-gray-700">
          練習
        </h1>
        <Spacer x={0.5} />
        <p className="text-gray-600">認知療法をクイズで練習しましょう</p>
      </header>
      <Grid.Container
        gap={2}
        justify="flex-start"
        css={{
          "@xsMax": { mw: "650px", margin: "auto" },
          "@mdMax": { mw: "960px", margin: "auto" },
        }}
      >
        <Grid sm={6} xs={12}>
          <Card
            isPressable
            isHoverable
            variant="bordered"
            css={{ mw: "650px", margin: "auto" }}
          >
            <Card.Body>
              <Row>
                <Col span={3}>
                  <Image
                    alt="思考と感情を分ける"
                    src={exercisePic_1}
                    width={150}
                  />
                </Col>
                <Spacer x={1} />
                <Col span={9}>
                  <Row align="flex-end">
                    <Text
                      size="$2xl"
                      weight="semibold"
                      css={{ color: "#374151" }}
                    >
                      認知と感情を分ける
                    </Text>
                  </Row>
                  <Row>
                    <Text size="$lg" weight="light" css={{ color: "#4b5563" }}>
                      考え方を変えると、気分は変わる
                    </Text>
                  </Row>
                  <Spacer y={0.8} />
                  <Row justify="flex-end" css={{ paddingRight: "$sm" }}>
                    <Text size="$sm" weight="light">
                      15人参加済み
                    </Text>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Grid>
        <Grid sm={6} xs={12}>
          <Card
            isPressable
            isHoverable
            variant="bordered"
            css={{ mw: "650px", margin: "auto" }}
          >
            <Card.Body>
              <Row>
                <Col span={3}>
                  <Image
                    alt="思考と感情を分ける"
                    src={exercisePic_2}
                    width={150}
                  />
                </Col>
                <Spacer x={1} />
                <Col span={9}>
                  <Row align="flex-end">
                    <Text
                      size="$2xl"
                      weight="semibold"
                      css={{ color: "#374151" }}
                    >
                      認知と状況を分ける
                    </Text>
                  </Row>
                  <Row>
                    <Text size="$lg" weight="light" css={{ color: "#4b5563" }}>
                      あの考えは事実ではないかも?!
                    </Text>
                  </Row>
                  <Spacer y={0.8} />
                  <Row justify="flex-end" css={{ paddingRight: "$sm" }}>
                    <Text size="$sm" weight="light">
                      15人参加済み
                    </Text>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Grid>
        <Grid sm={6} xs={12}>
          <Card
            isPressable
            isHoverable
            variant="bordered"
            css={{ mw: "650px", margin: "auto" }}
          >
            <Card.Body>
              <Row>
                <Col span={3}>
                  <Image
                    alt="思考と感情を分ける"
                    src={exercisePic_3}
                    height={120}
                  />
                </Col>
                <Spacer x={1} />
                <Col span={9}>
                  <Row align="flex-end">
                    <Text
                      size="$2xl"
                      weight="semibold"
                      css={{ color: "#374151" }}
                    >
                      認知のゆがみに気づく
                    </Text>
                  </Row>
                  <Row>
                    <Text size="$lg" weight="light" css={{ color: "#4b5563" }}>
                      「考え方のクセ」に気づくことが、変化の第一歩
                    </Text>
                  </Row>
                  <Spacer y={0.8} />
                  <Row justify="flex-end" css={{ paddingRight: "$sm" }}>
                    <Text size="$sm" weight="light">
                      15人参加済み
                    </Text>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </section>
  );
};

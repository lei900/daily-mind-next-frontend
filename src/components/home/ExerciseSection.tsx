import { Grid, Card, Row, Col, Spacer } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

import exercisePic_1 from "../exercises/images/exercisePic_1.png";
import exercisePic_2 from "../exercises/images/exercisePic_2.png";
import exercisePic_3 from "../exercises/images/exercisePic_3.png";

export const ExerciseSection = () => {
  const communityList = [
    {
      href: "/exercise/separate-thoughts-from-feelings",
      title: "認知と感情を分ける",
      description: "考え方を変えると、気分は変わる",
      src: exercisePic_1,
      numberOfParticipants: "15",
    },
    {
      href: "#",
      title: "認知と状況を分ける",
      description: "あの考えは事実ではないかも?!",
      src: exercisePic_2,
      numberOfParticipants: "21",
    },
    {
      href: "#",
      title: "認知のゆがみに気づく",
      description: "「考え方のクセ」に気づくことが、変化の第一歩",
      src: exercisePic_3,
      numberOfParticipants: "30",
    },
  ];

  return (
    <section className="text-gray-800 mx-auto">
      <header className="container mx-auto flex flex-row items-center">
        <h1 className="title sm:text-3xl text-2xl mb-4 font-bold text-gray-700">
          練習
        </h1>
        <Spacer x={0.5} />
        <p className="text-gray-600 sm:text-base text-sm">
          認知療法をクイズで練習しましょう
        </p>
      </header>
      <Grid.Container
        gap={1}
        justify="flex-start"
        css={{
          "@xsMax": { mw: "650px", margin: "auto" },
        }}
      >
        {communityList.map((item, index) => (
          <Grid sm={6} xs={12} key={index}>
            <Card
              isPressable
              isHoverable
              variant="bordered"
              css={{ mw: "650px", margin: "auto" }}
            >
              <Link href={item.href}>
                <Card.Body>
                  <Row>
                    <Col span={3}>
                      <Image alt={item.title} src={item.src} height={115} />
                    </Col>
                    <Spacer x={1} />
                    <Col span={9}>
                      <Row align="flex-end">
                        <h2 className="title sm:text-2xl text-xl font-bold text-gray-700">
                          {item.title}
                        </h2>
                      </Row>
                      <Row>
                        <p className="text-gray-600 sm:text-lg text-sm">
                          {item.description}
                        </p>
                      </Row>
                      <Spacer y={0.8} />
                      <Row justify="flex-end" css={{ paddingRight: "$sm" }}>
                        <p className="text-gray-600 sm:text-sm text-xs">
                          {item.numberOfParticipants}人参加済み
                        </p>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
    </section>
  );
};

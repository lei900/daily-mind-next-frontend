import { Grid, Card, Row, Col, Spacer } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

import diaryIcon from "./images/diaryIcon.png";
import analysisIcon from "./images/analysisIcon.png";

export const EntrySection = () => {
  const entryKinds = [
    {
      href: "/diaries/new",
      title: "今日の気持ち",
      src: diaryIcon,
    },
    {
      href: "#",
      title: "認知のゆがみ分析",
      src: analysisIcon,
    },
  ];

  return (
    <section className="text-gray-800 mx-auto">
      <header className="container mx-auto flex flex-row items-center">
        <h1 className="title sm:text-3xl text-2xl mb-4 font-bold text-gray-700">
          記録
        </h1>
        <Spacer x={0.5} />
        <p className="text-gray-600 sm:text-base text-sm">
          自分の気持ちや悩みを整理しましょう
        </p>
      </header>
      <Grid.Container
        gap={1}
        justify="flex-start"
        css={{
          "@xsMax": { mw: "650px", margin: "auto" },
        }}
      >
        {entryKinds.map((item, index) => (
          <Grid sm={3} xs={6} key={index}>
            <Card
              isPressable
              isHoverable
              variant="bordered"
              css={{ mw: "650px", margin: "auto" }}
            >
              <Link href={item.href}>
                <Card.Body>
                  <Col>
                    <Row justify="center">
                      <Image alt={item.title} src={item.src} width={150} />
                    </Row>
                    <Spacer y={0.5} />
                    <Row justify="center">
                      <h2 className="title sm:text-2xl text-xl font-bold text-gray-700">
                        {item.title}
                      </h2>
                    </Row>
                  </Col>
                </Card.Body>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
    </section>
  );
};

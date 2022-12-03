import { Grid, Card, Row, Col, Spacer } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

import engineerIcon from "../communities/images/engineerIcon.png";
import careerIcon from "../communities/images/careerIcon.png";
import lifeIcon from "../communities/images/lifeIcon.png";
import otherIcon from "../communities/images/otherIcon.png";

export const CommunitySection = () => {
  const communityList = [
    {
      title: "エンジニア部屋",
      src: engineerIcon,
    },
    {
      title: "職場・キャリア",
      src: careerIcon,
    },
    {
      title: "日常生活",
      src: lifeIcon,
    },
    {
      title: "その他",
      src: otherIcon,
    },
  ];

  return (
    <section className="text-gray-800 mx-auto">
      <header className="container mx-auto flex sm:flex-row justify-start items-center">
        <h1 className="title sm:text-3xl text-2xl mb-4 font-bold text-gray-700">
          コミュニティ
        </h1>
        <Spacer x={0.5} />
        <p className="text-gray-600 sm:text-base text-sm">
          みんなで励まし合いましょう
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
          <Grid key={index} justify="flex-start">
            <Card
              isPressable
              isHoverable
              variant="flat"
              css={{ mw: "350px", margin: "auto" }}
            >
              <Link href="#">
                <Card.Body css={{ margin: "auto", padding: "$sm" }}>
                  <Row justify="center" align="center">
                    <Image alt={item.title} src={item.src} height={40} />
                    <Spacer x={0.5} />
                    <h2 className="title sm:text-base text-sm text-gray-700">
                      {item.title}
                    </h2>
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
// sm={3} xs={4}

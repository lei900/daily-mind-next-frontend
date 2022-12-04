import { Grid, Card, Row, Spacer } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

import engineerIcon from "./images/engineerIcon.png";
import careerIcon from "./images/careerIcon.png";
import lifeIcon from "./images/lifeIcon.png";
import otherIcon from "./images/otherIcon.png";

export const CommunityList = () => {
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
  );
};

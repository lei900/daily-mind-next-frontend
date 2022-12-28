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
      title: "日常生活",
      src: lifeIcon,
    },
    {
      title: "職場・キャリア",
      src: careerIcon,
    },

    {
      title: "エンジニア部屋",
      src: engineerIcon,
    },
    {
      title: "その他",
      src: otherIcon,
    },
  ];

  return (
    <Grid.Container gap={1} justify="flex-start" className="mx-auto">
      {communityList.map((item, index) => (
        <Grid key={index} justify="flex-start">
          <Card
            variant="flat"
            className="mx-auto bg-blue-50 border-0 hover:bg-blue-100 hover:shadow-sm"
          >
            <Link href="#">
              <Card.Body className="mx-auto p-2 ">
                <Row justify="center" align="center">
                  <Image alt={item.title} src={item.src} height={30} />
                  <h2 className="title sm:text-base text-sm text-gray-700 px-2">
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

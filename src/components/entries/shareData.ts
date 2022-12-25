import engineerIcon from "components/communities/images/engineerIcon.png";
import careerIcon from "components/communities/images/careerIcon.png";
import lifeIcon from "components/communities/images/lifeIcon.png";
import otherIcon from "components/communities/images/otherIcon.png";

export const communities = [
  {
    id: 1,
    name: "日常生活",
    image: lifeIcon,
  },
  {
    id: 2,
    name: "職場キャリア",
    image: careerIcon,
  },
  {
    id: 3,
    name: "エンジニア部屋",
    image: engineerIcon,
  },
  {
    id: 4,
    name: "その他",
    image: otherIcon,
  },
];

export const statuses = [
  { id: 1, displayName: "公開", name: "published" },
  { id: 2, displayName: "非公開", name: "private" },
  { id: 3, displayName: "下書き", name: "draft" },
];

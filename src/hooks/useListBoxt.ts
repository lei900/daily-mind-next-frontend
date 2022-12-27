import engineerIcon from "components/communities/images/engineerIcon.png";
import careerIcon from "components/communities/images/careerIcon.png";
import lifeIcon from "components/communities/images/lifeIcon.png";
import otherIcon from "components/communities/images/otherIcon.png";

export default function useListBox() {
  const communities = [
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

  const statuses = [
    { id: 1, displayName: "公開", name: "published" },
    { id: 2, displayName: "非公開", name: "private" },
    { id: 3, displayName: "下書き", name: "draft" },
  ];

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const selectedEntryCommunity = (id: number) => {
    switch (id) {
      case 1:
        return communities[0];
      case 2:
        return communities[1];
      case 3:
        return communities[2];
      case 4:
        return communities[3];
      default:
        return null;
    }
  };

  const selectedEntryStatus = (status: string) => {
    switch (status) {
      case "published":
        return statuses[0];
      case "private":
        return statuses[1];
      case "draft":
        return statuses[2];
      default:
        return statuses[0];
    }
  };

  return {
    communities,
    statuses,
    selectedEntryCommunity,
    selectedEntryStatus,
    classNames,
  };
}

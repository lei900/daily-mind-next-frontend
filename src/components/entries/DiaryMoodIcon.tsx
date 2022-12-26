import { Great, Good, Neutral, Bad, Terrible } from "components/Icons";

type Props = {
  mood: "terrible" | "bad" | "neutral" | "good" | "great";
};

export const DiaryMoodIcon = ({ mood }: Props) => {
  switch (mood) {
    case "terrible":
      return <Terrible />;
    case "bad":
      return <Bad />;
    case "neutral":
      return <Neutral />;
    case "good":
      return <Good />;
    case "great":
      return <Great />;
  }
};

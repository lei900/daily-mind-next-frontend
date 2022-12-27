import { Great, Good, Neutral, Bad, Terrible } from "components/Icons";
import { Mood } from "types/types";

type Props = {
  mood: Mood;
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

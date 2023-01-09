import { Great, Good, Neutral, Bad, Terrible } from "components/Icons";
import { Mood } from "types/types";

type Props = {
  mood: Mood;
  className?: string;
};

export const DiaryMoodIcon = ({ mood, className }: Props) => {
  switch (mood) {
    case "terrible":
      return <Terrible className={className} />;
    case "bad":
      return <Bad className={className} />;
    case "neutral":
      return <Neutral className={className} />;
    case "good":
      return <Good className={className} />;
    case "great":
      return <Great className={className} />;
  }
};

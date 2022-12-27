import {
  BlackAndWhiteThinking,
  Overgeneralization,
  Personalization,
  ShouldStatements,
  MagnificationAndMinimization,
  MentalFilter,
  DisqualifyPositive,
  MindReading,
  FortuneTeller,
  Labeling,
  EmotionalReasoning,
} from "components/entries/thought-analyses/distortionIcon";

type Props = {
  distortionID: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
};

export const EntryDistortionIcon = ({ distortionID }: Props) => {
  switch (distortionID) {
    case 1:
      return <BlackAndWhiteThinking className="w-4 h-4" />;
    case 2:
      return <Overgeneralization className="w-4 h-4" />;
    case 3:
      return <Personalization className="w-4 h-4" />;
    case 4:
      return <ShouldStatements className="w-4 h-4" />;
    case 5:
      return <MagnificationAndMinimization className="w-4 h-4" />;
    case 6:
      return <MentalFilter className="w-4 h-4" />;
    case 7:
      return <DisqualifyPositive className="w-4 h-4" />;
    case 8:
      return <MindReading className="w-4 h-4" />;
    case 9:
      return <FortuneTeller className="w-4 h-4" />;
    case 10:
      return <Labeling className="w-4 h-4" />;
    case 11:
      return <EmotionalReasoning className="w-4 h-4" />;
  }
};

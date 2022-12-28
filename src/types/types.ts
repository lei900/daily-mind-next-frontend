import { StaticImageData } from "next/image";

export type Mood = "terrible" | "bad" | "neutral" | "good" | "great";
export type Status = "published" | "private" | "draft";
export type EntryableType = "Diary" | "ThoughtAnalysis";

export interface DiaryData {
  mood: Mood;
  title: string;
  body: string;
}

export interface ThoughtAnalysisData {
  negativeThought: string;
  newThought: string;
}

export interface EntryDistortionData {
  id: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  name:
    | "白黒思考"
    | "過度の一般化"
    | "自分への関連付け"
    | "すべき思考"
    | "拡大解釈と過小評価"
    | "心のフィルター"
    | "マイナス化思考"
    | "心の読みすぎ"
    | "	先読みの誤り"
    | "レッテル貼り"
    | "感情による決めつけ";
}

export interface EntryRequestData {
  entry: {
    entryable_type: EntryableType;
    status: Status;
    community_id: number | null;
    entryable_attributes: DiaryData | ThoughtAnalysisData;
  };
}

export interface EntryData {
  id: number;
  attributes: EntryAttributes;
}

export interface Entry extends EntryAttributes {
  id: number;
}

export interface EntryAttributes {
  entryableType: EntryableType;
  status: Status;
  user: User;
  diary: DiaryData | null;
  community: CommunityData | null;
  thoughtAnalysis: ThoughtAnalysisData | null;
  distortions: EntryDistortionData[] | null;
}

export interface User {
  uid: string;
  nickname: string;
  role: string;
  avatar: string;
  bio: string | null;
}

export interface QuestionData {
  attributes: {
    qid: number;
    body: string;
    resultInterpretation: string;
    choices: ChoiceData[];
  };
}

export interface ChoiceData {
  content: string;
  is_correct_choice: boolean;
}

export interface Question {
  qid: number;
  body: string;
  resultInterpretation: string;
  choices?: Choice[];
}

export interface Choice {
  content: string;
  isCorrectChoice: boolean;
  distortion?: DistortionData;
}

export interface ChoiceWithDistortionData {
  attributes: {
    content: string;
    isCorrectChoice: boolean;
    distortion: DistortionData;
  };
}

export interface DistortionData {
  name: string;
  definition: string;
  description: string;
}

export interface Community extends CommunityData {
  image: StaticImageData;
}

export interface CommunityData {
  id: number;
  name: string;
}

export interface DistortionInfo {
  id: number;
  name: string;
  definition: string;
  description: string[];
  brief: string;
  icon: ({ className }: { className?: string }) => JSX.Element;
}

export interface EntryCardInfo {
  id: number;
  kind: string;
  url: string;
  title: string;
  src: StaticImageData;
}

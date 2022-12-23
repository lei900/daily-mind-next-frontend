import { StaticImageData } from "next/image";

export interface Diary {
  mood: string;
  title: string;
  body: string;
}

export interface Entry {
  id: number;
  entryableType: string;
  status: string;
  community: CommunityData | null;
  user: User;
  diary: Diary;
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
  distortion?: Distortion;
}

export interface ChoiceWithDistortionData {
  attributes: {
    content: string;
    isCorrectChoice: boolean;
    distortion: Distortion;
  };
}

export interface Distortion {
  name: string;
  definition: string;
  description: string;
}

export interface Community {
  id: number;
  name: string;
  image: StaticImageData;
}

export interface CommunityData {
  id: number;
  name: string;
  image: string;
}

export interface DistortionInfo {
  id: number;
  name: string;
  definition: string;
  description: string[];
  brief: string;
  icon: ({ className }: { className?: string }) => JSX.Element;
}

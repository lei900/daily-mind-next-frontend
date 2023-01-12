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
  negative_thought: string;
  new_thought: string;
}

export interface EntryDistortionData {
  id: DistortionId;
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

export type DistortionId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export type DistortionIds = DistortionId[] | [];

export interface EntryRequestData {
  entry: {
    entryable_type: EntryableType;
    status: Status;
    community_id: number | null;
    distortion_ids?: DistortionIds;
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
  user: UserInfo;
  diary: DiaryData | null;
  community: CommunityData | null;
  thoughtAnalysis: ThoughtAnalysisData | null;
  distortions: EntryDistortionData[] | null;
  likes: string;
  entryLikerUids: string[] | [];
  bookmarks: string;
  bookmarkerUids: string[] | [];
  comments: {
    data: [] | CommentData[];
  };
  commentCount: string;
  createdAt: string;
}

export interface UserInfo {
  uid: string;
  nickname: string;
  role: string;
  avatar: string | null;
  bio: string | null;
}

export interface UserData extends UserInfo {
  publishedEntries?: UserEntryData;
  nondraftEntries?: UserEntryData;
  bookmarkedEntries?: UserEntryData;
  draftEntries?: UserEntryData;
  isMypage: boolean;
}

export interface UserEntryData {
  data: EntryData[] | [];
}

export interface CommentData {
  id: number;
  attributes: CommentAttributes;
}

export interface CommentAttributes {
  body: string;
  entryId: number;
  parentId?: number | null;
  createdAt: string;
  user: UserInfo;
}

export interface QuestionData {
  attributes: Question;
}

export interface Question {
  qid: number;
  body: string;
  resultInterpretation: string;
  choices: Choice[];
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

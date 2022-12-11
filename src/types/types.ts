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
  choices: Choice[];
}

export interface Choice {
  content: string;
  isCorrectChoice: boolean;
}

export interface DistortionDetail {
  name: string;
  formalName: string;
  definition: string;
  description: string[];
}

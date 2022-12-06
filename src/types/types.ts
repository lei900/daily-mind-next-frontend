export interface QuestionData {
  id: string;
  attributes: {
    body: string;
    resultInterpretation: string;
    choices: ChoiceData[];
  };
}

export interface ChoiceData {
  id: number;
  content: string;
  is_correct_choice: boolean;
}

export interface Question {
  id: number;
  body: string;
  resultInterpretation: string;
  choices: Choice[];
}

export interface Choice {
  id: number;
  content: string;
  isCorrectChoice: boolean;
}

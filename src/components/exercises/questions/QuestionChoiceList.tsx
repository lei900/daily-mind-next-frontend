import { Fragment } from "react";

type Props = {
  questionBody: String[];
};

export default function QuestionChoiceList({ questionBody }: Props) {
  const lastSentence = questionBody[questionBody.length - 1];
  const normalSentences = questionBody.slice(0, -1);

  return (
    <div className="question-body">
      {normalSentences.map((sentence, index) => (
        <Fragment key={index}>
          <p className="sm:text-lg text-base">{sentence + "。"}</p>
          <br />
        </Fragment>
      ))}
      <br />
      <p className="sm:text-lg font-semibold text-base">{lastSentence}</p>
    </div>
  );
}

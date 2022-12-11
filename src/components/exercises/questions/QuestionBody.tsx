import { Fragment } from "react";
import { Container, Spacer, Card, Grid, Row, Col } from "@nextui-org/react";

type Props = {
  questionBody: String[];
};

export default function QuestionBody({ questionBody }: Props) {
  const lastSentence = questionBody[questionBody.length - 1];
  const normalSentences = questionBody.slice(0, -1);

  return (
    <div className="mx-auto px-2 sm:px-14">
      {normalSentences.map((sentence, index) => (
        <Fragment key={index}>
          <p className="sm:text-lg text-base">{sentence + "。"}</p>
          <br />
        </Fragment>
      ))}
      <br />
      <p className="sm:text-xl font-semibold text-lg">{lastSentence}</p>
    </div>
  );
}

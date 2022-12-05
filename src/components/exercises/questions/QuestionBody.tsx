import { Fragment } from "react";
import { Container, Spacer, Card, Grid, Row, Col } from "@nextui-org/react";

type Props = {
  questionBody: String[];
};

export default function QuestionBody({ questionBody }: Props) {
  const lastSentence = questionBody[questionBody.length - 1];
  const normalSentences = questionBody.slice(0, -1);

  return (
    <Row className="question-body" justify="center">
      <Col span={10}>
        {normalSentences.map((sentence, index) => (
          <Fragment key={index}>
            <p className="sm:text-lg text-base">{sentence + "。"}</p>
            <br />
          </Fragment>
        ))}
        <br />
        <p className="sm:text-lg font-semibold text-base">{lastSentence}</p>
      </Col>
    </Row>
  );
}

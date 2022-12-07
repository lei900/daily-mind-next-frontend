import axios from "axios";
import { GetStaticPropsContext } from "next";
import { useState } from "react";
import { ParsedUrlQuery } from "querystring";

import {
  Container,
  Spacer,
  Card,
  Grid,
  Row,
  Col,
  Modal,
} from "@nextui-org/react";
import { useRouter } from "next/router";

import { QuestionData, Choice } from "types/types";

export type Props = {
  question: QuestionData;
};

export default function QuestionDetailPage({ question }: Props) {
  const [isCorrect, setIsCorrect] = useState(false);
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const questionId = question.attributes.qid;
  const questionBody = question.attributes.body;
  const choices = question.attributes.choices.map((choice) => {
    const content = choice.content;
    const isCorrectChoice = choice.is_correct_choice;
    return { content, isCorrectChoice };
  });
  const correctChoice = choices.find(
    (choice) => choice.isCorrectChoice === true
  );

  // !Caution: the number of questions is hard-coded
  const isLastQuestion = questionId === 22 ? true : false;

  const checkAnswer = (choice: Choice) => {
    if (choice.isCorrectChoice === true) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    openModal();
  };

  const openModal = () => {
    setVisible(true);
  };

  const closeHandler = () => {
    setVisible(false);
  };

  const turnNextPage = () => {
    closeHandler();
    const nextQuestionUrl = `/exercise/separate-thoughts-from-facts/questions/${(
      questionId + 1
    ).toString()}`;
    console.log(nextQuestionUrl);
    const finalUrl = "/exercise/separate-thoughts-from-facts/final";
    const nextUrl = isLastQuestion ? finalUrl : nextQuestionUrl;
    router.push(nextUrl);
  };

  const ModalBodyContent = () => {
    if (isCorrect === true) {
      return (
        <div className="modal-body-content mx-auto py-4">
          <p className="text-lg sm:text-xl">そうですね！</p>
          <br />
          <p className="text-lg sm:text-xl">
            これは
            <strong className="text-purple-700">
              「{correctChoice?.content}」
            </strong>
            になりますね。
          </p>
        </div>
      );
    } else {
      return (
        <div className="modal-body-content mx-auto py-4 sm:px-6">
          <p className="text-lg sm:text-xl">
            これは
            <strong className="text-indigo-700 text-lg sm:text-xl">
              {correctChoice?.content}
            </strong>
            と捉えたほうが良いでしょう。
          </p>
          <br />
          <p className="text-sm sm:text-base font-semibold">事実とは：</p>
          <p className="text-base sm:text-base">
            証明も反証もできるものです。誰が何を言おうが、事実は変わりません。
          </p>
          <br />
          <p className="text-sm sm:text-base font-semibold">認知とは：</p>
          <p className="text-base sm:text-base">
            主観的な思考や意見であり、それを「証明」したり「反証」したりする方法はなく、単に好みや視点を反映したものです。
          </p>
        </div>
      );
    }
  };

  return (
    <Container md css={{ px: "$18", mt: "$12", "@mdMax": { px: "$10" } }}>
      <Card css={{ p: "$sm", mw: "900px", margin: "auto" }}>
        <Card.Header css={{ py: "$10" }}>
          <Grid.Container justify="center">
            <Grid xs={12} sm={6}>
              <Row justify="center">
                <h2 className="text-xl text-center font-semibold sm:text-2xl text-gray-700">
                  認知と事実を分ける
                </h2>
                <Spacer x={0.5} />
                <p className="text-center sm:text-lg text-base self-end">
                  (Q {questionId} / 22)
                </p>
              </Row>
            </Grid>
          </Grid.Container>
        </Card.Header>
        <Card.Divider />
        <Card.Body
          css={{
            py: "$10",
            margin: "auto",
          }}
        >
          <div className="mx-auto sm:px-14">
            <p className="sm:text-xl text-lg">下記の言葉を読んでください。</p>
            <p className="sm:text-xl text-lg">
              これは客観的な「事実・状況」なのか、それとも主観的な「認知・思考」なのか。
            </p>
            <p className="sm:text-xl text-lg">判断してみましょう。</p>
            <br />
            <p className="sm:text-2xl font-semibold text-lg text-center">
              「{questionBody}」
            </p>
          </div>
        </Card.Body>
        <Card.Footer>
          <Col>
            {choices.map((choice, index) => (
              <button
                onClick={() => checkAnswer(choice)}
                className="block rounded-lg bg-indigo-500 sm:px-14 px-8 py-3 my-2 text-white text-center transition hover:bg-indigo-700 focus:outline-none focus:ring mx-auto"
                key={index}
              >
                <span className="text-base sm:text-lg font-semibold">
                  {choice.content}
                </span>
              </button>
            ))}
          </Col>
        </Card.Footer>
      </Card>
      <Modal
        aria-labelledby="modal-title"
        width="50em"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Body>
          <ModalBodyContent />
        </Modal.Body>
        <Modal.Footer>
          <Row justify="center">
            <button
              onClick={turnNextPage}
              className="block rounded-lg bg-indigo-500 px-8 py-2 text-white  transition hover:bg-indigo-700 focus:outline-none focus:ring"
            >
              <span className="text-base font-semibold">次へ</span>
            </button>
          </Row>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export async function getStaticPaths() {
  const response = await axios.get("/exercises/2/questions");
  const questions: QuestionData[] = response.data.data;

  const paths = questions.map((question) => ({
    params: { id: question.attributes.qid.toString() },
  }));

  return { paths, fallback: false };
}

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { id } = context.params as Params;

  try {
    const response = await axios.get(`/exercises/2/questions/${id}`);
    const question: QuestionData = response.data.data[0];
    return {
      props: {
        question: question,
      },
    };
  } catch (err) {
    let message;
    if (axios.isAxiosError(err) && err.response) {
      console.error(err.response.data.message);
    } else {
      message = String(err);
      console.error(message);
    }
  }
};

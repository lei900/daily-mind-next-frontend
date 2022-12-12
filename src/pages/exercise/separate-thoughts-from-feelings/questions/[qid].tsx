import axios from "axios";
import { GetStaticPropsContext } from "next";
import { useState } from "react";
import { ParsedUrlQuery } from "querystring";

import { Container, Spacer, Card, Grid, Row, Modal } from "@nextui-org/react";
import { useRouter } from "next/router";

import { QuestionData, Choice } from "types/types";
import QuestionBody from "components/exercises/questions/QuestionBody";

type Props = {
  question: QuestionData;
};

export default function QuestionDetailPage({ question }: Props) {
  const [isCorrect, setIsCorrect] = useState(false);
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const questionId = question.attributes.qid;
  const questionBody = question.attributes.body.split("。");
  const choices = question.attributes.choices.map((choice) => {
    const content = choice.content;
    const isCorrectChoice = choice.is_correct_choice;
    return { content, isCorrectChoice };
  });
  const correctChoice = choices.find(
    (choice) => choice.isCorrectChoice === true
  );

  // !Caution: the number of questions is hard-coded
  const isLastQuestion = questionId === 4 ? true : false;

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
    const nextQuestionUrl = `/exercise/separate-thoughts-from-feelings/questions/${(
      questionId + 1
    ).toString()}`;
    const finalUrl = "/exercise/separate-thoughts-from-feelings/final";
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
            <strong className="text-purple-700">
              「{correctChoice?.content}」
            </strong>
            を感じるでしょう。
          </p>
        </div>
      );
    } else {
      return (
        <div className="modal-body-content mx-auto py-4 sm:px-6">
          <p className="text-lg sm:text-xl">
            人によっては考え方が違うかもしれませんね。
          </p>
          <br />
          <p className="text-lg sm:text-xl">参考解答：</p>
          <strong className="text-indigo-700 text-lg sm:text-xl">
            {correctChoice?.content}
          </strong>
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
                  認知と感情を分ける
                </h2>
                <Spacer x={0.5} />
                <p className="text-center sm:text-lg text-base self-end">
                  (Q {questionId} / 4)
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
          <QuestionBody questionBody={questionBody} />
        </Card.Body>
        <Card.Footer>
          <Row justify="center">
            <div className="grid-cols-1">
              {choices.map((choice, index) => (
                <button
                  onClick={() => checkAnswer(choice)}
                  className="block rounded-lg bg-indigo-500 sm:px-14 px-8 py-3 my-2 text-white text-left transition hover:bg-indigo-700 min-w-full"
                  key={index}
                >
                  <span className="sm:text-lg text-base font-semibold">
                    {choice.content}
                  </span>
                </button>
              ))}
            </div>
          </Row>
        </Card.Footer>
      </Card>
      <Modal
        aria-labelledby="modal-title"
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
  const response = await axios.get("/exercises/1/questions");
  const questions: QuestionData[] = response.data.data;

  const paths = questions.map((question) => ({
    params: { qid: question.attributes.qid.toString() },
  }));

  return { paths, fallback: false };
}

interface Params extends ParsedUrlQuery {
  qid: string;
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { qid } = context.params as Params;

  try {
    const response = await axios.get(`/exercises/1/questions/${qid}`);
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

import axios from "axios";
import { GetStaticPropsContext } from "next";
import { useState } from "react";
import { ParsedUrlQuery } from "querystring";
import ReactMarkdown from "react-markdown";
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

import { QuestionData, Choice, ChoiceData } from "types/types";
import { distortionData } from "components/distortions/DistortionData";

type Props = {
  question: QuestionData;
  choices: any;
};

export default function QuestionDetailPage({ question, choices }: Props) {
  const [isCorrect, setIsCorrect] = useState(false);
  const [showSuggestedAnswer, setShowSuggestedAnswer] = useState(false);
  const [showChoiceFeedback, setShowChoiceFeedback] = useState(false);
  const [selectedChoice, setselectedChoice] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const questionId = question.attributes.qid;
  const questionBody = question.attributes.body;
  const suggestAnswer = question.attributes.resultInterpretation;

  // const newChoices = question.attributes.choices.map((choice) => {
  //   const content = choice.content;
  //   const isCorrectChoice = choice.is_correct_choice;
  //   const distortionName = choice.distortion_name;
  //   return { content, isCorrectChoice, distortionName };
  // });

  const correctChoices = choices.filter(
    (choice: any) => choice.isCorrectChoice === true
  );

  // !Caution: the number of questions is hard-coded
  const isLastQuestion = questionId === 6 ? true : false;

  const checkAnswer = (choice: any) => {
    setselectedChoice(choice);
    if (choice.isCorrectChoice === true) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setShowChoiceFeedback(true);
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
    const nextQuestionUrl = `/exercise/recognize-cognitive-distortions/questions/${(
      questionId + 1
    ).toString()}`;
    const finalUrl = "/exercise/recognize-cognitive-distortions/final";
    const nextUrl = isLastQuestion ? finalUrl : nextQuestionUrl;
    router.push(nextUrl);
  };

  const ChoiceFeedback = () => {
    if (isCorrect === true) {
      return (
        <div className="modal-body-content mx-auto py-4">
          <p className="text-lg sm:text-xl">そうですね！</p>
          <br />
          <p className="text-lg sm:text-xl">この場合はが当てはまるでしょう。</p>
        </div>
      );
    } else {
      return (
        <div className="modal-body-content mx-auto py-4 sm:px-6">
          <p className="text-lg sm:text-xl">
            ちょっと当てはまらないかもしれません。
          </p>
          <p className="text-lg sm:text-xl">の定義をもう一度復習しましょう。</p>
          <br />
          <p className="text-sm sm:text-base font-semibold">事実とは：</p>
          <p className="text-base sm:text-base">
            証明も反証もできるものです。誰が何を言おうが、事実は変わりません。
          </p>
          <br />
          <p className="text-sm sm:text-base font-semibold">事例：</p>
          <p className="text-base sm:text-base">
            主観的な思考や意見であり、それを「証明」したり「反証」したりする方法はなく、単に好みや視点を反映したものです。
          </p>
        </div>
      );
    }
  };

  const SuggestedAnswer = () => {
    return (
      <div className="modal-body-content mx-auto py-6 sm:px-6">
        <div className="mb-8">
          <p className="text-xl sm:text-2xl font-semibold text-gray-800">
            参考解答：
          </p>
          {correctChoices.map((choice: any) => (
            <p className=" text-lg sm:text-xl text-gray-800">
              {choice.content}
            </p>
          ))}
        </div>
        <ReactMarkdown
          className="prose prose-neutral prose-p:sm:text-xl prose-p:text-lg prose-p:text-gray-800"
          children={suggestAnswer}
        />
        <p className="text-base sm:text-lg mt-6 text-gray-700">
          ※上記はあくまで参考解答で、絶対的な正解ではありません。
        </p>
      </div>
    );
  };

  const openSuggestedAnswer = () => {
    setShowSuggestedAnswer(true);
    openModal();
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
                  (Q {questionId} / 10)
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
            <p className="sm:text-xl text-lg">
              次のような場合に見られる認知のゆがみを選んでください。
            </p>
            <p className="sm:text-xl text-lg">
              （複数存在する可能性があります。）
            </p>
            <br />
            <div className="my-6">
              <ReactMarkdown
                className="prose prose-neutral prose-p:sm:text-xl prose-p:text-lg prose-p:text-gray-800"
                children={questionBody}
              />
            </div>
          </div>
        </Card.Body>
        <Card.Footer>
          <Row justify="center">
            <div className="grid-cols-1">
              {choices.map((choice: any, index: any) => (
                <button
                  // onClick={() => checkAnswer(choice)}
                  className="block rounded-lg bg-indigo-500 sm:px-14 px-8 py-3 my-2 text-white text-left transition hover:bg-indigo-700 min-w-full"
                  key={index}
                >
                  <span className="text-base sm:text-lg font-semibold">
                    {choice.attributes.content}
                  </span>
                </button>
              ))}
              <button
                onClick={openSuggestedAnswer}
                className="rounded-lg  text-indigo-500 border-indigo-500 hover:bg-indigo-700 hover:text-white text-center px-4 py-2 mt-5 min-w-full"
              >
                <span className="text-base sm:text-lg underline font-semibold">
                  参考解答を確認して、次へ
                </span>
              </button>
            </div>
          </Row>
        </Card.Footer>
      </Card>
      <Modal
        aria-labelledby="modal-title"
        width="50em"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Body>
          {showChoiceFeedback && <ChoiceFeedback />}
          {showSuggestedAnswer && <SuggestedAnswer />}
        </Modal.Body>
        <Modal.Footer>
          <Row justify="center">
            {/* {showChoiceFeedback && (
              <button
                onClick={closeHandler}
                className="block rounded-lg bg-indigo-500 px-8 py-2 text-white  transition hover:bg-indigo-700 focus:outline-none focus:ring"
              >
                <span className="text-base font-semibold">閉じる</span>
              </button>
            )} */}
            {showSuggestedAnswer && (
              <button
                onClick={turnNextPage}
                className="block rounded-lg bg-indigo-500 px-8 py-2 text-white  transition hover:bg-indigo-700 focus:outline-none focus:ring"
              >
                <span className="text-base font-semibold">次へ</span>
              </button>
            )}
          </Row>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export async function getStaticPaths() {
  const response = await axios.get("/exercises/3/questions");
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
    const response = await axios.get(`/exercises/3/questions/${id}`);
    const choiceRes = await axios.get(`/exercises/3/questions/${id}/choices`);
    const question: QuestionData = response.data.data[0];
    const choices = choiceRes.data.data;
    return {
      props: {
        question: question,
        choices: choices,
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

import axios from "axios";
import { GetStaticPropsContext } from "next";
import { useState } from "react";
import { ParsedUrlQuery } from "querystring";
import ReactMarkdown from "react-markdown";
import { Container, Spacer, Card, Grid, Row, Modal } from "@nextui-org/react";
import { useRouter } from "next/router";

import { QuestionData, Choice, ChoiceWithDistortionData } from "types/types";

type Props = {
  questionData: QuestionData;
  choicesData: ChoiceWithDistortionData[];
};

export default function QuestionDetailPage({
  questionData,
  choicesData,
}: Props) {
  const [showSuggestedAnswer, setShowSuggestedAnswer] = useState(false);
  const [showChoiceFeedback, setShowChoiceFeedback] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState({
    content: "",
    isCorrectChoice: false,
    distortion: {
      name: "",
      definition: "",
      description: "",
    },
  });
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const questionId = questionData.attributes.qid;
  const questionBody = questionData.attributes.body;
  const resultInterpretation = questionData.attributes.resultInterpretation;

  const choices: Choice[] = choicesData.map((choiceData) => {
    const content = choiceData.attributes.content;
    const isCorrectChoice = choiceData.attributes.isCorrectChoice;
    const distortion = choiceData.attributes.distortion;
    return { content, isCorrectChoice, distortion };
  });

  const correctChoices = choices.filter(
    (choice: Choice) => choice.isCorrectChoice === true
  );

  // !Caution: the number of questions is hard-coded
  const isLastQuestion = questionId === 6 ? true : false;

  const handleChoiceClick = (choice: Choice) => {
    setSelectedChoice({
      content: choice.content,
      isCorrectChoice: choice.isCorrectChoice,
      distortion: {
        name: choice.distortion?.name!,
        definition: choice.distortion?.definition!,
        description: choice.distortion?.description!,
      },
    });
    openChoiceFeedback();
  };

  const openModal = () => {
    setVisible(true);
  };

  const closeHandler = () => {
    setVisible(false);
  };

  const openSuggestedAnswer = () => {
    setShowChoiceFeedback(false);
    setShowSuggestedAnswer(true);
    openModal();
  };

  const openChoiceFeedback = () => {
    setShowChoiceFeedback(true);
    setShowSuggestedAnswer(false);
    openModal();
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
    const DistortionIntro = () => {
      return (
        <>
          <p className="text-lg sm:text-xl font-semibold">
            「{selectedChoice.distortion.name}」とは：
          </p>
          <ReactMarkdown className="prose prose-neutral prose-p:sm:text-xl prose-p:text-lg prose-p:text-gray-800">
            {selectedChoice.distortion.definition}
          </ReactMarkdown>
          <br />
          <p className="text-lg sm:text-xl font-semibold">具体例：</p>
          <ReactMarkdown className="prose prose-neutral prose-p:sm:text-xl prose-p:text-lg prose-p:text-gray-800">
            {selectedChoice.distortion.description}
          </ReactMarkdown>
        </>
      );
    };

    if (selectedChoice.isCorrectChoice === true) {
      return (
        <div className="modal-body-content mx-auto py-4">
          <p className="text-xl sm:text-2xl">そうですね！👏 </p>
          <p className="text-xl sm:text-2xl">
            この場合は
            <strong className="text-purple-700">
              「{selectedChoice.distortion.name}」
            </strong>
            が当てはまるでしょう。
          </p>
          <Spacer y={2} />
          <DistortionIntro />
        </div>
      );
    } else {
      return (
        <div className="modal-body-content mx-auto py-4 sm:px-6">
          <p className="text-xl sm:text-2xl">
            🤔 ちょっと当てはまらないかもしれません。
          </p>
          <p className="text-xl sm:text-2xl">
            <strong>「{selectedChoice.distortion.name}」</strong>
            の定義をもう一度復習しましょう。
          </p>
          <Spacer y={2} />
          <DistortionIntro />
        </div>
      );
    }
  };

  const SuggestedAnswer = () => {
    return (
      <div className="modal-body-content mx-auto py-6 sm:px-6">
        <div className="mb-8">
          <p className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
            参考解答：
          </p>
          {correctChoices.map((choice: Choice, index) => (
            <p
              key={index}
              className="text-indigo-700 text-lg sm:text-xl font-semibold"
            >
              {choice.content}
            </p>
          ))}
        </div>
        <ReactMarkdown className="prose prose-neutral prose-p:sm:text-xl prose-p:text-lg prose-p:text-gray-800">
          {resultInterpretation}
        </ReactMarkdown>
        <p className="text-base sm:text-lg mt-6 text-gray-700">
          ※上記はあくまで参考解答で、絶対的な正解ではありません。
        </p>
      </div>
    );
  };

  return (
    <Container md css={{ px: "$18", mt: "$12", "@mdMax": { px: "$10" } }}>
      <Card css={{ p: "$sm", mw: "900px", margin: "auto" }}>
        <Card.Header css={{ py: "$10" }}>
          <Grid.Container justify="center">
            <Grid xs={12} sm={6}>
              <Row justify="center">
                <h2 className="text-xl text-center font-semibold sm:text-2xl text-gray-700">
                  認知のゆがみに気づく
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
              <ReactMarkdown className="prose prose-neutral prose-p:sm:text-xl prose-p:text-lg prose-p:text-gray-800">
                {questionBody}
              </ReactMarkdown>
            </div>
          </div>
        </Card.Body>
        <Card.Footer>
          <Row justify="center">
            <div className="grid-cols-1">
              {choices.map((choice: Choice, index) => (
                <button
                  onClick={() => handleChoiceClick(choice)}
                  className="block rounded-lg bg-indigo-500 sm:px-14 px-8 py-3 my-2 text-white text-left transition hover:bg-indigo-700 min-w-full"
                  key={index}
                >
                  <span className="text-base sm:text-lg font-semibold">
                    {choice.content}
                  </span>
                </button>
              ))}
              <button
                onClick={openSuggestedAnswer}
                className="rounded-lg  text-indigo-500 border-indigo-500 hover:bg-indigo-700 hover:text-white text-center px-4 py-4 mt-5 min-w-full"
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
            {showChoiceFeedback && (
              <button
                onClick={closeHandler}
                className="block rounded-lg bg-indigo-500 px-14 py-3 text-white  transition hover:bg-indigo-700 focus:outline-none focus:ring"
              >
                <span className="text-base sm:text-lg font-semibold">
                  閉じる
                </span>
              </button>
            )}
            {showSuggestedAnswer && (
              <button
                onClick={turnNextPage}
                className="block rounded-lg bg-indigo-500 px-14 py-3 text-white  transition hover:bg-indigo-700 focus:outline-none focus:ring"
              >
                <span className="text-base sm:text-lg font-semibold">
                  {isLastQuestion ? "ホームへ戻る" : "次へ"}
                </span>
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
    const questionRes = await axios.get(`/exercises/3/questions/${qid}`);
    const choiceRes = await axios.get(`/exercises/3/questions/${qid}/choices`);
    const questionData: QuestionData = questionRes.data.data[0];
    const choicesData: ChoiceWithDistortionData[] = choiceRes.data.data;

    return {
      props: {
        questionData: questionData,
        choicesData: choicesData,
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

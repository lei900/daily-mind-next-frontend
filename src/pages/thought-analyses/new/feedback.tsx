import { useState } from "react";
import Link from "next/link";
import { Spacer } from "@nextui-org/react";

import {
  Good,
  Neutral,
  Bad,
  HaveFiveImage,
  ConnectionImage,
  AppreciationImage,
} from "components/Icons";

export default function NewThoughtFeedbackPage() {
  const [showFeedback, setShowFeedback] = useState(false);
  const [isBetter, setIsBetter] = useState(false);

  const handleMoodChange = (result: boolean) => {
    setIsBetter(result);
    setShowFeedback(true);
  };

  return (
    <div className="container sm:px-5 px-1 sm:mt-10 mt-6 mx-auto">
      <div className="lg:w-1/2 md:w-2/3 mx-auto">
        {!showFeedback && (
          <section className="p-2 w-full">
            <div className="mx-auto">
              <h1 className="sm:text-2xl text-xl text-center font-semibold text-gray-700">
                歪んだ考え方は少しずつ変えていきましょう。
              </h1>
              <Spacer y={1} />
              <h1 className="sm:text-2xl text-xl text-center font-semibold text-gray-700">
                今はどんな気分ですか？
              </h1>
              <Spacer y={3} />
              <div className="flex justify-center">
                <div
                  className="flex-col mx-auto p-2 rounded-lg hover:bg-gray-50 hover:shadow-sm cursor-pointer"
                  onClick={() => handleMoodChange(false)}
                >
                  <Bad className="sm:w-20 sm:h-20 w-14 h-14 mx-auto" />
                  <p className="sm:text-xl text-lg text-center mt-2 text-sky-800 font-semibold">
                    悪くなった
                  </p>
                </div>
                <div
                  className="flex-col mx-auto p-2 rounded-lg hover:bg-gray-50 hover:shadow-sm cursor-pointer"
                  onClick={() => handleMoodChange(false)}
                >
                  <Neutral className="sm:w-20 sm:h-20 w-14 h-14 mx-auto" />
                  <p className="sm:text-xl text-lg text-center mt-2 text-sky-800 font-semibold">
                    同じ
                  </p>
                </div>
                <div
                  className="flex-col mx-auto p-2 rounded-lg hover:bg-gray-50 hover:shadow-sm cursor-pointer"
                  onClick={() => handleMoodChange(true)}
                >
                  <Good className="sm:w-20 sm:h-20 w-14 h-14 mx-auto" />
                  <p className="sm:text-xl text-lg text-center mt-2 text-sky-800 font-semibold">
                    良くなった
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
        {showFeedback && (
          <section className="p-2 w-full mx-auto">
            <div className="mx-auto">
              {isBetter ? (
                <>
                  <HaveFiveImage className="mx-auto" />
                  <Spacer y={2} />
                  <h1 className="sm:text-4xl text-2xl font-semibold text-gray-700 text-center">
                    お疲れ様でした
                  </h1>
                  <Spacer y={1.5} />
                  <div className="sm:px-8 px-2 mx-auto">
                    <p className="sm:text-lg text-base text-left text-gray-700">
                      自分の思考を分析することで、ネガティブな思考パターンに気づき、より柔軟な考え方で気分を変えることができるのです。
                    </p>
                    <Spacer y={2} />
                    <p className="sm:text-lg text-base text-left text-gray-700">
                      記録習慣を続けて、思考のゆがみを見つけ直していきましょう。
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <AppreciationImage className="mx-auto" />
                  <Spacer y={2} />
                  <h1 className="sm:text-4xl text-2xl font-semibold text-gray-700 text-center">
                    お疲れ様でした
                  </h1>
                  <Spacer y={1.5} />
                  <div className="sm:px-8 px-2 mx-auto">
                    <p className="sm:text-lg text-base text-left text-gray-700">
                      自分の考えに歪みがあることに気づくこと自体が素晴らしいです!
                    </p>
                    <Spacer y={1} />
                    <p className="sm:text-lg text-base text-left text-gray-700">
                      ネガティブな思考を克服するのは大変なことですので、継続的な練習が必要かもしれません。
                    </p>
                    <Spacer y={1} />
                    <p className="sm:text-lg text-base text-left text-gray-700">
                      記録習慣を続けて、思考のゆがみを見つけ直していきましょう。
                    </p>
                  </div>
                </>
              )}
              <Spacer y={2} />
              <div className="flex justify-center">
                <Link
                  href="/"
                  className="mx-auto text-white font-medium bg-indigo-500 px-4 py-2 hover:bg-indigo-600 rounded-xl sm:text-lg"
                >
                  ホームへ戻る
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

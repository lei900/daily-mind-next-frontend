import Link from "next/link";
import Image from "next/image";

import heroPic from "components/home/images/heroPic_1.png";

export const HeroSection = () => {
  return (
    <section className="text-gray-800 ">
      <div className="container mx-auto flex md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 flex flex-col md:items-start md:text-left mb-6 md:mb-16 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-700">
            嫌な気持ちを楽にする
            <br className="hidden md:inline-block" />
            心のセルフケア
          </h1>
          <p className="sm:text-xl text-lg leading-relaxed mb-12">
            ストレスがたまって苦しい、人間関係で疲弊している、先行きが不安で眠れない......。
            <br className="hidden md:inline-block" />
            その辛さの正体を知り、自分と向き合いながら、気分を改善する。
            <br className="hidden md:inline-block" />
            それができるのは「認知療法」です。
          </p>
          <div className="flex justify-center">
            <Link
              href="/guide"
              className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded-lg sm:text-lg text-base"
            >
              認知療法を知る
            </Link>
          </div>
        </div>
        <div className="max-w-sm md:max-w-md">
          <Image alt="hero" src={heroPic} priority={true} />
        </div>
      </div>
    </section>
  );
};

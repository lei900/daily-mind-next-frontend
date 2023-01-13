import Link from "next/link";

import { TwitterLogo, GithubLogo } from "components/Icons";
import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <footer className="text-gray-600 body-font bg-gray-100">
      <div className="container px-5 pt-14 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <Link
            href="/"
            className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
          >
            <Logo />
            <span className="ml-2 text-3xl">Daily Mind</span>
          </Link>
          <p className="mt-2 text-sm text-gray-500">嫌な気持ちを楽にする</p>
          <p className="mt-2 text-sm text-gray-500">心のセルフケア</p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="font-bold text-gray-900 tracking-widest text-sm mb-3">
              About
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-800 hover:underline"
                >
                  Daily Mindについて
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  target="_blank"
                  className="text-gray-600 hover:text-gray-800 hover:underline"
                >
                  お問い合わせ
                </Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-bold text-gray-900 tracking-widest text-sm mb-3">
              Guides
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link
                  href="/guide"
                  className="text-gray-600 hover:text-gray-800 hover:underline"
                >
                  認知療法とは
                </Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="font-bold text-gray-900 tracking-widest text-sm mb-3">
              Links
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link
                  href="https://twitter.com/Maize_2"
                  target="_blank"
                  className="text-gray-600 hover:text-gray-800 flex flex-row hover:underline md:justify-start justify-center"
                >
                  <TwitterLogo className="h-5 w-5 mr-1" />
                  開発者Twitter
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/lei900/daily-mind-next-frontend"
                  target="_blank"
                  className="text-gray-600 hover:text-gray-800 flex flex-row hover:underline md:justify-start justify-center"
                >
                  <GithubLogo className="h-5 w-5 mr-1" /> Github
                </Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="font-bold text-gray-900 tracking-widest text-sm mb-3">
              Legal
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-gray-800"
                >
                  利用規約
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-gray-800"
                >
                  プライバシーポリシー
                </Link>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-8 px-5 flex flex-wrap flex-col sm:flex-row">
        <p className="text-gray-500 text-sm text-center sm:text-left">
          © 2022 Daily Mind
        </p>
      </div>
    </footer>
  );
};

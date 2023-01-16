import { Text, Spacer, Container, Link } from "@nextui-org/react";
import Head from "next/head";

import { Footer } from "components/layouts/Footer";

export default function PravicyPage() {
  return (
    <>
      <Head>
        <title>プライバシーポリシー - Daily Mind</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container sm css={{ px: "$12", mt: "$8", "@xsMax": { px: "$10" } }}>
        <div className="border-b border-t-0 border-l-0 border-r-0 border">
          <Text size="$3xl" b>
            プライバシーポリシー
          </Text>
        </div>
        <Spacer y={1.5} />
        <Text size="$md">
          Daily Mind
          の運営者（以下、「運営者」といいます。）が本ウェブサイト上で提供するサービス（以下、「本サービス」といいます。）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。
        </Text>
        <Spacer y={1} />
        <Text size="$md">
          Daily Mind
          を利用する登録ユーザーは、本規約の全ての記載内容について同意したものとみなされます。
        </Text>
        <Spacer y={1} />
        <Text b size="$xl">
          第1条（ユーザーから取得する情報）
        </Text>
        <Spacer y={1} />
        <ol className="list-decimal pl-8">
          <li>
            <Text size="$md">
              本サービスは、ユーザーから以下の情報を取得します。
            </Text>
            <Spacer y={0.5} />
            <ol className="list-decimal pl-8">
              <li>
                <Text size="$md">ニックネーム</Text>
              </li>
              <li>
                <Text size="$md">メールアドレス</Text>
              </li>
              <li>
                <Text size="$md">プロフィール写真</Text>
              </li>
              <li>
                <Text size="$md">
                  外部サービスでお客様が利用するID、その他外部サービスのプライバシー設定によりお客様が連携先に開示を認めた情報
                </Text>
              </li>
            </ol>
          </li>
        </ol>
        <Spacer y={1} />
        <Text b size="$xl">
          第2条（ユーザーの情報を利用する目的）
        </Text>
        <Spacer y={1} />
        <ol className="list-decimal pl-8">
          <li>
            <Text size="$md">
              本サービスに関する登録の受付、ユーザーの本人確認、認証のため
            </Text>
          </li>
          <li>
            <Text size="$md">本サービスに関するご案内をするため</Text>
          </li>
          <li>
            <Text size="$md">
              本サービスの運営並びにこれらの開発、運用及び保守のため
            </Text>
          </li>
          <li>
            <Text size="$md">本サービスの利用状況の確認のため</Text>
          </li>
          <li>
            <Text size="$md">
              本サービスの向上、改善に向けた情報収集及び、新たなサービスを開発するため
            </Text>
          </li>
          <li>
            <Text size="$md">ユーザーからのお問い合わせに対応するため</Text>
          </li>
          <li>
            <Text size="$md">
              本サービスの規約や法令に違反する行為に対応するため
            </Text>
          </li>
          <li>
            <Text size="$md">
              本サービスのメンテナンス情報、その他本サービスをご利用いただく上で重要となる事項をお知らせするため
            </Text>
          </li>
        </ol>
        <Spacer y={1} />
        <Text b size="$xl">
          第3条（第三者への提供）
        </Text>
        <Spacer y={1} />
        <Text size="$md">
          運営者は、ユーザーから取得する情報のうち、個人データ（個人情報保護法第２条第６項）に該当するものついては、あらかじめユーザーの同意を得ずに、第三者（日本国外にある者を含みます。）に提供しません。
        </Text>
        <Text size="$md">但し、次の場合は除きます。</Text>
        <ol className="list-decimal pl-8">
          <li>
            <Text size="$md">個人データの取扱いを外部に委託する場合</Text>
          </li>
          <li>
            <Text size="$md">当サービスが買収された場合</Text>
          </li>
          <li>
            <Text size="$md">
              事業パートナーと共同利用する場合（具体的な共同利用がある場合は、その内容を別途公表します。）
            </Text>
          </li>
          <li>
            <Text size="$md">
              その他、法律によって合法的に第三者提供が許されている場合
            </Text>
          </li>
        </ol>
        <Spacer y={1} />
        <Text b size="$xl">
          第4条（アクセス解析ツール）
        </Text>
        <Spacer y={1} />
        <Text size="$md">
          運営者は、ユーザーのアクセス解析のために、「Googleアナリティクス」を利用しています。
        </Text>
        <Text size="$md">
          Googleアナリティクスは、トラフィックデータの収集のためにCookieを使用しています。トラフィックデータは匿名で収集されており、個人を特定するものではありません。Cookieを無効にすれば、これらの情報の収集を拒否することができます。詳しくはお使いのブラウザの設定をご確認ください。
        </Text>
        <Text size="$md">
          Googleアナリティクスについて、詳しくは以下からご確認ください。
        </Text>
        <Link
          href="https://marketingplatform.google.com/about/analytics/terms/jp/"
          isExternal
        >
          https://marketingplatform.google.com/about/analytics/terms/jp/
        </Link>
        <Spacer y={1} />
        <Text b size="$xl">
          第5条（プライバシーポリシーの変更）
        </Text>
        <Spacer y={1} />
        <ol className="list-decimal pl-8">
          <li>
            <Text size="$md">
              本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、ユーザーに通知することなく、変更することができるものとします。
            </Text>
          </li>
          <li>
            <Text size="$md">
              運営者が別途定める場合を除いて、変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。
            </Text>
          </li>
        </ol>
        <Spacer y={1} />
        <Text b size="$xl">
          第6条（お問い合わせ）
        </Text>
        <Spacer y={1} />
        <Text size="$md">
          本ポリシーに関するお問い合わせは、お問い合わせフォームまでお願いいたします。
        </Text>
        <Spacer y={1.5} />
        <div className="border-b border-t-0 border-l-0 border-r-0 border" />
        <Spacer y={1.5} />
        <Text size="$sm">2023年1月16日 制定</Text>
      </Container>
      <Spacer y={2} />
      <Footer />
    </>
  );
}

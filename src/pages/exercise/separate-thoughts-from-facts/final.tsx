import { Container, Spacer, Card, Grid, Row, Col } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

import exercisePic from "components/exercises/images/exercisePic_2.png";

export default function Exercise2FinalPage() {
  return (
    <Container md css={{ px: "$18", mt: "$12", "@mdMax": { px: "$10" } }}>
      <Card css={{ p: "$sm", mw: "900px", margin: "auto" }}>
        <Card.Header css={{ py: "$10" }}>
          <Grid.Container justify="center">
            <Grid xs={12} sm={6}>
              <Row align="center">
                <Image alt="exercisePic_1" src={exercisePic} width={70} />
                <Spacer x={0.5} />
                <Col>
                  <h2 className="text-2xl font-semibold sm:text-3xl text-gray-700">
                    認知と事実を分ける
                  </h2>
                  <p className="text-gray-600 sm:text-base text-sm">
                    あの考えは本当に事実なのか?!
                  </p>
                </Col>
              </Row>
            </Grid>
          </Grid.Container>
        </Card.Header>
        <Card.Divider />
        <Card.Body
          css={{
            py: "$12",
            px: "$lg",
            "@mdMin": { px: "$3xl" },
            margin: "auto",
          }}
        >
          <div className="exercise-intro">
            <p className="sm:text-lg text-base">練習お疲れさまでした！</p>
            <br />
            <p className="sm:text-lg text-base">
              私たちの気持ちはすべて、自分の認知に影響されます。
            </p>
            <p>
              <strong className="sm:text-xl text-lg border-b-4 border-purple-700 border-opacity-50">
                認知を考え直す
              </strong>
              ことにより、気分を改善することができます。
            </p>
            <br />
            <p className="sm:text-lg text-base">
              と言っても、考え方を変えればいいと頭ではわかるが、
            </p>
            <p className="sm:text-lg text-base">
              なかなかそう簡単にはいかない、ということもよくあります。
            </p>
            <p className="sm:text-lg text-base">
              人は自分の信念を変えるのはなかなか難しいです。
            </p>
            <br />
            <p className="sm:text-lg text-base">
              まずは、自分の
              <strong className="sm:text-xl text-lg border-b-4 border-purple-700 border-opacity-50">
                認知に疑問を持つ
              </strong>
              ようになることです。
            </p>
            <br />
            <p className="sm:text-lg text-base">
              辛くなったときは、
              <strong className="sm:text-xl text-lg border-b-4 border-purple-700 border-opacity-50">
                今の考えは本当に事実なのか
              </strong>
              、それとも自分の思い込みなのか、
            </p>
            <p className="sm:text-lg text-base">
              もし事実ではないなら、その考えへの反証はあるのか、と
            </p>
            <p className="sm:text-lg text-base">
              自分に質問を投げかけてみましょう。
            </p>
          </div>
        </Card.Body>
        <Card.Footer>
          <Row justify="center">
            <Link
              href="/"
              className="block rounded-lg bg-indigo-500 px-4 py-3 text-white  transition hover:bg-indigo-700 focus:outline-none focus:ring text-center"
              type="button"
            >
              <span className="sm:text-lg text-base font-semibold">
                ホームへ戻る
              </span>
            </Link>
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  );
}

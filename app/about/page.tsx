import { Container, Button } from '@mantine/core';

export default function Home() {
  return (
    <>
      <Container size="xl" className="text-center">
        <h2 className="text-4xl my-40">Vコレってなんだ？</h2>
        <p className="text-xl my-20">
          「ボカロキャラ(広義)がリアルにいたらどんな風に過ごしているのだろう？」
        </p>
        <p className="text-xl my-20">
          「ボカロモチーフのおしゃれ全般のグッズがあったらどんなものだろう？」
        </p>
        <p className="text-xl my-40">
          そんな想像を膨らませながら、<br />VOCALOID同好会の有志のメンバーが集まり
          季節ごとにテーマを決めて絵を描いています。
        </p>
        <p className="text-2xl mt-96 mb-20">
          さて、今シーズンは、どんな服を着ているでしょうか？
        </p>
        {/* 見てみる！ ボタンを表示 */}
        <Button
          component="a"
          href="/"
          variant="outline"
          color="blue"
          radius="xl"
          size="lg"
          className="mb-60"
        >
          見てみる！
        </Button>

      </Container>
    </>
  );
}

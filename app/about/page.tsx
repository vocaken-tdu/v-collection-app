import { Container, Button } from '@mantine/core';

export default function Home() {
  return (
    <>
      <Container size="xl" className="text-center">
        <h2 className="text-4xl my-40">Vコレってなんだ？</h2>
        <p className="text-xl my-20 leading-loose">
          「ボカロキャラ(広義)が
          <br className="sp-only" />
          リアルにいたら
          <br className="pc-only" />
          どんな風に
          <br className="sp-only" />
          過ごしているのだろう？」
        </p>
        <p className="text-xl my-20 leading-loose">
          「ボカロモチーフの
          <br className="sp-only" />
          おしゃれ全般の
          <br className="pc-only" />
          グッズがあったら
          <br className="sp-only" />
          どんなものだろう？」
        </p>
        <p className="text-xl my-40 leading-loose">
          そんな想像を膨らませながら
          <br />
          VOCALOID同好会のメンバーが
          <br />
          季節ごとに絵を描いています。
        </p>
        <p className="text-2xl mt-96 mb-20 leading-relaxed">
          さて……
          <br />
          <br />
          今シーズンは
          <br />
          どんな服やグッズが
          <br className="sp-only" />
          あるのでしょう？
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

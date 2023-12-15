import { Container, Button } from '@mantine/core';

export default function Home() {
  return (
    <>
      <Container size="xl" className="text-center">
        <h2 className="text-4xl my-40">アーティスト一覧</h2>
        <p className="text-xl my-20">
          ？？？「やべ、まだこのページはできてないのだ」
        </p>
        <p className="text-xl my-20">
          「見ちゃダメなのだ！」
        </p>
        <p className="text-3xl my-40">
          戻るのだ！
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
          見てみる！ (強引)
        </Button>

      </Container>
    </>
  );
}
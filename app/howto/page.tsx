import { Container, Button, Paper, Group } from '@mantine/core';

export default function Home() {
  return (
    <>
      <Container size="xl" className="text-center">
        <h2 className="text-4xl my-40">使い方</h2>

        <h3 className="text-3xl mt-20">1. まずはイラストを<br className="sp-only" />見に行こう</h3>
        <p className="text-xl leading-relaxed">ピンとくるイラストを探そう。</p>
        <Button component="a" href="/" variant="outline" color="blue" radius="xl" size="lg">
          一覧を見てみる！
        </Button>

        <h3 className="text-3xl mt-40">2. コメントしよう！</h3>
        <p className="text-xl leading-relaxed">
          思ったことを投稿してみましょう。
          <br />
          （部員限定）
        </p>
        <p className="text-xl leading-relaxed mt-16">例えば……</p>
        <Group justify="center" gap="md">
          <Paper shadow="xl" radius="md" p="xl" w={280}>
            「透き通ってかわいい。
            <br />
            髪の毛がふわっとしてて
            <br />
            躍動感あってめっちゃ好み」
          </Paper>
          <Paper shadow="xl" radius="md" p="xl" w={280}>
            「黒服がかっこいい！
            <br />
            普段とは違う雰囲気の
            <br />
            キャラもいいなぁ……」
          </Paper>
          <Paper shadow="xl" radius="md" p="xl" w={280}>
            「背景きれいだ……白い雪と
            <br />
            赤い服のコントラストが
            <br />
            冬っぽさ感じて好きです！」
          </Paper>
        </Group>

        <h3 className="text-3xl mt-40">3. 他の人のコメントも<br className="sp-only" />チェック！</h3>
        <p className="text-xl leading-relaxed">
          Vコレでは、絵ではなく
          <br className="sp-only" />
          「コメント」に対して
          <br />
          いいねがつけられます！
        </p>
        <p className="text-xl leading-relaxed mt-8">
          <b>
            「コメントに共感した……」
            <br className="sp-only" />
            「ナイスコメント！」
            <br />
            「いいなぁー」
          </b>
          と思ったら、
          <br className="sp-only" />
          いいねを押してみましょう！
          <br />
          （1人1度まで！）
        </p>

        <h2 className="text-4xl mt-80">注意事項</h2>

        <h3 className="text-3xl mt-40">コメントは<br className="sp-only" />削除できないよ！</h3>
        <p className="text-xl leading-relaxed">
          原則コメントの編集や
          <br className="sp-only" />
          削除はできません。
        </p>
        <p className="text-xl leading-relaxed mt-8">
          コメントを投稿する前に、
          <br className="sp-only" />
          誤字をチェックしましょう！
        </p>

        <h3 className="text-3xl mt-40">ボタンは<br className="sp-only" />連打しちゃだめ！</h3>
        <p className="text-xl leading-relaxed">
          反映されていないように見えたら、
          <br />
          一度ページを更新してみましょう。
        </p>
      </Container>
    </>
  );
}

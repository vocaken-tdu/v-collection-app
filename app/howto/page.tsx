import Link from 'next/link';
import { Container, Button, Paper, Group, Space, Text } from '@mantine/core';

export default function Home() {
  return (
    <>
      <Container size="xl" ta="center">
        <h2>使い方</h2>

        <h3>
          1. まずはイラストを
          <br className="sp-only" />
          見に行こう
        </h3>
        <Text size="xl" my="xl">ピンとくるイラストを探そう。</Text>
        <Link href="/">
          <Button variant="outline" color="themeColor" radius="xl" size="lg">
            一覧を見てみる！
          </Button>
        </Link>

        <h3>2. コメントしよう！</h3>
        <Text size="xl" my="xl">
          思ったことを投稿してみましょう。
          <br />
          （部員限定）
        </Text>
        <Text size="xl" my="xl">例えば……</Text>
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

        <h3>
          3. 他の人のコメントも
          <br className="sp-only" />
          チェック！
        </h3>
        <Text size="xl" my="xl">
          Vコレでは、絵ではなく
          <br className="sp-only" />
          「コメント」に対して
          <br />
          いいねがつけられます！
        </Text>
        <Text size="xl" my="xl">
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
        </Text>

        <Space h={120} />

        <h2>注意事項</h2>

        <h3>
          コメントは
          <br className="sp-only" />
          削除できないよ！
        </h3>
        <Text size="xl" my="xl">
          原則コメントの編集や
          <br className="sp-only" />
          削除はできません。
        </Text>
        <Text size="xl" my="xl">
          コメントを投稿する前に、
          <br className="sp-only" />
          誤字をチェックしましょう！
        </Text>

        <h3>
          ボタンは
          <br className="sp-only" />
          連打しちゃだめ！
        </h3>
        <Text size="xl" my="xl">
          反映されていないように見えたら、
          <br />
          一度ページを更新してみましょう。
        </Text>
      </Container>
    </>
  );
}

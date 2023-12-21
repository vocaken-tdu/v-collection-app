import { Container, Button, Paper, Group } from '@mantine/core';
import { Shape20 } from '@/components/Background/Shape20';

export default function Home() {
  return (
    <>
      <Shape20 size="half" />
      <Container size="xl" className="text-center">
        <h2 className="text-4xl my-40">使い方</h2>
        <h3 className="text-3xl mt-20">1. イラストを選ぼう</h3>
        <p className="text-xl leading-relaxed">ピンときたイラストを見てみましょう。</p>
        <Button component="a" href="/" variant="outline" color="blue" radius="xl" size="lg">
          一覧を見てみる！
        </Button>
        <h3 className="text-3xl mt-36">2. コメントしよう！</h3>
        <p className="text-xl leading-relaxed">思ったことを投稿してみましょう！ （部員限定）</p>
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
        <h3 className="text-3xl mt-36">3. 他の人のコメントを見よう！</h3>
        <p className="text-xl leading-relaxed">
          Vコレでは、絵自体ではなく
          <br />
          「コメント」に対していいねがつけられます！
        </p>
        <p className="text-xl leading-relaxed mt-8">
          「コメントに共感した……」
          <br />
          「ナイスコメント！」
          <br />
          「いいなぁー」と思ったら、
          <br />
          いいねを押してみましょう！ （一人1回まで！）
        </p>
      </Container>
    </>
  );
}

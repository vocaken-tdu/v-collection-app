import Link from 'next/link';
import { Container, Button, Text } from '@mantine/core';
import classes from './page.module.css';

export default function Home() {
  return (
    <>
      <Container size="xl" ta="center">
        <h2>Vコレってなんだ？</h2>
        <iframe
          width="600"
          height="337.5"
          style={{ border: 'none' }}
          src="https://www.youtube.com/embed/6mldw9QTCWg?si=pFwWyH7xy0CQDOAD"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
        <Text size="xl" mt={80} className={classes.text}>
          「ボカロキャラ(広義)が
          <br className="sp-only" />
          リアルにいたら
          <br className="pc-only" />
          どんな風に
          <br className="sp-only" />
          過ごしているのだろう？」
        </Text>
        <Text size="xl" mt={80} className={classes.text}>
          「ボカロモチーフの
          <br className="sp-only" />
          おしゃれ全般の
          <br className="pc-only" />
          グッズがあったら
          <br className="sp-only" />
          どんなものだろう？」
        </Text>
        <Text size="xl" mt={120} className={classes.text}>
          そんな想像を膨らませながら
          <br />
          VOCALOID同好会のメンバーが
          <br />
          季節ごとに絵を描いています。
        </Text>
        <Text mt={320} mb={64} className={classes.ctaText}>
          さて……
          <br />
          <br />
          今シーズンは
          <br />
          どんな服やグッズが
          <br className="sp-only" />
          あるのでしょう？
        </Text>
        {/* 見てみる！ ボタンを表示 */}
        <Link href="/">
          <Button variant="outline" color="themeColor" radius="xl" size="lg">
            見てみる！
          </Button>
        </Link>
      </Container>
    </>
  );
}

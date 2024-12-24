'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Container, Group, Card } from '@mantine/core';
import { illusts as illustsRaw } from '@/utils/data';
import classes from './MainVisual.module.css';

import { Arrow } from '@/components/_ui/Arrow';
import { Logo2024 } from '@/components/Logo/Logo2024';

const archiveIllusts = Number(process.env.NEXT_PUBLIC_ARCHIVE_SEASON_ID);

export function MainVisual() {
  const [randId, setRandId] = useState(0);

  // ロード完了時の処理
  const [isLoaded, setLoaded] = useState(false);

  // 表示対象のイラストのみに絞る
  const illusts = illustsRaw.filter((illust) => illust.tags[0] > archiveIllusts);

  // イラストのIDをランダムに生成
  const initRand = Math.floor(Math.random() * illusts.length); // 初期用 0を含む
  const rand = Math.floor(Math.random() * (illusts.length - 1) + 1); // 加算用 0は除く

  // ランダムにイラストを変更する関数
  const changeIllust = () => setRandId((id) => (id + rand) % illusts.length);

  useEffect(() => {
    // 初期値を再設定
    setRandId(initRand);

    // 8秒ごとにイラストを変更
    const timer = setInterval(changeIllust, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Container size="xl" className={classes.wrap}>
      <div className={classes.inner}>
        <div className={classes.left}>
          <div className={`${classes.catchPhrase} anim-bounce`}>
            <div className={`${classes.highlight} ${classes.line1}`}>あのキャラはこの夏､</div>
            <div className={`${classes.highlight} ${classes.line2}`}>なにを着ているだろう</div>
            <Arrow />
          </div>
          <Group mt={80} visibleFrom="md" className={classes.logo}>
            <Logo2024 />
          </Group>
        </div>
        {/*ランダムイラスト*/}
        <Link href={`/works/${illusts[randId]?.id}`} className="anim-wave">
          <Card
            id="randomImage"
            className={`${classes.card} ${isLoaded && 'anim-fadeIn'}`}
            key={randId} // 変更時にアニメーションを実行する
            bg="transparent"
          >
            <Image
              width={300}
              height={400}
              onLoad={() => setLoaded(true)}
              className={`${classes.image} big-shadow`}
              src={illusts[randId]?.illust}
              alt="Vコレのイラスト(ランダムで表示)"
              unoptimized
            />
          </Card>
        </Link>

        {/*ロゴ2*/}
        <Group mt={24} hiddenFrom="md" className={classes.logo}>
          <Logo2024 />
        </Group>
      </div>
    </Container>
  );
}

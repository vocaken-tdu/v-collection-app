'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Container, Group, Card } from '@mantine/core';
import logo from '@/public/2024-summer/Logo_24sum.webp';
import Dummy from '@/public/dummy.svg';
import { Arrow } from '@/components/_ui/Arrow';
import classes from './MainVisual.module.css';
import useStore from '@/store/useStore';
import { useIllustList, dataInfo } from '@/store/illustListStore';
import { useIsFirstAccess } from '@/store/isFirstAccess';

export function MainVisual() {
  const [randId, setRandId] = useState(0);

  // 初回アクセスかどうかを取得
  const isFirstAccess = useIsFirstAccess((state) => state.isFirstAccess);

  // ロード完了時の処理
  const [isLoaded, setLoaded] = useState(false);

  // イラスト(リスト)の状態を取得
  const illusts = useIllustList((state) => state.illustList);

  // イラストのIDをランダムに生成
  const initRand = Math.floor(Math.random() * illusts.length); // 初期用 0を含む
  const rand = Math.floor(Math.random() * (illusts.length - 1) + 1); // 加算用 0は除く

  // ランダムにイラストを変更する関数
  const changeIllust = () => setRandId((id) => (id + rand) % illusts.length);

  // 取得済みかどうかを判定
  const isExist = useStore(dataInfo, (state) => state.isExist) || false;
  const isUpdated = useStore(dataInfo, (state) => state.isUpdated) || false;

  useEffect(() => {
    // 初期値を再設定
    setRandId(initRand);

    // 8秒ごとにイラストを変更
    const timer = setInterval(changeIllust, 8000);
    return () => clearInterval(timer);
  }, [isUpdated]);

  return (
    <Container size="xl" className={`${classes.wrap}`}>
      <div className={classes.inner}>
        <div className={`${classes.left}`}>
          <div
            className={`${classes.catchPhrase} ${isExist && 'anim-bounce'}`}
            style={{ animationDelay: isFirstAccess ? '4.5s' : '0s' }}
          >
            <div className={`${classes.highlight} ${classes.line1}`}>あのキャラはこの夏､</div>
            <div className={`${classes.highlight} ${classes.line2}`}>なにを着ているだろう</div>
            {isExist && <Arrow />}
          </div>
          <Group mt={80} visibleFrom="md">
            <Image
              width={600}
              height={300}
              quality={80}
              className={classes.logo}
              src={logo.src}
              alt="Vコレのロゴ"
            />
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
              src={`${isExist ? illusts[randId].illust : Dummy.src}`}
              alt="Vコレのイラスト(ランダムで表示)"
              unoptimized
            />
          </Card>
        </Link>

        {/*ロゴ2*/}
        <Group mt={48} hiddenFrom="md" justify="center">
          <Image
            width={600}
            height={300}
            quality={80}
            alt="Vコレのロゴ"
            className={classes.logo}
            src={logo.src}
          />
        </Group>
      </div>
    </Container>
  );
}

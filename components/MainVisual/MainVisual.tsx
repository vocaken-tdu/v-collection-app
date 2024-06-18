'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Image, Container, Group, Card } from '@mantine/core';
import logo from '@/public/Logo_24sum.webp';
import Dummy from '@/public/dummy.svg';
import { Arrow } from '@/components/_ui/Arrow';
import classes from './MainVisual.module.css';
import useStore from '@/store/useStore';
import { useIllustList, dataInfo } from '@/store/illustListStore';

export function MainVisual() {
  const [randId, setRandId] = useState(0);

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
    <Container size="xl" className={`${classes.main}`}>
      <div className={classes.inner}>
        <div className={`${classes.content} grid place-content-center`}>
          <div className={`${classes.catchPhrase} ${isExist && 'anim-bounce'}`}>
            <div className={`${classes.highlight} ${classes.l}`}>あのキャラはこの夏､</div>
            <div className={`${classes.highlight} ${classes.r}`}>なにを着ているだろう</div>
            {isExist && <Arrow />}
          </div>
          <Group mt={80} visibleFrom="md">
            <Image className={classes.logo} src={logo.src} alt="Vコレのロゴ" />
          </Group>
        </div>
        {/*ランダムイラスト*/}
        <Link href={`/works/${illusts[randId].id}`} className="anim-wave">
          <Card
            id="randomImage"
            className="rotate-3 !overflow-visible anim-fadeIn"
            key={randId} // 変更時にアニメーションを実行する
            bg="transparent"
          >
            <Image
              className={`${classes.image} ${isExist || 'opacity-0'} big-shadow`}
              src={`${isExist ? illusts[randId].illust : Dummy.src}`}
              alt="Vコレのイラスト(ランダムで表示)"
            />
          </Card>
        </Link>

        {/*ロゴ2*/}
        <Group mt={48} hiddenFrom="md" justify="center">
          <Image className={classes.logo} src={logo.src} alt="Vコレのロゴ" />
        </Group>
      </div>
    </Container>
  );
}

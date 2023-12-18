'use client';

import { useLayoutEffect, useRef } from 'react';
import { Image, Container, Group, Skeleton } from '@mantine/core';
import { gsap } from 'gsap';
import logo from '@/public/Logo.png';
import dummy from '@/public/dummy.svg';
import classes from './MainVisual.module.css';
import { useIllustList } from '@/store/illustListStore';

export function MainVisual() {
  const boxRef = useRef(null);
  const rand = Math.random();

  // アニメーション
  useLayoutEffect(() => {
    // 上下に動くアニメーション
    gsap.to(boxRef.current, {
      y: '+=12',
      duration: 1.8,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  });

  // イラスト(リスト)の状態を取得
  const illusts = useIllustList((state) => state.illustList);

  // 取得済みかどうかを判定
  const isFetched = useIllustList((state) => state.isFetched);

  return (
    <Container size="xl" className={`${classes.main} h-screen overflow-hidden`}>
      <div className={classes.inner}>
        <div className={`${classes.content} grid place-content-center`}>
          <div className={classes.title}>
            <div className={`${classes.highlight} ${classes.l}`}>あのキャラはこの冬</div>
            <div className={`${classes.highlight} ${classes.r}`}>
              どんな服
              <div className={classes.pcText}>で過ごしているだろう</div>
              <div className={classes.spText}>なんだろう</div>
            </div>
          </div>
          <Group mt={64} visibleFrom="md">
            <Image className={classes.logo} src={logo.src} />
          </Group>
        </div>
        {/*メインイラスト*/}
        <div id="randomImage" className="rotate-3" ref={boxRef}>
          <Skeleton visible={!isFetched}>
            <Image
              className={classes.image}
              src={`${isFetched ? illusts[Math.floor(rand * illusts.length)].illust : dummy.src}`}
            />
          </Skeleton>
        </div>

        {/*ロゴ2*/}
        <Group mt={64} hiddenFrom="md" justify="center">
          <Image className={classes.logo} src={logo.src} />
        </Group>
      </div>
    </Container>
  );
}

'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { Image, Container, Group, Skeleton } from '@mantine/core';
import { gsap } from 'gsap';
import logo from '@/public/Logo.png';
import classes from './MainVisual.module.css';
import { setIllustList, useIllustList } from '@/store/illustListStore';

export function MainVisual() {
  const boxRef = useRef(null);

  // 上下に動くアニメーション
  useLayoutEffect(() => {
    gsap.to(boxRef.current, {
      y: '+=12',
      duration: 1.8,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
    gsap.to('#randomImage', {
      opacity: 1,
      duration: 1,
      ease: 'sine.inOut',
    });
  });

  // イラスト(リスト)を取得
  useEffect(() => {
    setIllustList();
  }, []);

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
        <div className="rotate-3" ref={boxRef}>
          <Skeleton visible={!isFetched}>
            <Image id="randomImage" className={classes.image} src={`${isFetched ? illusts[Math.floor(Math.random() * illusts.length)].illust : undefined} `} />
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

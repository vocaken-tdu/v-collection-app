'use client';

import { useEffect, useRef } from 'react';
import { Image, Container, Group, Card } from '@mantine/core';
import { gsap } from 'gsap';
import logo from '@/public/Logo.webp';
import dummy from '@/public/dummy.svg';
import classes from './MainVisual.module.css';
import { useIllustList } from '@/store/illustListStore';

export function MainVisual() {
  const boxRef = useRef(null);
  const rand = Math.random();

  // イラスト(リスト)の状態を取得
  const illusts = useIllustList((state) => state.illustList);

  // イラストのIDをランダムに生成
  const randId = Math.floor(rand * illusts.length);

  // 取得済みかどうかを判定
  const isFetched = useIllustList((state) => state.isFetched());

  useEffect(() => {
    // 取得済みでなければ何もしない
    if (!isFetched) return;

    // フェードイン
    gsap.fromTo(
      boxRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.4,
        ease: 'sine.inOut',
      }
    );
    // 上下に動くアニメーション
    gsap.to(boxRef.current, {
      y: '+=12',
      duration: 1.8,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  }, [isFetched]);

  return (
    <Container size="xl" className={`${classes.main} h-screen overflow-hidden`}>
      <div className={classes.inner}>
        <div className={`${classes.content} grid place-content-center`}>
          <div className={classes.title}>
            <div className={`${classes.highlight} ${classes.l}`}>あのキャラはこの冬</div>
            <div className={`${classes.highlight} ${classes.r}`}>
              <div className={classes.pcText}>どんな風に過ごしているだろう</div>
              <div className={classes.spText}>どうしているだろう</div>
            </div>
          </div>
          <Group mt={64} visibleFrom="md">
            <Image className={classes.logo} src={logo.src} alt="Vコレのロゴ" />
          </Group>
        </div>
        {/*ランダムイラスト*/}
        <Card
          id="randomImage"
          className="rotate-3 overflow-visible"
          ref={boxRef}
          component="a"
          href={`/works/${illusts[randId].id}`}
        >
          <Image
            className={`${classes.image} ${isFetched || 'opacity-0'}`}
            src={`${isFetched ? illusts[randId].illust : dummy.src}`}
            alt="Vコレのイラスト(ランダムで表示)"
          />
        </Card>

        {/*ロゴ2*/}
        <Group mt={64} hiddenFrom="md" justify="center">
          <Image className={classes.logo} src={logo.src} alt="Vコレのロゴ" />
        </Group>
      </div>
    </Container>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { Image, Container, Group, Card } from '@mantine/core';
import { gsap } from 'gsap';
import logo from '@/public/Logo.webp';
import dummy from '@/public/dummy.svg';
import classes from './MainVisual.module.css';
import { useIllustList } from '@/store/illustListStore';

export function MainVisual() {
  const boxRef = useRef(null);
  const [randId, setRandId] = useState(0);

  // イラスト(リスト)の状態を取得
  const illusts = useIllustList((state) => state.illustList);

  // イラストのIDをランダムに生成
  const initRand = Math.floor(Math.random() * illusts.length); // 初期用 0を含む
  const rand = Math.floor(Math.random() * (illusts.length - 1) + 1); // 加算用 0は除く

  // 取得済みかどうかを判定
  const isFetched = useIllustList((state) => state.isFetched());

  // フェードイン
  useEffect(() => {
    // 取得済みでなければ何もしない
    if (!isFetched) return;

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
  }, [isFetched, randId]);

  // 上下に動くアニメーション
  useEffect(() => {
    // 取得済みでなければ何もしない
    if (!isFetched) return;

    gsap.to(boxRef.current, {
      y: '+=12',
      duration: 1.8,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  }, [isFetched]);

  // ランダムにイラストを変更 (現状から加算)
  const changeIllust = () => setRandId((id) => (id + rand) % illusts.length);

  useEffect(() => {
    // 初期値を再設定
    setRandId(initRand);

    // 8秒ごとにイラストを変更
    const timer = setInterval(changeIllust, 8000);
    return () => clearInterval(timer);
  }, [isFetched]);

  return (
    <Container size="xl" className={`${classes.main} h-screen overflow-hidden`}>
      <div className={classes.inner}>
        <div className={`${classes.content} grid place-content-center`}>
          <div className={classes.title}>
            <div className={`${classes.highlight} ${classes.l}`}>あのキャラはこの冬</div>
            <div className={`${classes.highlight} ${classes.r}`}>どう過ごしているだろう</div>
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
          bg="transparent"
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

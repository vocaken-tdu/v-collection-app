'use client';

import { useEffect, useRef, useState } from 'react';
import { Image, Container, Group, Card } from '@mantine/core';
import { gsap } from 'gsap';
import logo from '@/public/Logo.webp';
import dummy from '@/public/dummy.svg';
import arrow from '@/public/arrow.svg';
import classes from './MainVisual.module.css';
import useStore from '@/store/useStore';
import { useIllustList, dataInfo } from '@/store/illustListStore';

export function MainVisual() {
  const boxRef = useRef(null);
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

  // フェードイン
  useEffect(() => {
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
  }, [randId]);

  // 上下に動くアニメーション
  useEffect(() => {
    gsap.to(boxRef.current, {
      y: '+=12',
      duration: 1.8,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  }, [isExist]);

  // キャッチフレーズのアニメーション(右下を軸として-3度回転)
  useEffect(() => {
    // 取得済みでない場合はアニメーションを実行しない
    if (!isExist) return;

    gsap.to('#catchPhrase', {
      rotate: -2.297,
      duration: 0.8,
      transformOrigin: 'right bottom',
      ease: 'bounce.out',
    });
    gsap.fromTo(
      '#arrowPC',
      {
        right: 0,
        bottom: -12,
      },
      {
        duration: 0.8,
        ease: 'bounce.out',
        right: -24,
        bottom: -14,
      }
    );
    gsap.fromTo(
      '#arrowSP',
      {
        bottom: -6,
      },
      {
        duration: 0.8,
        ease: 'bounce.out',
        bottom: -20,
      }
    );
  }, [isExist]);

  return (
    <Container size="xl" className={`${classes.main}`}>
      <div className={classes.inner}>
        <div className={`${classes.content} grid place-content-center`}>
          <div id="catchPhrase" className={classes.catchPhrase}>
            <div className={`${classes.highlight} ${classes.l}`}>あのキャラはこの冬</div>
            <div className={`${classes.highlight} ${classes.r}`}>どう過ごしているだろう</div>
            {isExist && (
              <>
                <Image id="arrowPC" src={arrow.src} className={`${classes.arrow} ${classes.pc}`} />
                <Image id="arrowSP" src={arrow.src} className={`${classes.arrow} ${classes.sp}`} />
              </>
            )}
          </div>
          <Group mt={80} visibleFrom="md">
            <Image className={classes.logo} src={logo.src} alt="Vコレのロゴ" />
          </Group>
        </div>
        {/*ランダムイラスト*/}
        <Card
          id="randomImage"
          className="rotate-3 !overflow-visible"
          ref={boxRef}
          component="a"
          bg="transparent"
          href={`/works/${illusts[randId].id}`}
        >
          <Image
            className={`${classes.image} ${isExist || 'opacity-0'} big-shadow`}
            src={`${isExist ? illusts[randId].illust : dummy.src}`}
            alt="Vコレのイラスト(ランダムで表示)"
          />
        </Card>

        {/*ロゴ2*/}
        <Group mt={48} hiddenFrom="md" justify="center">
          <Image className={classes.logo} src={logo.src} alt="Vコレのロゴ" />
        </Group>
      </div>
    </Container>
  );
}
aa
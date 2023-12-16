'use client';

import { useLayoutEffect, useRef } from 'react';
import { Image, Container, Group, Text} from '@mantine/core';
import { gsap } from 'gsap';
import image from '@/public/illustrations/202311221521.png';
import logo from '@/public/Logo.png';
import classes from './MainVisual.module.css';

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
  });

  return (
    <Container size="xl" className={`${classes.main} h-screen overflow-hidden`}>
      <div className={classes.inner}>
        <div className={`${classes.content} grid place-content-center`}>
          <div className={classes.title}>
            <div className={`${classes.highlight} ${classes.l}`}>
              あのキャラはこの冬
            </div>
            <div className={`${classes.highlight} ${classes.r}`}>
              どんな服で過ごしているだろう
            </div>
          </div>
          <Group mt={60} visibleFrom="sm">
            <Image
              className={classes.logo}
              src={logo.src}
              />
          </Group>
        </div>
        {/*メインイラスト*/}
        <div className={`${classes.wrap} rotate-3`} ref={boxRef}>
          <Image
            className={classes.image}
            src={image.src}
            />
        </div>
        
        {/*ロゴ2*/}
        <div>
          <Group mt={60} hiddenFrom="sm">
            <Image
              className={classes.logo}
              src={logo.src}
            />
          </Group>
        </div>
      </div>
    </Container>
  );
}

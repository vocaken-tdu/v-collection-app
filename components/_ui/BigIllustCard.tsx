'use client';

import React, { useEffect } from 'react';
import { Card, Image, Skeleton } from '@mantine/core';
// import gsap from 'gsap';
import { useIllust, setIllust } from '@/store/illustStore';
import classes from './BigIllustCard.module.css';

export function BigImageCard({ illustId }: { illustId: number }) {
  // イラストの状態を取得
  const illust = useIllust((state) => state.illust);

  // 取得済みかどうかを判定
  const isFetched = useIllust((state) => state.isFetched());

  // イラストを取得
  useEffect(() => {
    setIllust(illustId);
  }, []);

  /*
  useEffect(() => {
    gsap.fromTo(
      '#bigImage',
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.4,
        ease: 'sine.inOut',
      }
    );
  }, [isFetched]);
  */

  return (
    <>
      <Skeleton visible={!isFetched}>
        <Card className={`big-shadow ${classes.card}`} radius="md">
          <Image
            id="bigImage"
            className={`${classes.image}`}
            src={illust.illust}
            alt={illust.caption}
          />
        </Card>
      </Skeleton>
    </>
  );
}

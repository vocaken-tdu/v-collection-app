'use client';

import React, { useEffect } from 'react';
import { Card, Image, Skeleton } from '@mantine/core';
import gsap from 'gsap';
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

  return (
    <>
      <Skeleton visible={!isFetched}>
        <Card
          className={` ${classes.card} big-shadow ${isFetched && 'anim-fadeIn'}`}
          radius="md"
          id="bigImage"
        >
          <Image className={`${classes.image}`} src={illust.illust} alt={illust.caption} />
        </Card>
      </Skeleton>
    </>
  );
}

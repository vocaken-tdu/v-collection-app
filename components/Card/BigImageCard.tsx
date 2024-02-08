'use client';

import React, { useEffect } from 'react';
import { Card, Image, Skeleton } from '@mantine/core';
import { useIllust, setIllust } from '@/store/illustStore';
import classes from './BigImageCard.module.css';

export function BigImageCard({ illustId }: { illustId: number }) {
  // イラストを取得
  useEffect(() => {
    setIllust(illustId);
  }, []);

  // イラストの状態を取得
  const illust = useIllust((state) => state.illust);

  // 取得済みかどうかを判定
  const isFetched = useIllust((state) => state.isFetched());

  return (
    <>
      <Skeleton visible={!isFetched}>
        <Card className={`big-shadow ${classes.card}`} radius="md">
          <Image className={classes.image} src={illust.illust} alt={illust.caption} />
        </Card>
      </Skeleton>
    </>
  );
}

'use client';

import React, { useEffect } from 'react';
import { Card, Image, Skeleton } from '@mantine/core';
import { useIllust, setIllust } from '@/store/illustStore';
import classes from './BigImageCard.module.css';

export function BigImageCard({ illustId }: { illustId: number }) {
  useEffect(() => {
    setIllust(illustId);
  }, []);

  const illust = useIllust((state) => state.illust);
  const isFetched = useIllust((state) => state.isFetched);

  return (
    <>
      <Skeleton visible={!isFetched}>
        <Card shadow="lg" className={classes.card} radius="md">
          <Image
            className={classes.image}
            src={`${illust.illust}`}
          />
        </Card>
      </Skeleton>
    </>
  );
}

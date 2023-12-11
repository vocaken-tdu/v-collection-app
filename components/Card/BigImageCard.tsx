'use client';

import React, { useEffect } from 'react';
import { Card, Image, Skeleton } from '@mantine/core';
import { useIllust, setIllust } from '@/store/store';
import classes from './BigImageCard.module.css';

export function BigImageCard({ id }: { id: number }) {
  useEffect(() => {
    setIllust(id);
  }, []);

  const illust = useIllust((state) => state.illust);
  const isFetched = useIllust((state) => state.isFetched);

  return (
    <>
      <Skeleton visible={!isFetched}>
        <Card shadow="lg" className={classes.card} radius="md">
          <Image
            className={classes.image}
            src={`https://placehold.co/600x800?text=id%E2%86%92${illust.id}%0Adesc%E2%86%92${illust.description}`}
          />
        </Card>
      </Skeleton>
    </>
  );
}

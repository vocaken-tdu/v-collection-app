'use client';

import React, { useEffect } from 'react';
import { Card, Image } from '@mantine/core';
import { useIllust, setIllust } from '@/store/store';
import classes from './BigImageCard.module.css';

export function BigImageCard({ id }: { id: number }) {
  useEffect(() => {
    setIllust(id);
  }, []);

  const illust = useIllust((state) => state.illust);

  return (
    <>
      <Card shadow="lg" className={classes.card} radius="md">
        <Image
          className={classes.image}
          src={`https://placehold.co/600x800?text=id%E2%86%92${illust.id}%0Adesc%E2%86%92${illust.description}`}
        />
      </Card>
    </>
  );
}

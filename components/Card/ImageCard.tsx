'use client';

import React, { useEffect } from 'react';
import { Card, Text, Group } from '@mantine/core';
import { useIllustList, setIllustList } from '@/store/store';
import classes from './ImageCard.module.css';

export function ImageCard() {
  useEffect(() => {
    setIllustList();
  }, []);

  const illusts = useIllustList((state) => state.illustList);

  return (
    <>
      <div className={classes.cards}>
        {illusts.map((illust, i) => (
          <div key={i}>
            <Card
              p="lg"
              shadow="lg"
              className={classes.card}
              radius="md"
              component="a"
              href={`/works/${illust.id}`}
            >
              <div
                className={classes.image}
                style={{
                  backgroundImage: `url(https://placehold.co/600x800?text=id%E2%86%92${illust.id}%0Adesc%E2%86%92${illust.description})`,
                }}
              />
              <div className={classes.overlay} />
            </Card>

            <div className={`${classes.content} mt-2`}>
              <Group justify="space-between" gap="xs">
                <Text size="sm" className={classes.artist}>
                  {illust.title}
                </Text>
              </Group>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

'use client';

import React, { useEffect } from 'react';
import { Card, Text, Group } from '@mantine/core';
import { useBearStore, setIllust } from '../../store/store';
import classes from './ImageCard.module.css';

export function BigImageCard({ id }: { id: number }) {
  useEffect(() => {
    setIllust(id);
  }, []);

  const illust = useBearStore((state) => state.illust);

  return (
    <>
      <div className={classes.cards}>
        <Card
          p="lg"
          shadow="lg"
          className={classes.card}
          radius="md"
          component="a"
          href={`/illustrations/${id}`}
          target="_blank"
        >
          <div
            className={classes.image}
            style={{
              backgroundImage: `url(https://via.placeholder.com/1200x1600/?text=id%E2%86%92${illust.id}%0Adesc%E2%86%92${illust.description})`,
            }}
          />
          <div className={classes.overlay} />
        </Card>

        <div className={`${classes.content} mt-2`}>
          <Group justify="space-between" gap="xs">
            <Text size="sm" className={classes.artist}>
              {illust.title}
            </Text>

            <Text size="sm" className={classes.bodyText}>
              description
            </Text>
          </Group>
        </div>
      </div>
    </>
  );
}

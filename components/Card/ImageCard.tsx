'use client';

import React, { useEffect } from 'react';
import { Card, Text, Group, Skeleton } from '@mantine/core';
import { useIllustList, setIllustList } from '@/store/store';
import classes from './ImageCard.module.css';

export function ImageCard() {
  useEffect(() => {
    setIllustList();
  }, []);

  const illusts = useIllustList((state) => state.illustList);
  const isFetched = useIllustList((state) => state.isFetched);

  return (
    <>
      <div className={classes.cards}>
        {illusts.map((illust, i) => (
          <div key={i}>
            <Skeleton visible={!isFetched}>
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
                    backgroundImage: `url(${illust.illust})`,
                  }}
                />
                <div className={classes.overlay} />
              </Card>
            </Skeleton>

            <div className={`${classes.content} mt-2`}>
              <Group justify="space-between" gap="xs">
                <Skeleton visible={!isFetched}>
                  <Text size="sm" className={classes.artist}>
                    {illust.user_id}
                  </Text>
                </Skeleton>
              </Group>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

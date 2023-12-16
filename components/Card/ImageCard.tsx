'use client';

import React, { useEffect } from 'react';
import { Card, Text, Group, Skeleton } from '@mantine/core';
import { useIllustList, setIllustList } from '@/store/illustListStore';
import { GetUserName } from '../Tools/GetUserName';
import classes from './ImageCard.module.css';

export function ImageCard() {
  // イラスト(リスト)を取得
  useEffect(() => {
    setIllustList();
  }, []);

  // 状態を取得
  const illusts = useIllustList((state) => state.illustList);
  const isFetched = useIllustList((state) => state.isFetched);

  return (
    <>
      <div className={classes.cards}>
        {illusts.map((illust, i) => (
          <div key={i} className={classes.wrap}>
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
              <Skeleton visible={!isFetched} height={16} radius="xl">
                <Group justify="space-between" gap="xs">
                  <Text size="sm" className={classes.artist}>
                    <GetUserName userId={illust.user_id} />
                  </Text>
                </Group>
              </Skeleton>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

'use client';

import React, { useEffect } from 'react';
import { IconMessageCircle } from '@tabler/icons-react';
import { Card, Text, Group, Center, rem, useMantineTheme } from '@mantine/core';
import { useBearStore, setIllustList } from '@/store/store';
import classes from './ImageCard.module.css';

export function ImageCard() {
  const theme = useMantineTheme();

  useEffect(() => {
    setIllustList();
  }, []);

  const illusts = useBearStore((state) => state.illustList);

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

                <Center>
                  <IconMessageCircle
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                    color={theme.colors.dark[2]}
                  />
                  <Text size="sm" className={classes.bodyText}>
                    {illust.description}
                  </Text>
                </Center>
              </Group>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

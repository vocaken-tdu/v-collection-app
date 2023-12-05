'use client';

import { IconMessageCircle } from '@tabler/icons-react';
import { Card, Text, Group, Center, rem, useMantineTheme } from '@mantine/core';
import classes from './ImageCard.module.css';

// 仮置き
const illustInfo = [
  {
    id: 1,
    artist: 'Nyanya',
    src: '../../illustrations/202311221521.png',
    comment: 12,
  },
  {
    id: 2,
    artist: 'sigre-33',
    src: '../../illustrations/202311221724.png',
    comment: 3,
  },
  {
    id: 3,
    artist: 'spring-s',
    src: '../../illustrations/202311221725.png',
    comment: 122,
  },
  {
    id: 4,
    artist: 'Rinren',
    src: '../../illustrations/202311221730.png',
    comment: 1236,
  },
];

export function ImageCard() {
  const theme = useMantineTheme();

  return (
    <div className={classes.cards}>
      {illustInfo.map((illust) => (
        <div>
          <Card
            p="lg"
            shadow="lg"
            className={classes.card}
            radius="md"
            component="a"
            href="https://mantine.dev/"
            target="_blank"
          >
            <div
              className={classes.image}
              style={{
                backgroundImage:
                  `url(${illust.src})`,
              }}
            />
            <div className={classes.overlay} />
          </Card>

          <div className={`${classes.content} mt-2`}>
            <Group justify="space-between" gap="xs">
              <Text size="sm" className={classes.artist}>
                {illust.artist}
              </Text>

              <Center>
                <IconMessageCircle
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                  color={theme.colors.dark[2]}
                />
                <Text size="sm" className={classes.bodyText}>
                  {illust.comment}
                </Text>
              </Center>
            </Group>
          </div>
        </div>
      ))}
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { IconMessageCircle } from '@tabler/icons-react';
import { Card, Text, Group, Center, rem, useMantineTheme } from '@mantine/core';
import axios, { AxiosResponse } from 'axios';
import classes from './ImageCard.module.css';

const apiUrl = 'https://vcollection-background.onrender.com/illustrations';

type IllustInfo = {
  title: string;
  description: string;
  url: string;
  id: 0;
  created_at: string;
  comments: [
    {
      text: string;
      illustration_id: number;
      user_id: number;
      id: number;
    },
  ];
  likes: number;
};

export function ImageCard() {
  const theme = useMantineTheme();

  const [illusts, setIllusts] = useState<IllustInfo[]>([]);

  useEffect(() => {
    const fetchIllusts = async () => {
      const response: AxiosResponse<IllustInfo[]> = await axios.get(apiUrl);
      setIllusts(response.data);
      console.log(response.data);
    };
    fetchIllusts();
  }, []);

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
              href={`/illustrations/${illust.id}`}
              target="_blank"
            >
              <div
                className={classes.image}
                style={{
                  backgroundImage: `url(https://via.placeholder.com/600x800/?text=id%E2%86%92${illust.id}%0Adesc%E2%86%92${illust.description})`,
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

'use client';

import React, { useState, useEffect } from 'react';
import { Card, Text, Group } from '@mantine/core';
import axios, { AxiosResponse } from 'axios';
import classes from './ImageCard.module.css';

const apiUrl = 'https://vcollection-background.onrender.com/illustrations';

type IllustInfo = {
  title: 'string';
  description: 'string';
  url: 'string';
  id: 0;
  created_at: '2023-12-08T11:51:49.353Z';
  comments: [
    {
      text: 'string';
      illustration_id: 0;
      user_id: 0;
      id: 0;
    },
  ];
  likes: 0;
};

export function BigImageCard({ id }: { id: number }) {
  const illustUrl = `${apiUrl}/%7Billustration_id%7D?id=${id}`;

  const [illust, setIllust] = useState<IllustInfo>({
    // デフォルト値
    title: 'string',
    description: 'string',
    url: 'string',
    id: 0,
    created_at: '2023-12-08T11:51:49.353Z',
    comments: [
      {
        text: 'string',
        illustration_id: 0,
        user_id: 0,
        id: 0,
      },
    ],
    likes: 0,
  });

  useEffect(() => {
    const fetchIllust = async () => {
      const response: AxiosResponse<IllustInfo> = await axios.get(illustUrl);
      setIllust(response.data);
    };
    fetchIllust();
  }, []);

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

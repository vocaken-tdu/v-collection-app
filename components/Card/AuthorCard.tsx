import React, { useEffect } from 'react';
import { Text, Group, Paper } from '@mantine/core';
import { useIllust, setIllust } from '@/store/store';
import classes from './AuthorCard.module.css';

export function AuthorCard({ illustId }: { illustId: number }) {
  useEffect(() => {
    setIllust(illustId);
  }, []);

  const illust = useIllust((state) => state.illust);

  return (
    <Paper withBorder radius="md" className={classes.comment}>
      <Group>
        <Text fz="sm">{illust.title}</Text>
        <Text fz="xs" c="dimmed">
          {illust.created_at}
        </Text>
      </Group>
      <Text pt="sm" size="sm">
        {illust.caption}
      </Text>
    </Paper>
  );
}

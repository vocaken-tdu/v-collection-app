import React, { useEffect } from 'react';
import { Text, Group, Paper, Skeleton } from '@mantine/core';
import { useIllust, setIllust } from '@/store/illustStore';
import { GetUserName } from '../Tools/GetUserName';
import classes from './AuthorCard.module.css';

export function AuthorCard({ illustId }: { illustId: number }) {
  // イラストを取得
  useEffect(() => {
    setIllust(illustId);
  }, []);

  // イラストの状態を取得
  const illust = useIllust((state) => state.illust);

  // 取得済みかどうかを判定
  const isFetched = useIllust((state) => state.isFetched);

  return (
    <>
      <Skeleton visible={!isFetched}>
        <Paper withBorder radius="md" className={classes.comment}>
          <Group>
            <Text fz="sm">
              <GetUserName userId={illust.user_id} />
            </Text>
            <Text fz="xs" c="dimmed">
              {illust.created_at}
            </Text>
          </Group>
          <Text pt="sm" size="sm">
            {illust.caption}
          </Text>
        </Paper>
      </Skeleton>
    </>
  );
}

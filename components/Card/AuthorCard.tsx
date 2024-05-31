'use client';

import { Text, Group, Paper, Skeleton, Badge } from '@mantine/core';
import { useIllust } from '@/store/illustStore';
import { GetUserName } from '@/components/_tools/GetUserName';
import { GetTagName } from '@/components/_tools/GetTagName';
import { GetRelativeTime } from '@/components/_tools/GetRelativeTime';
import classes from './AuthorCard.module.css';

export function AuthorCard() {
  // イラストの状態を取得
  const illust = useIllust((state) => state.illust);

  // 取得済みかどうかを判定
  const isFetched = useIllust((state) => state.isFetched());

  return (
    <>
      <Skeleton visible={!isFetched}>
        <Paper radius="md" className={`light-shadow ${classes.comment}`}>
          <Group gap="xs">
            <Badge variant="light" color="blue" size="sm">
              シーズン
            </Badge>
            <Text fz="lg" fw="bold" c="#333">
              <GetTagName tagId={illust.tags[0]} />
            </Text>
            <Text c="dimmed" size="xs" tt="uppercase" fw="bold" fz="xs">
              <GetRelativeTime RawTime={illust.created_at} format="day" />
            </Text>
          </Group>
          <Group mt={4} gap="xs">
            <Badge variant="light" color="blue" size="sm">
              アーティスト
            </Badge>
            <Text fz="lg" fw="bold" c="#333">
              <GetUserName userId={illust.user_id} />
            </Text>
          </Group>
          <Text pt={8} size="sm">
            {illust.caption}
          </Text>
        </Paper>
      </Skeleton>
    </>
  );
}

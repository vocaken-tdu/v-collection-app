import { Text, Group, Paper, Skeleton } from '@mantine/core';
import { useIllust } from '@/store/illustStore';
import { GetUserName } from '../Tools/GetUserName';
import { GetRelativeTime } from '../Tools/GetRelativeTime';
import classes from './AuthorCard.module.css';

export function AuthorCard() {
  // イラストの状態を取得
  const illust = useIllust((state) => state.illust);

  // 取得済みかどうかを判定
  const isFetched = useIllust((state) => state.isFetched());

  return (
    <>
      <Skeleton height={102} visible={!isFetched}>
        <Paper withBorder radius="md" className={classes.comment}>
          <Group>
            <Text fz="lg">
              <GetUserName userId={illust.user_id} />
            </Text>
            <Text fz="xs" c="dimmed" mt={3}>
              <GetRelativeTime RawTime={illust.created_at} />
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

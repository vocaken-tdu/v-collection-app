import { Text, Group, Badge, Box } from '@mantine/core';
import { getIllustById, getTagName, getUserName } from '@/utils/data';
import { getRelativeTime } from '@/utils/date';
import classes from './IllustInfo.module.css';

export function IllustInfo({ illustId }: { illustId: number }) {
  // イラストの状態を取得
  const illust = getIllustById(illustId);

  return (
    <Box pos="relative">
      <div className={classes.comment}>
        <Group gap="xs">
          <Badge variant="light" color="themeColor" size="sm">
            シーズン
          </Badge>
          <Text fz="lg" fw="bold" c="#333">
            {getTagName(illust?.tags[0])}
          </Text>
          <Text c="dimmed" size="xs" tt="uppercase" fw="bold" fz="xs">
            {getRelativeTime(illust?.created_at, 'day')}
          </Text>
        </Group>
        <Group mt={4} gap="xs">
          <Badge variant="light" color="themeColor" size="sm">
            アーティスト
          </Badge>
          <Text fz="lg" fw="bold" c="#333">
            {getUserName(illust?.user_id)}
          </Text>
        </Group>
        <Text pt={8} size="sm">
          {illust?.caption || '(作者コメントはありません)'}
        </Text>
      </div>
    </Box>
  );
}

import { Text, Group, Badge, Box } from '@mantine/core';
import { getRelativeTime } from '@/utils/date';
import { Illustration } from '@/types/database.types';
import classes from './IllustInfo.module.css';

export async function IllustInfo({ illust }: { illust: Illustration }) {
  return (
    <Box pos="relative">
      <div className={classes.comment}>
        <Group gap="xs">
          <Badge variant="light" color="themeColor" size="sm">
            シーズン
          </Badge>
          <Text fz="lg" fw="bold" c="#333">
            {illust?.category.name}
          </Text>
          <Text c="dimmed" size="xs" tt="uppercase" fw="bold" fz="xs">
            {getRelativeTime(illust?.publishedAt, 'day')}
          </Text>
        </Group>
        <Group mt={4} gap="xs">
          <Badge variant="light" color="themeColor" size="sm">
            アーティスト
          </Badge>
          <Text fz="lg" fw="bold" c="#333">
            {illust?.user_name}
          </Text>
        </Group>
        <Text pt={8} size="sm">
          {illust?.caption || '(作者コメントはありません)'}
        </Text>
      </div>
    </Box>
  );
}

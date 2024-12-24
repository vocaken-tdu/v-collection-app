import { Text, Paper, Group, Button } from '@mantine/core';
import { IconHeartFilled } from '@tabler/icons-react';
import { getRelativeTime } from '@/utils/date';
import classes from './CommentCard.module.css';

/*
  コメントカード
  ・コメントの内容 / ユーザー名 / 投稿日時 / いいねボタンと数 を表示
  ・いいねの状態をローカルに保存 / クールダウンあり
*/

export function CommentCard({ comment, i }: { comment: any; i: number }) {
  return (
    <Paper
      px="xl"
      py="lg"
      radius="md"
      className={`${classes.wrap} light-shadow anim-fadeLeft`}
      style={{ animationDelay: `${i * 50}ms` }}
    >
      {/* コメントの内容 */}
      <Text size="sm">{comment.text}</Text>
      <div className={classes.info}>
        <Group>
          {/* ユーザー名 */}
          <Text pt="sm" fz="sm">
            {comment.user_name}
          </Text>
          {/* 投稿日時 */}
          <Text pt="sm" fz="xs" c="dimmed" mt={1}>
            {getRelativeTime(comment.created_at)}
          </Text>
        </Group>
        {/* いいねボタン */}
        <Button variant="light" color="pink" radius="xl" className={classes.button}>
          <IconHeartFilled />
          {/* いいねの数 */}
          {comment.like}
        </Button>
      </div>
    </Paper>
  );
}

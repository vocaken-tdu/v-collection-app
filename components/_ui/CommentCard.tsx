import { Text, Paper, Group } from '@mantine/core';
import { getRelativeTime } from '@/utils/date';
import { Comment } from '@/types/database.types';
import classes from './CommentCard.module.css';
import { LikeButton } from './LikeButton';

/*
  コメントカード
  ・コメントの内容 / ユーザー名 / 投稿日時 / いいねボタンと数 を表示
  ・いいねの状態をローカルに保存 / クールダウンあり
*/

export function CommentCard({ comment, i }: { comment: Comment; i: number }) {
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
            {getRelativeTime(comment.publishedAt)}
          </Text>
        </Group>
        {/* いいね */}
        <LikeButton comment={comment} />
      </div>
    </Paper>
  );
}

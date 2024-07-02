import { useState } from 'react';
import { Text, Paper, Group, Button } from '@mantine/core';
import { IconHeartFilled, IconHeart } from '@tabler/icons-react';
import { useLike, setLike } from '@/store/likeStore';
import { NotifyLikeCooldown } from '@/components/_tools/Notifications';
import { GetRelativeTime } from '@/components/_tools/GetRelativeTime';
import classes from './CommentCard.module.css';

/*
  コメントカード
  ・コメントの内容 / ユーザー名 / 投稿日時 / いいねボタンと数 を表示
  ・いいねの状態をローカルに保存 / クールダウンあり
*/

export function CommentCard({ comment, i }: { comment: any; i: number }) {
  // 処理中かどうかを記録
  const [isProcess, setProcess] = useState(false);

  // いいねの状態を取得
  const likeList = useLike((state) => state.commentId);

  // いいねの状態を切り替える(クールダウンあり)
  const switchLike = (commentId: number) => () => {
    // 処理中は無視
    if (isProcess) {
      // いいね押しすぎの警告を表示
      NotifyLikeCooldown();
      return console.log('process is running...');
    }

    // 処理中にする
    setProcess(true);
    // いいねされているかどうかで分岐
    setLike(commentId);

    // 処理中を解除
    setTimeout(() => {
      setProcess(false);
    }, 2000);

    return console.log('switch like!');
  };

  // いいねされているかどうかの判定
  const isLiked = (id: number) => likeList.includes(id);

  return (
    <Paper
      px="xl"
      py="lg"
      radius="md"
      key={i}
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
            <GetRelativeTime RawTime={comment.created_at} />
          </Text>
        </Group>
        {/* いいねボタン */}
        <Button
          variant="light"
          color="pink"
          radius="xl"
          onClick={switchLike(comment.id)}
          className={classes.button}
        >
          {/* いいねの状態によってアイコンを変更 */}
          {isLiked(comment.id) ? <IconHeartFilled /> : <IconHeart />}
          {/* いいねの数 */}
          {comment.like}
        </Button>
      </div>
    </Paper>
  );
}

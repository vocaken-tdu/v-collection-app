import { Button, Text, Group, Paper } from '@mantine/core';
import { IconHeartFilled, IconHeart } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useCommentList, setCommentList } from '@/store/commentListStore';
import { useLike, setLike } from '@/store/likeStore';
import { GetUserName } from '../Tools/GetUserName';
import { GetRelativeTime } from '../Tools/GetRelativeTime';
import classes from './CommentCard.module.css';

// イラストのidを受け取って、そのイラストのコメントを表示する
export function CommentCard({ illustId }: { illustId: number }) {
  // コメントを取得
  useEffect(() => {
    setCommentList();
  }, []);

  // コメントの状態を取得
  const rawComments = useCommentList((state) => state.commentList);
  // 一致するイラストのコメントのみを抽出 (illustIdがstringになるバグで念のためNumber済み)
  const comments = rawComments.filter((c) => Number(c.illust_id) === Number(illustId));

  // いいねの状態を取得
  const likeList = useLike((state) => state.commentId);
  // いいねの状態を切り替える
  const switchLike = (commentId: number) => () => {
    setLike(commentId);
  };

  // いいねされているかどうかの判定
  const isLiked = (id: number) => likeList.includes(id);

  return (
    <>
      {comments.map((comment, i) => (
        <div key={i}>
          <Paper withBorder radius="md" className={classes.comment}>
            <Text size="sm">{comment.text}</Text>
            <div className="flex justify-between">
              <Group>
                <Text pt="sm" fz="sm">
                  <GetUserName userId={comment.user_id} />
                </Text>
                <Text pt="sm" fz="xs" c="dimmed">
                  <GetRelativeTime RawTime={comment.created_at} />
                </Text>
              </Group>
              <Button variant="light" color="pink" radius="xl" onClick={switchLike(comment.id)}>
                {isLiked(comment.id) ? <IconHeartFilled /> : <IconHeart />}
                {comment.like + Number(isLiked(comment.id))}
              </Button>
            </div>
          </Paper>
        </div>
      ))}
    </>
  );
}

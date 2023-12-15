import { Button, Text, Group, Paper } from '@mantine/core';
import { IconHeartFilled, IconHeart } from '@tabler/icons-react';
import { useState, useCallback, useEffect } from 'react';
import { useEventListener } from '@mantine/hooks';
import { useCommentList, setCommentList } from '@/store/commentListStore';
import { setLike } from '@/store/likeStore';
import classes from './CommentCard.module.css';

// イラストのidを受け取って、そのイラストのコメントを表示する
export function CommentCard({ illustId }: { illustId: number }) {
  useEffect(() => {
    setCommentList();
  }, []);

  const comments = useCommentList((state) => state.commentList);

  // いいねの状態を管理する (ローカル)
  const [localLike, setLocalLike] = useState(false);
  const localLikeState = useCallback(() => setLocalLike((c) => !c), []);
  const ref = useEventListener('click', localLikeState);

  // いいねを押した時の処理 (サーバー)
  const switchLike = (commentId: number) => () => {
    setLike(commentId);
  };

  // いいねの状態でボタンの表示を変える
  const likeButton = () => {
    if (localLike) {
      return <IconHeartFilled />;
    }
    return <IconHeart />;
  };

  return (
    <>
      {comments.map((comment, i) => (
        <div key={i}>
          <Paper withBorder radius="md" className={classes.comment}>
            <Text size="sm">{comment.text}</Text>
            <div className="flex justify-between">
              <Group>
                <Text pt="sm" fz="sm">
                  {comment.user_id}
                </Text>
                <Text pt="sm" fz="xs" c="dimmed">
                  created_at ※今は全件取得しています
                </Text>
              </Group>
              <Button
                variant="light"
                color="pink"
                radius="xl"
                onClick={switchLike(comment.id)}
                ref={ref}
              >
                {likeButton()}
                {comment.like + Number(localLike)}
              </Button>
            </div>
          </Paper>
        </div>
      ))}
    </>
  );
}

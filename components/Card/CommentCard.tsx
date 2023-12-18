import { Button, Text, Group, Paper, SimpleGrid, ScrollArea } from '@mantine/core';
import { IconHeartFilled, IconHeart } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useCommentList, setCommentList } from '@/store/commentListStore';
import { useLike, setLike } from '@/store/likeStore';
import { GetRelativeTime } from '../Tools/GetRelativeTime';
import classes from './CommentCard.module.css';

// イラストのidを受け取って、そのイラストのコメントを表示する
export function CommentCard({ illustId }: { illustId: number }) {
  // 処理中かどうかを記録
  const [isProcess, setProcess] = useState(false);

  // コメントを取得
  useEffect(() => {
    setCommentList();
  }, []);

  // コメントの状態を取得
  const rawComments = useCommentList((state) => state.commentList);
  // 一致するイラストのコメントのみを抽出 (illustIdがstringになるバグで念のためNumber済み)
  const comments = rawComments.filter((c) => Number(c.illust_id) === Number(illustId));
  const sortedComments = comments.sort((a, b) => b.like - a.like);

  // いいねの状態を取得
  const likeList = useLike((state) => state.commentId);

  // いいねの状態を切り替える(クールダウンあり)
  const switchLike = (commentId: number) => () => {
    // 処理中は無視
    if (isProcess) return console.log('process is running...');

    // 処理中にする
    setProcess(true);
    // いいねされているかどうかで分岐
    setLike(commentId);

    // 処理中を解除
    setTimeout(() => {
      setProcess(false);
    }, 1000);

    return console.log('switch like!');
  };

  // いいねされているかどうかの判定
  const isLiked = (id: number) => likeList.includes(id);

  return (
    <ScrollArea className={classes.scrollArea}>
      <SimpleGrid cols={1} spacing="md" className={`${classes.r}`}>
        <h2 className="text-xl text-center mt-5 mb-1">
          {comments.length ? 'このコメントがアツい！' : '↓でコメントしてみよう！'}
        </h2>
        {sortedComments.map((comment, i) => (
          <div key={i}>
            <Paper withBorder px="xl" py="lg" radius="md">
              <Text size="sm">{comment.text}</Text>
              <div className="flex justify-between">
                <Group>
                  <Text pt="sm" fz="sm">
                    {comment.user_name}
                  </Text>
                  <Text pt="sm" fz="xs" c="dimmed">
                    <GetRelativeTime RawTime={comment.created_at} />
                  </Text>
                </Group>
                <Button
                  variant="light"
                  color="pink"
                  radius="xl"
                  onClick={switchLike(comment.id)}
                  className={classes.button}
                >
                  {isLiked(comment.id) ? <IconHeartFilled /> : <IconHeart />}
                  {comment.like}
                </Button>
              </div>
            </Paper>
          </div>
        ))}
      </SimpleGrid>
    </ScrollArea>
  );
}

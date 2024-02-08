'use client';

import { Button, Text, Group, Paper, SimpleGrid, ScrollArea } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconHeartFilled, IconHeart } from '@tabler/icons-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useState } from 'react';
import { useCommentList, setCommentList } from '@/store/commentListStore';
import { useLike, setLike } from '@/store/likeStore';
import { GetRelativeTime } from '../Tools/GetRelativeTime';
import classes from './CommentCard.module.css';

gsap.registerPlugin(ScrollTrigger);

// イラストのidを受け取って、そのイラストのコメントを表示する
export function CommentCard({
  illustId,
  isFormVisible,
  height,
}: {
  illustId: number;
  isFormVisible: boolean;
  height: number;
}) {
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

  // 通知を表示する
  const caution = () => {
    notifications.show({
      color: 'pink',
      radius: 'md',
      title: 'いいねクールダウン中',
      message: '押し過ぎはダメなのだ！ 絶対なのだ！',
    });
    setTimeout(() => {
      notifications.show({
        color: 'green',
        radius: 'md',
        title: 'ずんだもんからのお願い',
        message: '落ち着いて押すのだ……。',
      });
    }, 750);
  };

  // いいねの状態を切り替える(クールダウンあり)
  const switchLike = (commentId: number) => () => {
    // 処理中は無視
    if (isProcess) {
      // 注意を表示
      caution();
      return console.log('process is running...');
    }

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

  // コメントが取得し終わったらGSAP実行
  useEffect(() => {
    // GSAPでコメントを右からスライドインさせる
    if (document.getElementById('comment')) {
      gsap.fromTo(
        '#comment',
        {
          x: 48,
          opacity: 0,
        },
        {
          duration: 0.5,
          x: 0,
          opacity: 1,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#comments',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, [rawComments]);

  return (
    <ScrollArea className={classes.scrollArea} h={height}>
      <SimpleGrid cols={1} spacing="md" className={classes.r}>
        <h2 className="text-xl text-center mt-5 mb-1" id="comments">
          {/* コメントがないとき and フォームが表示されている場合に コメントを促す */}
          {!comments.length && isFormVisible ? '↓でコメントしてみよう！' : 'このコメントがアツい！'}
        </h2>
        {sortedComments.map((comment, i) => (
          <div key={i}>
            <Paper
              px="xl"
              py="lg"
              radius="md"
              id="comment"
              className={`${classes.comment} light-shadow`}
            >
              <Text size="sm">{comment.text}</Text>
              <div className="flex justify-between">
                <Group>
                  <Text pt="sm" fz="sm">
                    {comment.user_name}
                  </Text>
                  <Text pt="sm" fz="xs" c="dimmed" mt={1}>
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

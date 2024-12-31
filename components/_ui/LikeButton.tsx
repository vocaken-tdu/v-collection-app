'use client';

import { useState } from 'react';
import { Button } from '@mantine/core';
import { IconHeartFilled, IconHeart } from '@tabler/icons-react';
import { useLike, setLike } from '@/store/likeStore';
import { Comment } from '@/types/database.types';
import classes from './LikeButton.module.css';

import { NotifyLikeCooldown } from '@/components/_ui/Notifications';

export function LikeButton({ comment }: { comment: Comment }) {
  // 処理中かどうかを記録
  const [isProcess, setProcess] = useState(false);

  // いいねの状態を取得
  const likeList = useLike((state) => state.commentId);

  // いいねの状態を切り替える(クールダウンあり)
  const switchLike = (commentId: string) => () => {
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
  const isLiked = (id: string) => likeList.includes(id);

  return (
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
  );
}

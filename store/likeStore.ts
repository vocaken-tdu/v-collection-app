'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { updateLike } from '@/app/actions';
import { NotifyAlreadyLiked } from '@/components/_ui/Notifications';

// -------- いいねを押したかどうかを記録する

type MyLikeState = {
  commentId: string[];
};

export const useLike = create<MyLikeState>()(
  persist(
    () => ({
      commentId: [''],
    }),
    {
      name: 'likeStore',
    }
  )
);

export const setLike = async (comment_id: string) => {
  const like = async () => {
    // いいね数を更新(+1)
    const response = await updateLike(comment_id);
    if (!response) return console.log('Failed to update like count');

    // いいねしたコメントのidをローカルで記録
    useLike.setState((state) => ({
      commentId: [...state.commentId, comment_id],
    }));

    return console.log('liked!', response);
  };

  // いいねの状態によって、いいねをするかどうかを切り替える
  const likeState = useLike.getState().commentId;
  likeState.includes(comment_id) ? NotifyAlreadyLiked() : like();
};

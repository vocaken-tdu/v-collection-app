import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios, { AxiosResponse } from 'axios';

const apiUrl = 'https://django-render-vam9.onrender.com';

// -------- いいねを押したかどうかを記録する

type likeState = {
  commentId: number[];
};

export const useLike = create<likeState>()(
  // 永続化オプション
  persist(
    () => ({
      commentId: [0, 1, 2],
    }),
    {
      name: 'likeStore',
    }
  )
);

export const setLike = async (comment_id: number) => {
  const like = async () => {
    useLike.setState((state) => ({
      commentId: [...state.commentId, comment_id],
    }));
    console.log('liked!');
  };
  const unlike = async () => {
    useLike.setState((state) => ({
      commentId: state.commentId.filter((id) => id !== comment_id),
    }));
    console.log('unliked!');
  };

  const likeState = useLike.getState().commentId;
  likeState.includes(comment_id) ? unlike() : like();
  console.log(comment_id, useLike.getState().commentId);
};

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

// -------- コメントを取得する

type commentState = {
  comment: {
    id: number;
    text: string;
    user_id: number;
    like: number;
    illust_id: number;
    created_at: string;
    updated_at: string;
  },
};

export const useComment = create<commentState>()(() => ({
  comment: {
    id: 0,
    text: '',
    user_id: 0,
    like: 0,
    illust_id: 0,
    created_at: '',
    updated_at: '',
  },
}));

export const setLike = async (comment_id: number) => {
  const like = async () => {
    // コメントを取得
    const response: AxiosResponse = await axios.get(`${apiUrl}/comments/${comment_id}/`);
    useComment.setState({ comment: response.data });

    // いいね数を更新(+1)
    useComment.setState((state) => ({
      comment: { ...state.comment, like: state.comment.like + 1 },
    }));

    // PUTで更新
    const putResponse: AxiosResponse = await axios.put(`${apiUrl}/comments/${comment_id}/`, useComment.getState().comment);

    console.log('commentData is fetched!', putResponse.data, useComment.getState());

    // いいね数を更新


    // いいねしたコメントのidをローカルで記録
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

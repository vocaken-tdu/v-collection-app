import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios, { AxiosResponse } from 'axios';
import { updateCommentList } from '@/store/commentListStore';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// -------- いいねを押したかどうかを記録する

type likeState = {
  commentId: number[];
};

export const useLike = create<likeState>()(
  // 永続化オプション
  persist(
    () => ({
      commentId: [0],
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
  };
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
    console.log('commentData is fetched!');

    // いいね数を更新(+1)
    useComment.setState((state) => ({
      comment: { ...state.comment, like: state.comment.like + 1 },
    }));

    // いいねしたコメントのidをローカルで記録
    useLike.setState((state) => ({
      commentId: [...state.commentId, comment_id],
    }));

    // PUTでいいね数を更新
    await axios.put(`${apiUrl}/comments/${comment_id}/`, useComment.getState().comment);
    console.log('like update!');

    console.log('liked!');
  };

  const unlike = async () => {
    // コメントを取得
    const response: AxiosResponse = await axios.get(`${apiUrl}/comments/${comment_id}/`);
    useComment.setState({ comment: response.data });
    console.log('commentData is fetched!');

    // いいね数を更新(-1)
    useComment.setState((state) => ({
      comment: { ...state.comment, like: state.comment.like - 1 },
    }));

    // いいねしたコメントのidをローカルで記録
    useLike.setState((state) => ({
      commentId: state.commentId.filter((id) => id !== comment_id),
    }));

    // PUTでいいね数を更新
    await axios.put(`${apiUrl}/comments/${comment_id}/`, useComment.getState().comment);
    console.log('unliked update!');

    console.log('unliked!');
  };

  const likeState = useLike.getState().commentId;

  // いいねの状態によって、いいねをするかどうかを切り替える
  likeState.includes(comment_id) ? unlike() : like();

  // コメントを更新
  updateCommentList();

  console.log(comment_id, useLike.getState().commentId);
};

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
      commentId: [0],
    }),
    {
      name: 'likeStore',
    }
  )
);

export const setLike = async (comment_id: number) => {
  const like = async () => {
    const response: AxiosResponse = await axios.post(`${apiUrl}/comments/${comment_id}/like`);
    // いいねを押したコメントのidを追加する
    useLike.setState({ commentId: [...useLike.getState().commentId, comment_id] });
    console.log(response.data, 'liked!');
  };
  const unlike = async () => {
    const response: AxiosResponse = await axios.post(`${apiUrl}/comments/${comment_id}/like`);
    // いいねを押したコメントのidを削除する
    useLike.setState({
      commentId: useLike.getState().commentId.filter((id) => id !== comment_id),
    });
    console.log(response.data, 'unliked!');
  };
  const likeState = useLike.getState().commentId;
  likeState.includes(comment_id) ? like() : unlike();
  console.log(comment_id, useLike.getState().commentId);
};

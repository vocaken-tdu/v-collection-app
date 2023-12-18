import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const apiUrl = 'https://django-render-vam9.onrender.com';

// -------- コメントの状態管理

type commentState = {
  userName: string;
  comment: string;
};

export const useComment = create<commentState>()(
  // 永続化オプション
  persist(
    () => ({
      userName: '',
      comment: '',
    }),
    {
      name: 'commentStore',
    }
  )
);

/* コメントを保存する (未実装)
export const saveComment = async (comment: string, userName: string) => {
  useComment.setState({
    userName,
    comment,
  });
};

コメントを復元する
export const restoreComment = async () => {
  useComment.getState();
};
*/

// コメントを送信する
export const setComment = async (illust_id: number, name: string, comment: string) => {
  const postComment = async (id: number) => {
    const res = await axios.post(`${apiUrl}/comments/`, {
      text: comment,
      user_name: name,
      illust_id: id,
    });
    console.log('Comment sent!', res);
  };

  postComment(illust_id);

  // ローカルデータを削除
  useComment.setState({
    userName: '',
    comment: '',
  });
};

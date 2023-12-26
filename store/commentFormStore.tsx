import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { updateCommentList } from '@/store/commentListStore';

const apiUrl = 'https://django-render-vam9.onrender.com';

// -------- 未送信コメントをローカルに保存する (送信できなかった場合に備える)

type commentState = {
  comment: string;
};

export const useComment = create<commentState>()(
  // 永続化オプション
  persist(
    () => ({
      comment: '',
    }),
    {
      name: 'commentStore',
    }
  )
);

// コメントを送信する
export const setComment = async (illust_id: number, name: string, comment: string) => {
  // コメントを送信する
  const postComment = async (id: number) => {
    // ローカルデータを更新
    useComment.setState({
      comment,
    });

    // コメントを送信
    const res = await axios.post(`${apiUrl}/comments/`, {
      text: comment,
      user_name: name,
      illust_id: id,
    });

    // 送信が完了したら以下の処理を実行

    console.log('Comment sent!', res);

    // ローカルデータを削除
    useComment.setState({
      comment: '',
    });

    // コメント一覧を更新
    updateCommentList();
  };

  postComment(illust_id);
};

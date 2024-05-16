import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { Sending, Sent, SendFailed, RemainComment } from './StoreNotification';
import { updateCommentList } from '@/store/commentListStore';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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

// コメントが残っていたらメッセージを表示
if (useComment.getState().comment.length > 0) {
  RemainComment();
}

// コメントを送信する
export const setComment = async (illust_id: number, name: string, comment: string) => {
  // 送信中の通知を表示
  const sending = () => {
    Sending(name, comment);
  };

  // 送信完了の通知を表示
  const sent = () => {
    Sent(comment);
  };

  // 送信失敗の通知を表示
  const sendFailed = () => {
    SendFailed();
  };

  // コメントを送信する
  const postComment = async (id: number) => {
    // ローカルデータを更新
    useComment.setState({
      comment,
    });

    // 送信中の通知を表示
    sending();

    try {
      // コメントを送信
      const res = await axios.post(`${apiUrl}/comments/`, {
        text: comment,
        user_name: name,
        illust_id: id,
      });

      // 送信が完了したら以下の処理を実行

      // 通知を更新
      sent();
      console.log('Comment sent!', res);

      // ローカルデータを削除
      useComment.setState({
        comment: '',
      });

      // コメント一覧を更新
      updateCommentList();
    } catch (e) {
      // 送信に失敗したときのエラー通知を表示
      sendFailed();
    }
  };

  postComment(illust_id);
};

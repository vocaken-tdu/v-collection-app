import { rem } from '@mantine/core';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
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
  notifications.show({
    color: 'yellow',
    radius: 'md',
    title: '未送信かも……？',
    message: '送信できなかったかもしれないコメントを復元しました。送れていなかったら再度送信してみてください。',
  });
}

// コメントを送信する
export const setComment = async (illust_id: number, name: string, comment: string) => {
  // 送信中の通知を表示
  const sending = () => {
    notifications.show({
      id: 'sending',
      loading: true,
      autoClose: false,
      radius: 'md',
      title: `${name}さんのコメントを送信中……`,
      message: comment,
    });
  };

  // 送信完了の通知を表示
  const sent = () => {
    notifications.update({
      id: 'sending',
      color: 'teal',
      title: '送信しました！',
      message: comment,
      icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      loading: false,
      autoClose: 2000,
    });
  };

  // コメントを送信する
  const postComment = async (id: number) => {
    // ローカルデータを更新
    useComment.setState({
      comment,
    });

    // 送信中の通知を表示
    sending();

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
  };

  postComment(illust_id);
};

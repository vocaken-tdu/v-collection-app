import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NotifyRemainComment } from '@/components/_ui/Notifications';

// -------- 未送信コメントをローカルに保存する (送信できなかった場合に備える)

type CommentState = {
  comment: string;
};

export const useMyComment = create<CommentState>()(
  // 永続化オプション
  persist(
    () => ({
      comment: '',
    }),
    {
      name: 'myCommentStore',
    }
  )
);

// コメントが残っていたらメッセージを表示
if (useMyComment.getState().comment.length > 0) {
  NotifyRemainComment();
}

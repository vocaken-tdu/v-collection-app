'use client';

import { SimpleGrid } from '@mantine/core';
import { useEffect } from 'react';
import { useCommentList, setCommentList } from '@/store/commentListStore';
import { CommentCard } from '@/components/_ui/CommentCard';

// イラストのidを受け取って、そのイラストのコメントを表示する
export function Comments({
  illustId,
  isFormVisible,
}: {
  illustId: number;
  isFormVisible: boolean;
}) {
  // コメントを取得
  useEffect(() => {
    setCommentList();
  }, []);

  // コメントの状態を取得
  const rawComments = useCommentList((state) => state.commentList);
  // 一致するイラストのコメントのみを抽出 (illustIdがstringになるバグで念のためNumber済み)
  const comments = rawComments.filter((c) => Number(c.illust_id) === Number(illustId));
  const sortedComments = comments.sort((a, b) => b.like - a.like);

  return (
    <SimpleGrid cols={1} spacing="md">
      <h2 className="text-xl text-center mt-5 mb-1" id="comments">
        {/* コメントがないとき and フォームが表示されている場合に コメントを促す */}
        {!comments.length && isFormVisible ? '↓でコメントしてみよう！' : 'このコメントがアツい！'}
      </h2>
      {sortedComments.map((comment, i) => (
        <CommentCard comment={comment} i={i} />
      ))}
    </SimpleGrid>
  );
}

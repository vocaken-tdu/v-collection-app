'use client';

import React, { useEffect } from 'react';
import { useCommentList, setCommentList } from '@/store/commentListStore';

export function GetCommentNum({ illustId }: { illustId: number }) {
  // ユーザー名(リスト)を取得
  useEffect(() => {
    setCommentList();
  }, []);

  // リストの状態を取得
  const userList = useCommentList((state) => state.commentList);

  // イラストのidが一致するコメントのみを抽出
  const comments = userList.filter((comment) => comment.illust_id === illustId);

  // コメントの数を取得
  const commentNum = comments.length;

  return <>{commentNum}</>;
}

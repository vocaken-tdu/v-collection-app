'use client';

import React, { useEffect } from 'react';
import { useTags, setTags } from '@/store/tagsStore';

export function GetTagName({ tagId }: { tagId: number }) {
  // ユーザー名(リスト)を取得
  useEffect(() => {
    setTags();
  }, []);

  // リストの状態を取得
  const tagList = useTags((state) => state.tags);

  // ユーザー名を取得
  const tagName = tagList.find((tag) => tag.id === tagId)?.name;

  return <>{tagName}</>;
}

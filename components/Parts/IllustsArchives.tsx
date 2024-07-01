'use client';

import React, { useEffect } from 'react';
import useStore from '@/store/useStore';
import { useIllustList, setIllustList } from '@/store/illustListStore';
import { IllustCard } from '@/components/_ui/IllustCard';
import { useTags, setTags } from '@/store/tagsStore';
import classes from './Illusts.module.css';

// アーカイブのシーズンID
const archiveSeasonId = Number(process.env.NEXT_PUBLIC_ARCHIVE_SEASON_ID);

export function IllustsArchives() {
  // イラスト(リスト)の状態を取得
  const illusts = useStore(useIllustList, (state) => state.illustList);

  // タグの状態を取得
  const tags = useStore(useTags, (state) => state.tags);

  // アーカイブするシーズンID以下のタグを取得
  const filteredTags = tags?.filter((tag) => tag.id <= archiveSeasonId);

  // イラスト(リスト)を取得
  useEffect(() => {
    setIllustList();
    setTags();
  }, []);

  return (
    <>
      <h3 className={classes.header}>― 2024冬 ―</h3>
      <div className={classes.cards} id="cards">
        {/* イラストを一覧表示 */}
        {filteredTags?.map(
          (tag, tagKey) =>
            illusts
              ?.filter((illust) => illust.tags.includes(tag.id))
              .map((illust, i) => <IllustCard illust={illust} i={tagKey + i} />)
        )}
      </div>
    </>
  );
}

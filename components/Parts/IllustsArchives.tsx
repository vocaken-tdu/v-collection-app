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
  const archiveIllusts = tags?.filter((tag) => tag.id <= archiveSeasonId);

  // 2024冬より新しいもののうちアーカイブされているものを取得
  const filteredIllusts = archiveIllusts?.filter((tag) => tag.id > 3);

  // 2024冬のイラストを取得 (グループ化)
  const filteredIllusts2024Winter = archiveIllusts?.filter((tag) => tag.id >= 1 && tag.id <= 3);

  // イラスト(リスト)を取得
  useEffect(() => {
    setIllustList();
    setTags();
  }, []);

  return (
    <>
      {/* タグを表示 (キーは兄弟間で一意である必要があるため100から開始している) */}
      {filteredIllusts?.map((tag, tagKey) => (
        <div key={tagKey + 100}>
          <h3 className={classes.header}>{tag.name ? `― ${tag.name} ―` : 'Now Loading...'}</h3>
          <div className={classes.cards} id="cards">
            {/* イラストをタグごとに表示 */}
            {illusts
              ?.filter((illust) => illust.tags.includes(tag.id))
              .map((illust, i) => <IllustCard illust={illust} i={i} />)}
          </div>
        </div>
      ))}
      {/* 2024冬のイラストをグループ化して表示 */}
      <h3 className={classes.header}>― 2024冬 ―</h3>
      <div className={classes.cards} id="cards">
        {/* イラストを一覧表示 */}
        {filteredIllusts2024Winter?.map(
          (tag, tagKey) =>
            illusts
              ?.filter((illust) => illust.tags.includes(tag.id))
              .map((illust, i) => <IllustCard illust={illust} i={tagKey + i} />)
        )}
      </div>
    </>
  );
}

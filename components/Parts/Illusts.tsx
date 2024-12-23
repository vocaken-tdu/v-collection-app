'use client';

import React, { useEffect } from 'react';
import useStore from '@/store/useStore';
import { useIllustList, setIllustList } from '@/store/illustListStore';
import { IllustCard } from '@/components/_ui/IllustCard';
import { useTags, setTags } from '@/store/tagsStore';
import classes from './Illusts.module.css';
import { ComingSoon } from '@/components/_ui/ComingSoon';

// アーカイブのシーズンID
const archiveSeasonId = Number(process.env.NEXT_PUBLIC_ARCHIVE_SEASON_ID);

export function Illusts() {
  // イラスト(リスト)の状態を取得
  const illusts = useStore(useIllustList, (state) => state.illustList);

  // タグの状態を取得
  const tags = useStore(useTags, (state) => state.tags);

  // アーカイブするシーズンIDよりも最新のタグを取得
  const filteredTags = tags?.filter((tag) => tag.id > archiveSeasonId);

  // イラスト(リスト)を取得
  useEffect(() => {
    setIllustList();
    setTags();
  }, []);

  return (
    <>
      {/* タグを表示 (キーは兄弟間で一意である必要があるため100から開始している) */}
      {filteredTags?.map((tag, tagKey) => (
        <div key={tagKey + 100}>
          <h3 className={classes.header}>{tag.name ? `― ${tag.name} ―` : 'Now Loading...'}</h3>
          <div className={classes.cards} id="cards">
            {/* イラストをタグごとに表示 */}
            {illusts
              ?.filter((illust) => illust.tags.includes(tag.id))
              .map((illust, i) => <IllustCard illust={illust} key={illust.id} i={i} />)}
          </div>
          {/* イラストがない場合は公開予定であることを表示 */}
          {illusts?.filter((illust) => illust.tags.includes(tag.id)).length === 0 && <ComingSoon />}
        </div>
      ))}
    </>
  );
}

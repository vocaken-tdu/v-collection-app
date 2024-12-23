import { illusts, tags } from '@/utils/data';
import classes from './Illusts.module.css';

import { IllustCard } from '@/components/_ui/IllustCard';

// アーカイブのシーズンID
const archiveSeasonId = Number(process.env.NEXT_PUBLIC_ARCHIVE_SEASON_ID);

export function IllustsArchives() {
  // アーカイブするシーズンID以下のタグを取得
  const archiveIllusts = tags?.filter((tag) => tag.id <= archiveSeasonId);

  return (
    <>
      {/* タグを表示 (キーは兄弟間で一意である必要があるため100から開始している) */}
      {archiveIllusts?.map((tag, tagKey) => (
        <div key={tagKey + 100}>
          <h3 className={classes.header}>{tag.name ? `― ${tag.name} ―` : 'Now Loading...'}</h3>
          <div className={classes.cards} id="cards">
            {/* イラストをタグごとに表示 */}
            {illusts
              ?.filter((illust) => illust.tags.includes(tag.id))
              .map((illust, i) => <IllustCard illust={illust} key={illust.id} i={i} />)}
          </div>
        </div>
      ))}
    </>
  );
}

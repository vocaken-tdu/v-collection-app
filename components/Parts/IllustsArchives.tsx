import { illusts as illustList, categories as categoryList } from '@/app/actions';
import classes from './Illusts.module.css';

import { IllustCard } from '@/components/_ui/IllustCard';

export async function IllustsArchives() {
  const illusts = await illustList();
  const categories = await categoryList();

  // アーカイブするカテゴリのみを取得
  const archiveIllusts = categories?.filter((category) => category.isArchived);

  return (
    <>
      {/* タグを表示 (キーは兄弟間で一意である必要があるため100から開始している) */}
      {archiveIllusts?.map((category, tagKey) => (
        <div key={tagKey + 100}>
          <h3 className={classes.header}>
            {category.name ? `― ${category.name} ―` : 'Now Loading...'}
          </h3>
          <div className={classes.cards} id="cards">
            {/* イラストをタグごとに表示 */}
            {illusts
              ?.filter((illust) => illust.category.id === category.id)
              .map((illust, i) => <IllustCard illust={illust} key={illust.id} i={i} />)}
          </div>
        </div>
      ))}
    </>
  );
}

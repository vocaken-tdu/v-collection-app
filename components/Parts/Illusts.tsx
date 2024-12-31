import { illusts as illustList, categories as categoryList } from '@/app/actions';
import classes from './Illusts.module.css';

import { IllustCard } from '@/components/_ui/IllustCard';
import { ComingSoon } from '@/components/_ui/ComingSoon';

export async function Illusts() {
  const illusts = await illustList();
  const categories = await categoryList();

  // アーカイブするシーズンIDよりも最新のタグを取得
  const filteredCategories = categories?.filter((category) => !category.isArchived);

  return (
    <>
      {/* タグを表示 (キーは兄弟間で一意である必要があるため100から開始している) */}
      {filteredCategories?.map((category) => (
        <div key={category.id}>
          <h3 className={classes.header}>
            {category.name ? `― ${category.name} ―` : 'Now Loading...'}
          </h3>
          <div className={classes.cards} id="cards">
            {/* イラストをタグごとに表示 */}
            {illusts
              ?.filter((illust) => illust.category.id === category.id)
              .map((illust, i) => <IllustCard illust={illust} key={illust.id} i={i} />)}
          </div>
          {/* イラストがない場合は公開予定であることを表示 */}
          {illusts?.filter((illust) => illust.category.id === category.id).length === 0 && (
            <ComingSoon />
          )}
        </div>
      ))}
    </>
  );
}

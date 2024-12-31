import { Container, Group } from '@mantine/core';
import classes from './main-visual.module.css';
import { illusts as illustList } from '@/app/actions';

import { Arrow } from '@/components/_ui/Arrow';
import { Logo2024 } from '@/components/Logo/Logo2024';
import { RamdomIllust } from '@/components/MainVisual/RamdomIllust';

export async function MainVisual() {
  const illusts = await illustList();

  // 公開しているイラストのみに絞る
  const publicIllusts = illusts.filter((illust) => illust.category.isPublic);
  const newIllusts = publicIllusts.filter((illust) => !illust.category.isArchived);

  return (
    <Container size="xl" className={classes.wrap}>
      <div className={classes.inner}>
        <div className={classes.left}>
          <div className={`${classes.catchPhrase} anim-bounce`}>
            <div className={`${classes.highlight} ${classes.line1}`}>あのキャラはこの夏､</div>
            <div className={`${classes.highlight} ${classes.line2}`}>なにを着ているだろう</div>
            <Arrow />
          </div>
          <Group mt={80} visibleFrom="md" className={classes.logo}>
            <Logo2024 />
          </Group>
        </div>

        <RamdomIllust illusts={newIllusts} />

        <Group mt={24} hiddenFrom="md" className={classes.logo}>
          <Logo2024 />
        </Group>
      </div>
    </Container>
  );
}

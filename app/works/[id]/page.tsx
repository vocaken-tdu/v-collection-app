import { Container, SimpleGrid, Text } from '@mantine/core';
import classes from './page.module.css';

import { Comments } from '@/components/Parts/Comments';
import { RelatedIllusts } from '@/components/Parts/RelatedIllusts';
import { IllustInfo } from '@/components/_ui/IllustInfo';
import { BigImageCard } from '@/components/_ui/BigIllustCard';
import { PrevNextLink } from '@/components/_ui/PrevNextLink';

export default function Works({ params }: { params: { id: string } }) {
  let illustId = -1;
  // 自然数以外は除外
  if (Number.isInteger(Number(params.id)) && Number(params.id) > 0 && !params.id.includes('.')) {
    illustId = parseInt(params.id, 10);
  }

  return (
    <Container size="xxl">
      <div className={classes.main}>
        <div className={classes.wrap}>
          <SimpleGrid cols={1} spacing="md" className={classes.left}>
            <div className={classes.sticky}>
              <BigImageCard illustId={illustId} />
            </div>
          </SimpleGrid>

          <SimpleGrid cols={1} spacing="md" className={classes.right}>
            <IllustInfo />
            <Comments illustId={illustId} />
              <Text ta="right" c="dimmed">
                ※部員からのコメント
              </Text>
          </SimpleGrid>
        </div>
        <PrevNextLink illustId={illustId} />
      </div>
      <RelatedIllusts illustId={illustId} />
    </Container>
  );
}

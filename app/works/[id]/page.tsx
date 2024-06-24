import { Container, SimpleGrid, Text } from '@mantine/core';
import { Comments } from '@/components/Parts/Comments';
import { CommentForm } from '@/components/_ui/CommentForm';
import { RelatedIllusts } from '@/components/Parts/RelatedIllusts';
import { IllustInfo } from '@/components/_ui/IllustInfo';
import { BigImageCard } from '@/components/_ui/BigIllustCard';
import { PrevNextLink } from '@/components/_ui/PrevNextLink';

import classes from './page.module.css';

export default function Works({ params }: { params: { id: string } }) {
  let illustId = -1;
  // 自然数以外は除外
  if (Number.isInteger(Number(params.id)) && Number(params.id) > 0 && !params.id.includes('.')) {
    illustId = parseInt(params.id, 10);
  }

  const isAuth: boolean = true;

  /*

    // ドメイン名を取得
  useEffect(() => {
    // ドメイン認証
    setVerified();
  }, []);
  const isAuth = useVerified((state) => state.isAuth);

  */

  return (
    <>
      <Container size="lg" my="xl">
        <div className={classes.main}>
          <PrevNextLink illustId={illustId} />
          <SimpleGrid className={classes.wrap} cols={{ base: 1, sm: 2 }} spacing="lg">
            <SimpleGrid cols={1} spacing="md" className={classes.left}>
              <div className={classes.sticky}>
                <BigImageCard illustId={illustId} />
                <IllustInfo />
              </div>
            </SimpleGrid>

            <SimpleGrid cols={1} spacing="md" className={classes.right}>
              <Comments illustId={illustId} isFormVisible={isAuth} />
              {isAuth ? (
                <CommentForm illustId={illustId} />
              ) : (
                <Text ta="right" c="dimmed">
                  ※部員からのコメント
                </Text>
              )}
            </SimpleGrid>
          </SimpleGrid>
        </div>
        <RelatedIllusts illustId={illustId} />
      </Container>
    </>
  );
}

import { notFound } from 'next/navigation';
import { Container, SimpleGrid, Text } from '@mantine/core';
import { getIllustById } from '@/app/actions';
import classes from './page.module.css';

import { Comments } from '@/components/Parts/Comments';
import { RelatedIllusts } from '@/components/Parts/RelatedIllusts';
import { CommentForm } from '@/components/_ui/CommentForm';
import { IllustInfo } from '@/components/_ui/IllustInfo';
import { BigImageCard } from '@/components/_ui/BigIllustCard';
import { PrevNextLink } from '@/components/_ui/PrevNextLink';

const commentFormVisible = process.env.COMMENT_FORM_VISIBLE === 'true';

export default async function Works({ params }: { params: { id: string } }) {
  const illustId = params.id;

  // 8文字の英数字以外の場合は404ページを表示
  const regex = /^[0-9a-z]{8}$/;
  if (!regex.test(illustId)) return notFound();

  // イラストを取得
  const illust = await getIllustById(illustId);

  if (!illust) return notFound();

  // 環境変数で表示する設定 & カテゴリがアーカイブされていない場合にコメント入力フォームを表示
  const { isArchived } = illust.category;
  const isFormVisible = commentFormVisible && !isArchived;

  return (
    <Container size="xxl">
      <div className={classes.main}>
        <div className={classes.wrap}>
          <SimpleGrid cols={1} spacing="md" className={classes.left}>
            <div className={classes.sticky}>
              <BigImageCard illust={illust} />
            </div>
          </SimpleGrid>

          <SimpleGrid cols={1} spacing="md" className={classes.right}>
            <IllustInfo illust={illust} />
            <Comments illustId={illust.id} isFormVisible={isFormVisible} />
            {isFormVisible ? (
              <CommentForm illustId={illust.id} />
            ) : (
              <Text ta="right" c="dimmed">
                ※部員からのコメント
              </Text>
            )}
          </SimpleGrid>
        </div>
        <PrevNextLink illustId={illust.id} />
      </div>
      <RelatedIllusts illustId={illust.id} />
    </Container>
  );
}

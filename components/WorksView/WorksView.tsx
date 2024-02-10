'use client';

import { useEffect } from 'react';
import { SimpleGrid, Text } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { BigImageCard } from '@/components/Card/BigImageCard';
import { AuthorCard } from '@/components/Card/AuthorCard';
import { CommentCard } from '@/components/Card/CommentCard';
import { CommentForm } from '@/components/Card/CommentForm';
import { RelatedIllusts } from '@/components/Card/RelatedIllusts';
import { useVerified, setVerified } from '@/store/verifiedStore';
import classes from './WorksView.module.css';
import { PrevNextLink } from './PrevNextLink';

export function WorksView({ illustId }: { illustId: number }) {
  // 各要素の高さを取得 → CommentCard の高さを決定
  // 単に左側要素を取得するだけだと再帰して高さが変わることがある
  // 安全のため refBIC + refAC に分けている
  const { ref: refBIC, height: heightBIC } = useElementSize();
  const { ref: refAC, height: heightAC } = useElementSize();
  const { ref: refCF, height: heightCF } = useElementSize();

  // ドメイン名を取得
  useEffect(() => {
    // ドメイン認証
    setVerified();
  }, []);
  const isAuth = useVerified((state) => state.isAuth);

  return (
    <div className={classes.main}>
      <PrevNextLink illustId={illustId} />
      <SimpleGrid className={classes.wrap} cols={{ base: 1, sm: 2 }} spacing="lg">
        <SimpleGrid cols={1} spacing="md" className={classes.l}>
          <div ref={refBIC}>
            <BigImageCard illustId={illustId} />
          </div>
          <div ref={refAC}>
            <AuthorCard />
          </div>
        </SimpleGrid>
        <SimpleGrid cols={1} spacing="md" className={classes.r}>
          <CommentCard
            illustId={illustId}
            isFormVisible={isAuth}
            // CommentCard の高さ = BigImageCard + AuthorCard - CommentForm
            height={heightBIC + heightAC - heightCF}
          />
          <div ref={refCF}>
            {isAuth ? (
              <CommentForm illustId={illustId} />
            ) : (
              <Text ta="right" c="dimmed">
                ※部員からのコメント
              </Text>
            )}
          </div>
        </SimpleGrid>
      </SimpleGrid>
      <RelatedIllusts illustId={illustId} />
    </div>
  );
}

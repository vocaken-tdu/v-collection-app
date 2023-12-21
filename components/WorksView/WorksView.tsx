'use client';

import { useEffect } from 'react';
import { SimpleGrid } from '@mantine/core';
import { BigImageCard } from '@/components/Card/BigImageCard';
import { AuthorCard } from '@/components/Card/AuthorCard';
import { CommentCard } from '@/components/Card/CommentCard';
import { CommentForm } from '@/components/Card/CommentForm';
import { useVerified, setVerified } from '@/store/verifiedStore';
import classes from './WorksView.module.css';

export function WorksView({ illustId }: { illustId: number }) {
  // ドメイン名を取得
  useEffect(() => {
    // ドメイン認証
    setVerified();
  }, []);
  const isAuth = useVerified((state) => state.isAuth);

  return (
    <SimpleGrid className={classes.wrap} cols={{ base: 1, sm: 2 }} spacing="lg">
      <SimpleGrid cols={1} spacing="md" className={classes.l}>
        <BigImageCard illustId={illustId} />
        <AuthorCard />
      </SimpleGrid>
      <SimpleGrid cols={1} spacing="md" className={classes.r}>
        <CommentCard illustId={illustId} isFormVisible={isAuth} />
        {isAuth && <CommentForm illustId={illustId} />}
      </SimpleGrid>
    </SimpleGrid>
  );
}

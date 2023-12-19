'use client';

import { useEffect, useState } from 'react';
import { createHash } from 'crypto';
import { SimpleGrid } from '@mantine/core';
import { BigImageCard } from '@/components/Card/BigImageCard';
import { AuthorCard } from '@/components/Card/AuthorCard';
import { CommentCard } from '@/components/Card/CommentCard';
import { CommentForm } from '@/components/Card/CommentForm';
import classes from './WorksView.module.css';

export function WorksView({ illustId }: { illustId: number }) {
  const [domein, setDomein] = useState('');

  // ドメイン名を取得
  useEffect(() => {
    setDomein(window.location.hostname);
  }, []);

  // ハッシュ化
  const encryptSha256 = (str: string) => {
    const hash = createHash('sha256');
    hash.update(str);
    return hash.digest('hex');
  };

  // コメントフォームを表示するドメインの認証
  const isAuthDomein = () => {
    // hostNameをハッシュ化した値
    const authHash = [
      '49960de5880e8c687434170f6476605b8fe4aeb9a28632c7995cf3ba831d9763',
      '90204c9af65756457f2709654d6321900f67ac586a4f69eda5bae9fd3f2eab23',
    ];

    // ハッシュ化した値と一致するか
    if (authHash.includes(encryptSha256(domein))) {
      return true;
    }
    return false;
  };

  return (
    <SimpleGrid className={classes.wrap} cols={{ base: 1, sm: 2 }} spacing="lg">
      <SimpleGrid cols={1} spacing="md" className={classes.l}>
        <BigImageCard illustId={illustId} />
        <AuthorCard />
      </SimpleGrid>
      <SimpleGrid cols={1} spacing="md" className={classes.r}>
        <CommentCard illustId={illustId} isFormVisible={isAuthDomein()} />
        {isAuthDomein() && <CommentForm illustId={illustId} />}
      </SimpleGrid>
    </SimpleGrid>
  );
}

'use client';

import { SimpleGrid } from '@mantine/core';
import { BigImageCard } from '@/components/Card/BigImageCard';
import { AuthorCard } from '@/components/Card/AuthorCard';
import { CommentCard } from '@/components/Card/CommentCard';
import classes from './WorksView.module.css';

export function WorksView({ illustId }: { illustId: number }) {
  return (
    <SimpleGrid className={classes.wrap} cols={{ base: 1, sm: 2 }} spacing="md">
      <SimpleGrid cols={1} spacing="md">
        <BigImageCard illustId={illustId} />
        <AuthorCard illustId={illustId} />
      </SimpleGrid>
      <SimpleGrid cols={1} spacing="md">
        <CommentCard illustId={illustId} />
      </SimpleGrid>
    </SimpleGrid>
  );
}

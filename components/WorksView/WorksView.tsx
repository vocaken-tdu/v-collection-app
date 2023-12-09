'use client';

import { SimpleGrid } from '@mantine/core';
import { BigImageCard } from '@/components/Card/BigImageCard';
import { AuthorCard } from '@/components/Card/AuthorCard';
import { CommentCard } from '@/components/Card/CommentCard';
import classes from './WorksView.module.css';

export function WorksView({ id }: { id: number }) {
  return (
    <SimpleGrid className={classes.wrap} cols={{ base: 1, sm: 2 }} spacing="md">
      <SimpleGrid cols={1} spacing="md">
        <BigImageCard id={id} />
        <AuthorCard id={id} />
      </SimpleGrid>
      <SimpleGrid cols={1} spacing="md">
        <CommentCard commentId={id} />
      </SimpleGrid>
    </SimpleGrid>
  );
}

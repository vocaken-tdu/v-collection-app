'use client';

import Link from 'next/link';
import React, { useEffect } from 'react';
import { Text } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import useStore from '@/store/useStore';
import { useIllustList, setIllustList } from '@/store/illustListStore';
import classes from './PrevNextLink.module.css';

export function PrevNextLink({ illustId }: { illustId: number }) {
  // イラストのIDを取得
  useEffect(() => {
    // イラストのIDを取得
    setIllustList();
  }, [illustId]);

  // 前後のイラストのIDを算出
  const illusts = useStore(useIllustList, (state) => state.illustList) || [];
  const index = illusts.findIndex((illust) => illust.id === illustId);
  const prevId = illusts[index - 1]?.id || undefined;
  const nextId = illusts[index + 1]?.id || undefined;

  return (
    <div className={classes.arrowWrap}>
      {prevId && (
        <Link href={`/works/${prevId}`} className={`${classes.arrow} ${classes.prev}`}>
          <IconChevronLeft size={48} stroke={1.5} color="var(--mantine-color-blue-filled)" />
          <Text c="var(--mantine-color-blue-filled)" fw="bold">
            前へ
          </Text>
        </Link>
      )}
      {nextId && (
        <Link href={`/works/${nextId}`} className={`${classes.arrow} ${classes.next}`}>
          <Text c="var(--mantine-color-blue-filled)" fw="bold">
            次へ
          </Text>
          <IconChevronRight size={48} stroke={1.5} color="var(--mantine-color-blue-filled)" />
        </Link>
      )}
    </div>
  );
}

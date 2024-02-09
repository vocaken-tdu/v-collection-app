'use client';

import React, { useEffect } from 'react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useIllustList, setIllustList } from '@/store/illustListStore';
import classes from './PrevNextLink.module.css';

export function PrevNextLink({ illustId }: { illustId: number }) {
  // イラストのIDを取得
  useEffect(() => {
    // イラストのIDを取得
    setIllustList();
  }, [illustId]);

  // 前後のイラストのIDを算出
  const illusts = useIllustList((state) => state.illustList);
  const index = illusts.findIndex((illust) => illust.id === illustId);
  const prevId = illusts[index - 1]?.id || undefined;
  const nextId = illusts[index + 1]?.id || undefined;
  // なければ index = -1 を返すため nextId = 0 になる(一番最新のイラスト)

  return (
    <div className={classes.arrowWrap}>
      {prevId && (
        <a href={`/works/${prevId}`} className={`${classes.arrow} ${classes.prev}`}>
          <IconChevronLeft size={48} stroke={1.5} color="var(--mantine-color-blue-filled)" />
        </a>
      )}
      {nextId && (
        <a href={`/works/${nextId}`} className={`${classes.arrow} ${classes.next}`}>
          <IconChevronRight size={48} stroke={1.5} color="var(--mantine-color-blue-filled)" />
        </a>
      )}
    </div>
  );
}

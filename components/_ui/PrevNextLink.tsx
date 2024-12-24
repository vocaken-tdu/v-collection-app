import Link from 'next/link';
import { Text } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { illusts } from '@/utils/data';
import classes from './PrevNextLink.module.css';

export function PrevNextLink({ illustId }: { illustId: number }) {
  // 前後のイラストのIDを算出
  const index = illusts.findIndex((illust) => illust.id === illustId);
  const prevId = illusts[index - 1]?.id || undefined;
  const nextId = illusts[index + 1]?.id || undefined;

  return (
    <div className={classes.arrowWrap}>
      {prevId && (
        <Link href={`/works/${prevId}`} className={`${classes.arrow} ${classes.prev}`}>
          <IconChevronLeft size={48} stroke={1.5} color="var(--mantine-color-themeColor-filled)" />
          <Text c="var(--mantine-color-themeColor-filled)" fw="bold">
            前へ
          </Text>
        </Link>
      )}
      {nextId && (
        <Link href={`/works/${nextId}`} className={`${classes.arrow} ${classes.next}`}>
          <Text c="var(--mantine-color-themeColor-filled)" fw="bold">
            次へ
          </Text>
          <IconChevronRight size={48} stroke={1.5} color="var(--mantine-color-themeColor-filled)" />
        </Link>
      )}
    </div>
  );
}

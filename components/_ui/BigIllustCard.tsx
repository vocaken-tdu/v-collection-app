import Image from 'next/image';
import { Box, Card, LoadingOverlay } from '@mantine/core';
import { getIllustById } from '@/utils/data';
import classes from './BigIllustCard.module.css';

export function BigImageCard({ illustId }: { illustId: number }) {
  // イラストを取得
  const illust = getIllustById(illustId);

  if (!illust) {
    return (
      <Box pos="relative">
        <LoadingOverlay
          visible
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'themeColor' }}
          transitionProps={{ transition: 'fade', duration: 150 }}
        />
        <Card
          p="0"
          className={` ${classes.card} big-shadow anim-fadeIn`}
          radius="md"
          id="bigImage"
        />
      </Box>
    );
  }

  return (
    <Box pos="relative">
      <Card p="0" className={` ${classes.card} big-shadow anim-fadeIn`} radius="md" id="bigImage">
        <Image
          width={600}
          height={800}
          className={classes.image}
          src={illust.illust}
          alt={illust.caption}
          priority
          unoptimized
        />
      </Card>
    </Box>
  );
}

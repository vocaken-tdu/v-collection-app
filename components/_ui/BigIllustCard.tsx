'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Box, Card, LoadingOverlay } from '@mantine/core';
import { dataInfo } from '@/store/illustListStore';
import { useIllust, setIllust } from '@/store/illustStore';
import classes from './BigIllustCard.module.css';

export function BigImageCard({ illustId }: { illustId: number }) {
  // イラストの状態を取得
  const illust = useIllust((state) => state.illust);

  // イラストリストの状態を取得
  const isUpdated = dataInfo((state) => state.isUpdated);

  // イラストの取得状況を取得
  const [isLoaded, setIsLoaded] = useState(false);

  // イラストが表示できたときの処理
  const onLoaded = () => {
    setIsLoaded(true);
  };

  // イラストを取得
  useEffect(() => {
    setIllust(illustId);
  }, [isUpdated]);

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={!isLoaded}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'themeColor' }}
        transitionProps={{ transition: 'fade', duration: 150 }}
      />
      <Card
        p="0"
        className={` ${classes.card} big-shadow ${isLoaded && 'anim-fadeIn'}`}
        radius="md"
        id="bigImage"
      >
        <Image
          width={600}
          height={800}
          className={`${classes.image}`}
          src={illust.illust}
          alt={illust.caption}
          onLoad={onLoaded}
          priority
          unoptimized
        />
      </Card>
    </Box>
  );
}

import Image from 'next/image';
import React from 'react';
import { Text, Paper } from '@mantine/core';
import BGShape from '@/public/bg-shape.svg';
import classes from './ComingSoon.module.css';

export function ComingSoon() {
  return (
    <Paper radius="lg" p={64} variant="light" className={`${classes.wrap} "light-shadow"`}>
      <Image
        width={1280}
        height={200}
        id="commingSoon"
        src={BGShape.src}
        alt="Coming soon"
        className={classes.bgShape}
      />
      <Text size="xl" fw="bold">
        近日公開……！
      </Text>
      <Text size="sm" mt={16} c="dimmed">
        公開までしばらくお待ちください。
      </Text>
    </Paper>
  );
}

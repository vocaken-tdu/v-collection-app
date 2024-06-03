import React from 'react';
import { Text, Image, Paper } from '@mantine/core';

import flowShape from '@/public/flowShape.svg';
import classes from './ComingSoon.module.css';

export function ComingSoon() {
  return (
    <Paper
      radius="md"
      p={64}
      variant="light"
      className="text-center relative overflow-hidden light-shadow"
    >
      <Image
        id="commingSoon"
        src={flowShape.src}
        fit="contain"
        alt="flowShape"
        className={classes.flowShape}
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

'use client';

import { createTheme, MantineColorsTuple } from '@mantine/core';

const themeColor: MantineColorsTuple = [
  '#fff8e1',
  '#ffefcc',
  '#ffdd9b',
  '#ffca64',
  '#ffba38',
  '#ffb01b',
  '#ffab09',
  '#e39500',
  '#ca8500',
  '#af7100',
];

export const theme = createTheme({
  /* Put your mantine theme override here */
  fontFamily: '"Noto Sans JP", sans-serif',
  colors: {
    themeColor,
  },
});

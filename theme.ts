'use client';

import { createTheme, MantineColorsTuple } from '@mantine/core';

const blue: MantineColorsTuple = [
  '#e9f5ff',
  '#d7e6f9',
  '#b2caea',
  '#89acdb',
  '#6693ce',
  '#5084c7',
  '#437cc5',
  '#336aae',
  '#295e9e',
  '#16518d',
];

export const theme = createTheme({
  /* Put your mantine theme override here */
  fontFamily: '"Noto Sans JP", sans-serif',
  colors: {
    blue,
  },
});

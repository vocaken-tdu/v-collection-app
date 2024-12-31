import Image from 'next/image';
import { Box, Card } from '@mantine/core';
import { Illustration } from '@/types/database.types';
import classes from './BigIllustCard.module.css';

export async function BigImageCard({ illust }: { illust: Illustration }) {
  return (
    <Box pos="relative">
      <Card p="0" className={` ${classes.card} big-shadow anim-fadeIn`} radius="md" id="bigImage">
        <Image
          width={600}
          height={800}
          className={classes.image}
          src={illust.image.url}
          alt={illust.caption}
          priority
          unoptimized
        />
      </Card>
    </Box>
  );
}

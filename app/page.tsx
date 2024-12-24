import { Container } from '@mantine/core';

import { MainVisual } from '@/components/MainVisual/MainVisual';
import { Illusts } from '@/components/Parts/Illusts';

export default function Home() {
  return (
    <>
      <MainVisual />
      <Container size="xl" ta="center" mt={80}>
        <Illusts />
      </Container>
    </>
  );
}

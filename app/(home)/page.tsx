import { Container } from '@mantine/core';
import { MainVisual } from './main-visual';
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

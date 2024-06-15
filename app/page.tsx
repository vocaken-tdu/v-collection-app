import { Container } from '@mantine/core';
import { MainVisual } from '@/components/MainVisual/MainVisual';
import { Illusts } from '@/components/Card/Illusts';

export default function Home() {
  return (
    <>
      <MainVisual />
      <Container size="xl" className="mt-20 pb-64">
        <Illusts />
      </Container>
    </>
  );
}

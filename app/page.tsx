import { Container } from '@mantine/core';
import { MainVisual } from '@/components/MainVisual/MainVisual';
import { ImageCard } from '@/components/Card/ImageCard';
import { Shape20 } from '@/components/Background/Shape20';

export default function Home() {
  return (
    <>
      <Shape20 size="full" />
      <MainVisual />
      <Container size="xl" className="mt-40 mb-64">
        <ImageCard />
      </Container>
    </>
  );
}

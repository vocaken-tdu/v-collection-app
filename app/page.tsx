import { Container } from '@mantine/core';
import { MainVisual } from '@/components/MainVisual/MainVisual';
import { ImageCard } from '@/components/Card/ImageCard';

export default function Home() {
  return (
    <>
      <MainVisual />
      <Container size="xl" className="mt-20 pb-64">
        <ImageCard />
      </Container>
    </>
  );
}

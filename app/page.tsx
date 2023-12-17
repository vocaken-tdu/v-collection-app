import { Container } from '@mantine/core';
import { MainVisual } from '@/components/MainVisual/MainVisual';
import { ImageCard } from '@/components/Card/ImageCard';

export default function Home() {
  return (
    <>
      <MainVisual />
      <Container size="xl" className="mt-40 mb-64">
        <h2 className="text-3xl flex justify-center my-5">クリスマス</h2>
        <ImageCard />
      </Container>
    </>
  );
}

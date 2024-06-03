import { Container } from '@mantine/core';
import { ImageCardArtist } from '@/components/Card/ImageCardArtist';

export default function Home() {
  return (
    <>
      <Container size="xl" className="text-center">
        <h2 className="text-4xl my-40">参加アーティスト</h2>
        {/* ここにアーティスト一覧を表示 */}
        <ImageCardArtist />
      </Container>
    </>
  );
}

import { Container } from '@mantine/core';
import { IllustsArchives } from '@/components/Parts/IllustsArchives';

export default function Home() {
  return (
    <>
      <Container size="xl" ta="center">
        <h2>過去のイラスト企画</h2>
        {/* ここにアーティスト一覧を表示 */}
        <IllustsArchives />
      </Container>
    </>
  );
}

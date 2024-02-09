import { Container } from '@mantine/core';
import { WorksView } from '@/components/WorksView/WorksView';

export default function Works({ params }: { params: { id: string } }) {
  let illustId = -1;
  // 自然数以外は除外
  if (Number.isInteger(Number(params.id)) && Number(params.id) > 0 && !params.id.includes('.')) {
    illustId = parseInt(params.id, 10);
  }

  return (
    <>
      <Container size="lg" my="xl">
        <WorksView illustId={illustId} />
      </Container>
    </>
  );
}

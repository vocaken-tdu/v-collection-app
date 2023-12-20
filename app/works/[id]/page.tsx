import { Container } from '@mantine/core';
import { WorksView } from '@/components/WorksView/WorksView';
import { Shape20 } from '@/components/Background/Shape20';

export default function Works({ params }: { params: { id: number } }) {
  return (
    <>
      <Shape20 size="half" />
      <Container size="lg" my="xl">
        <WorksView illustId={params.id} />
      </Container>
    </>
  );
}

import { Container } from '@mantine/core';
import { WorksView } from '@/components/WorksView/WorksView';

export default function Works({ params }: { params: { id: number } }) {
  return (
    <>
      <Container size="lg" my="md">
        <WorksView illustId={params.id} />
      </Container>
    </>
  );
}

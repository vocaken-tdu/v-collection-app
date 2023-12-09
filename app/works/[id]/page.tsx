import { Container } from '@mantine/core';
import { WorksView } from '@/components/WorksView/WorksView';

export default function Works({ params }: { params: { id: number } }) {
  return (
    <>
      <Container size="xl" my="md">
        <WorksView id={params.id} />
      </Container>
    </>
  );
}

import { Container } from '@mantine/core';
import { WorksView } from '@/components/WorksView/WorksView';

export default function Works({ params }: { params: { illustId: number } }) {
  return (
    <>
      <Container size="xl" my="md">
        <WorksView illustId={params.illustId} />
      </Container>
    </>
  );
}

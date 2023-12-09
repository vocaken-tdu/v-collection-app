import { Container } from '@mantine/core';
import { BigImageCard } from '../../../components/Card/BigImageCard';

export default function Works({ params }: { params: { id: number } }) {
  return (
    <>
      <Container size="xl">
        <BigImageCard id={params.id} />
      </Container>
    </>
  );
}

import { Container } from '@mantine/core';
import { BigImageCard } from '../../../components/Card/BigImageCard';

export default function Works({ params }: { params: { id: number } }) {
  return (
    <>
      <Container size="xl">
        <h2 className="text-3xl flex justify-center my-5">クリスマス</h2>
        <BigImageCard id={params.id} />
      </Container>
    </>
  );
}

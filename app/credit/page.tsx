import { Container, SimpleGrid, Text } from '@mantine/core';

const credits = [
  {
    header: '企画',
    members: ['うたの', 'ます', 'だいまおー。', 'Harusame', 'Nyama', 'Rein', '紅シャケ'],
  },
  {
    header: 'フロントエンド開発',
    members: ['もちきつね', 'Ruto', 'Rein', 'あい'],
  },
  {
    header: 'バックエンド開発',
    members: ['ガルム', 'ソフトウェア研究部 有志の方'],
  },
];

export default function Home() {
  return (
    <>
      <Container size="xl">
        <h2>Credit</h2>
        <Text size="xl" mb={120}>
          このサイトは、
          <br className="sp-only" />
          VOCALOID同好会のメンバーと
          <br />
          有志の方々によって
          <br className="sp-only" />
          運営・開発されています。
        </Text>
        <SimpleGrid cols={{ base: 1, sm: 3, lg: 3 }}>
          {credits.map((credit) => (
            <div>
              <h3>{credit.header}</h3>
              {credit.members.map((member) => (
                <Text size="xl" my={24}>{member}</Text>
              ))}
            </div>
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
}

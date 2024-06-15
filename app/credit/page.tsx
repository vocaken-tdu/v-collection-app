import { Container, SimpleGrid } from '@mantine/core';

const credits = [
  {
    header: '企画',
    members: ['うたの', 'ます', 'Rein', '紅シャケ', 'だいまおー。', 'Nyama', 'Harusame'],
  },
  {
    header: 'フロントエンド開発',
    members: ['もちきつね', 'Rein', 'あい', 'Ruto'],
  },
  {
    header: 'バックエンド開発',
    members: ['(問い合わせ中)', '(問い合わせ中)', 'ソフトウェア研究部 有志の方'],
  },
];

export default function Home() {
  return (
    <>
      <Container size="xl" className="mt-20 pb-64">
        <h2 className="text-4xl mt-40">Credit</h2>
        <p className="text-xl mt-20 mb-40 leading-loose">
          このサイトは、VOCALOID同好会のメンバーと有志の方々によって運営されています。
        </p>
        <SimpleGrid cols={{ base: 1, sm: 3, lg: 3 }}>
          {credits.map((credit) => (
            <div>
              <h3 className="text-2xl">{credit.header}</h3>
              {credit.members.map((member) => (
                <p className="text-xl leading-loose">{member}</p>
              ))}
            </div>
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
}

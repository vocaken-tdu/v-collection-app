import Image from 'next/image';
import Link from 'next/link';
import { Card, Text, Container, AspectRatio, Group, Badge } from '@mantine/core';
import { illusts as illustList, getIllustById } from '@/app/actions';
import { getRelativeTime } from '@/utils/date';
import classes from './RelatedIllusts.module.css';

export async function RelatedIllusts({ illustId }: { illustId: string }) {
  const illusts = await illustList();
  const artistName = (await getIllustById(illustId))?.user_name;

  // この人が書いた他のイラストのデータ
  let otherIllusts = illusts.filter((illust) => illust.user_name === artistName);

  // このイラストを除く
  otherIllusts = otherIllusts.filter((illust) => illust.id !== illustId);

  return (
    <>
      {otherIllusts.length > 0 && (
        <Container mt={64} px={0} py="xl" size="xl">
          <Text size="xl" mb="lg" className={classes.header}>
            ― この人が描いた他のイラスト ―
          </Text>
          <div className={classes.cardWrap}>
            {otherIllusts.map((illust) => (
              <Link href={`/works/${illust.id}`} key={illust.id} className={classes.card}>
                <Card p="md" radius="md">
                  <AspectRatio ratio={1920 / 1080}>
                    <Image
                      width={320}
                      height={180}
                      src={illust.image.url}
                      alt={illust.caption}
                      className={classes.relatedIllust}
                      unoptimized
                    />
                  </AspectRatio>
                  <Group gap="xs" mt="md">
                    <Badge variant="light" color="themeColor" size="sm">
                      シーズン
                    </Badge>
                    <Text fz="lg" className={classes.title}>
                      {illust.category.name}
                    </Text>
                    <Text c="dimmed" size="xs" tt="uppercase" fw="bold" fz="xs">
                      {getRelativeTime(illust.publishedAt, 'day')}
                    </Text>
                  </Group>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      )}
    </>
  );
}

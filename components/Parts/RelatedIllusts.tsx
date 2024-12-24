import Image from 'next/image';
import Link from 'next/link';
import { Card, Text, Container, AspectRatio, Group, Badge } from '@mantine/core';
import { illusts, getIllustById, getTagName } from '@/utils/data';
import { getRelativeTime } from '@/utils/date';
import classes from './RelatedIllusts.module.css';

export function RelatedIllusts({ illustId }: { illustId: number }) {
  // このイラストの作者のID
  const userId = getIllustById(illustId)?.user_id;

  // この人が書いた他のイラストのデータ
  let otherIllusts = illusts.filter((illust) => illust.user_id === userId);

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
                      src={illust.illust}
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
                      {getTagName(illust.tags[0])}
                    </Text>
                    <Text c="dimmed" size="xs" tt="uppercase" fw="bold" fz="xs">
                      {getRelativeTime(illust.created_at, 'day')}
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

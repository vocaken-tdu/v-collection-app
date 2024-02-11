import { SimpleGrid, Card, Image, Text, Container, AspectRatio, Group, Badge } from '@mantine/core';
import classes from './RelatedIllusts.module.css';
import useStore from '@/store/useStore';
import { useIllustList } from '@/store/illustListStore';
import { GetTagName } from '../Tools/GetTagName';
import { GetRelativeTime } from '../Tools/GetRelativeTime';
import { useIllust } from '@/store/illustStore';

export function RelatedIllusts({ illustId }: { illustId: number }) {
  // このイラストの作者のID
  const userId = useStore(useIllust, (state) => state.illust.user_id);

  // この人が書いた他のイラストのデータ
  const illusts = useIllustList((state) => state.illustList);
  let otherIllusts = illusts.filter((illust) => illust.user_id === userId);

  // このイラストを除く
  otherIllusts = otherIllusts.filter((illust) => illust.id !== illustId);

  return (
    <>
      {otherIllusts.length > 0 && (
        <Container mt={64} px={0} py="xl" size="xl" className="w-full">
          <Text size="xl" mb="lg" className={`${classes.header}`}>
            ― この人が描いた他のイラスト ―
          </Text>
          <div className={classes.cardWrap}>
            {otherIllusts.map((illust, key) => (
              <Card
                key={key}
                p="md"
                radius="md"
                component="a"
                href={`/works/${illust.id}`}
                className={classes.card}
              >
                <AspectRatio ratio={1920 / 1080}>
                  <Image src={illust.illust} radius="sm" />
                </AspectRatio>
                <Group gap="xs" mt="md">
                  <Badge variant="light" color="blue" size="sm">
                    シーズン
                  </Badge>
                  <Text fz="lg" className={classes.title} c="#333">
                    <GetTagName tagId={illust.tags[0]} />
                  </Text>
                  <Text c="dimmed" size="xs" tt="uppercase" fw="bold" fz="xs">
                    <GetRelativeTime RawTime={illust.created_at} format="day" />
                  </Text>
                </Group>
              </Card>
            ))}
          </div>
        </Container>
      )}
    </>
  );
}

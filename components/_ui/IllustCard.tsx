import Link from 'next/link';
import { Card, Group, Image, Text } from '@mantine/core';
import { NotifyFetchFailedImage } from '@/components/_notifications/notify';
import { dataInfo } from '@/store/illustListStore';
import useStore from '@/store/useStore';
import { GetUserName } from '@/components/_tools/GetUserName';
import classes from './IllustCard.module.css';

export function IllustCard({ illust, illustKey }: { illust: any; illustKey: number }) {
  const isExist = useStore(dataInfo, (state) => state.isExist) || false;

  // 画像が取得できなかったときの通知を表示
  const fetchFailed = () => {
    // イラストが存在する場合のみ実行
    isExist && NotifyFetchFailedImage();
  };

  return (
    <div key={illustKey} className={classes.wrap} id="card">
      <Link href={`/works/${illust.id}`}>
        <Card p="lg" className={`big-shadow ${classes.card}`} radius="md" component="a">
          <Image
            className={classes.image}
            src={illust.illust}
            alt={illust.caption}
            onError={fetchFailed}
            loading="lazy"
          />
        </Card>
      </Link>
      <div className={`${classes.content} mt-2`}>
        <Group justify="space-between" gap="xs">
          <Text size="sm" className={classes.artist}>
            <GetUserName userId={illust.user_id} />
          </Text>
        </Group>
      </div>
    </div>
  );
}

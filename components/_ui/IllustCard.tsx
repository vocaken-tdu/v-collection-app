import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Card, Group, Text } from '@mantine/core';
import { NotifyFetchFailedImage } from '@/components/_notifications/notify';
import { dataInfo } from '@/store/illustListStore';
import useStore from '@/store/useStore';
import { GetUserName } from '@/components/_tools/GetUserName';
import classes from './IllustCard.module.css';

export function IllustCard({ illust, i }: { illust: any; i: number }) {
  const isExist = useStore(dataInfo, (state) => state.isExist) || false;
  const [isLoaded, setIsLoaded] = useState(false);

  const onLoaded = () => {
    setIsLoaded(true);
  };

  // 画像が取得できなかったときの通知を表示
  const fetchFailed = () => {
    // イラストが存在する場合のみ実行
    isExist && NotifyFetchFailedImage();
  };

  return (
    <div
      key={i}
      className={`${classes.wrap} ${isLoaded && 'anim-fadeUp'}`}
      style={{ animationDelay: `${i * 50}ms` }}
    >
      <Link href={`/works/${illust.id}`}>
        <Card p="0" className={`big-shadow ${classes.card}`} radius="md">
          <Image
            width={300}
            height={400}
            quality={100}
            className={classes.image}
            src={illust.illust}
            alt={illust.caption}
            onLoad={onLoaded}
            onError={fetchFailed}
          />
        </Card>
      </Link>
      <div className="mt-2">
        <Group justify="space-between" gap="xs">
          <Text size="sm" className={classes.artist}>
            <GetUserName userId={illust.user_id} />
          </Text>
        </Group>
      </div>
    </div>
  );
}

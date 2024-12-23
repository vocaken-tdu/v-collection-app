import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Card, Group, Text } from '@mantine/core';
import { NotifyFetchFailedImage } from '@/components/_tools/Notifications';
import { dataInfo } from '@/store/illustListStore';
import useStore from '@/store/useStore';
import { GetUserName } from '@/components/_tools/GetUserName';
import classes from './IllustCard.module.css';

export function IllustCard({ illust, i }: { illust: any; i: number }) {
  const isExist = useStore(dataInfo, (state) => state.isExist) || false;
  const [isLoaded, setIsLoaded] = useState(false);
  const cardRef = useRef(null);
  const [isIntersected, setIsIntersected] = useState(false);
  const [isObserved, setIsObserved] = useState(false);

  // イラストが表示できたときの処理
  const onLoaded = () => {
    setIsLoaded(true);
  };

  // IntersectionObserverの設定
  useEffect(() => {
    // イラストカードが存在しない場合は処理を終了
    if (!cardRef.current) return;

    // IntersectionObserverの設定
    const options = {
      rootMargin: '32px',
    };

    // IntersectionObserverで画像の読み込みを監視
    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        // イラストが視野内に表示されたときの処理
        if (entry.isIntersecting) {
          setIsIntersected(true);
          // (負荷軽減のため) 監視を終了
          observer.disconnect();
        }
      });
    }, options);

    // イラストカードが存在していてまだ監視していない場合は監視を開始 (二重監視を防ぐ)
    if (!isObserved) {
      observer.observe(cardRef.current);
      setIsObserved(true);
    }
  }, []);

  // 画像が取得できなかったときの通知を表示
  const fetchFailed = () => {
    // イラストが存在する場合のみ実行
    isExist && NotifyFetchFailedImage();
  };

  return (
    <div
      className={`${classes.wrap} ${isLoaded && isIntersected && 'anim-fadeUp'}`}
      style={{ animationDelay: `${i * 50}ms` }}
    >
      <Link href={`/works/${illust.id}`}>
        <Card p="0" className={`${classes.card} big-shadow`} radius="md" ref={cardRef}>
          <Image
            width={300}
            height={400}
            className={classes.image}
            src={illust.illust}
            alt={illust.caption}
            onLoad={onLoaded}
            onError={fetchFailed}
            unoptimized
          />
        </Card>
      </Link>
      <Group mt="xs" justify="space-between" gap="xs">
        <Text size="sm" className={classes.artist}>
          <GetUserName userId={illust.user_id} />
        </Text>
      </Group>
    </div>
  );
}

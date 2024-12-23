'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Card, Group, Text } from '@mantine/core';
import { getUserName } from '@/utils/data';
import classes from './IllustCard.module.css';

export function IllustCard({ illust, i }: { illust: any; i: number }) {
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
            unoptimized
          />
        </Card>
      </Link>
      <Group mt="xs" justify="space-between" gap="xs">
        <Text size="sm" className={classes.artist}>
          {getUserName(illust.user_id)}
        </Text>
      </Group>
    </div>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Card } from '@mantine/core';
import { Illustration } from '@/types/database.types';
import classes from './RamdomIllust.module.css';

export function RamdomIllust({ illusts }: { illusts: Illustration[] }) {
  // イラストのIDをランダムに生成
  const initialRandomId = Math.floor(Math.random() * illusts.length); // 初期用 (0を含む)
  const [currentId, setCurrentId] = useState(initialRandomId);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const changeIllust = () => {
      const genRandomId = Math.floor(Math.random() * (illusts.length - 1) + 1); // 加算用 (0は除く)
      setCurrentId((prevId) => (prevId + genRandomId) % illusts.length);
    };

    const timer = setInterval(changeIllust, 8000);
    return () => clearInterval(timer);
  }, [illusts.length]);

  return (
    <Link href={`/works/${illusts[currentId]?.id}`} className="anim-wave">
      <Card
        id="randomImage"
        className={`${classes.card} ${isLoaded && 'anim-fadeIn'}`}
        key={currentId} // 変更時にアニメーションを実行する
        bg="transparent"
      >
        <Image
          width={300}
          height={400}
          onLoad={() => setLoaded(true)}
          className={`${classes.image} big-shadow`}
          src={illusts[currentId]?.image.url}
          alt="Vコレのイラスト(ランダムで表示)"
          unoptimized
        />
      </Card>
    </Link>
  );
}

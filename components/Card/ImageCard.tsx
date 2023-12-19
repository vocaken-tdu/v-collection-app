'use client';

import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Card, Text, Group, Image } from '@mantine/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useIllustList, setIllustList } from '@/store/illustListStore';
import { GetUserName } from '../Tools/GetUserName';
import classes from './ImageCard.module.css';

gsap.registerPlugin(ScrollTrigger);

export function ImageCard() {
  const fadeRef = useRef(null);

  // アニメーション
  useLayoutEffect(() => {
    // 上下に動くアニメーション
    gsap.fromTo(
      fadeRef.current,
      {
        y: 48,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#cards',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });

  // イラスト(リスト)を取得
  useEffect(() => {
    setIllustList();
  }, []);

  // イラスト(リスト)の状態を取得
  const illusts = useIllustList((state) => state.illustList);

  return (
    <>
      <div className={classes.cards} id="cards" ref={fadeRef}>
        {illusts.map((illust, i) => (
          <div key={i} className={classes.wrap}>
            <Card
              p="lg"
              shadow="lg"
              className={classes.card}
              radius="md"
              component="a"
              href={`/works/${illust.id}`}
            >
              <Image className={classes.image} src={illust.illust} alt={illust.caption} />
              <div className={classes.overlay} />
            </Card>
            <div className={`${classes.content} mt-2`}>
              <Group justify="space-between" gap="xs">
                <Text size="sm" className={classes.artist}>
                  <GetUserName userId={illust.user_id} />
                </Text>
              </Group>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

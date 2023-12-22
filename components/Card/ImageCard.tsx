'use client';

import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Card, Text, Group, Image, Paper, Divider } from '@mantine/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useIllustList, setIllustList } from '@/store/illustListStore';
import { useTags, setTags } from '@/store/tagsStore';
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
    setTags();
  }, []);

  // イラスト(リスト)の状態を取得
  const illusts = useIllustList((state) => state.illustList);

  // タグの状態を取得
  const tags = useTags((state) => state.tags);

  return (
    <>
      {/* タグを表示 (キーは兄弟間で一意である必要があるため100から開始している) */}
      {tags.map((tag, tagKey) => (
        <div key={tagKey + 100} className={classes.tag}>
          <h2 className="text-3xl flex justify-center mt-20 mb-5">{tag.name}</h2>
          <div className={classes.cards} id="cards" ref={fadeRef}>
            {/* イラストをタグごとに表示 */}
            {illusts
              .filter((illust) => illust.tags.includes(tag.id))
              .map((illust, illustKey) => (
                <div key={illustKey} className={classes.wrap}>
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
          {/* イラストがない場合は公開予定であることを表示 */}
          {illusts.filter((illust) => illust.tags.includes(tag.id)).length === 0 && (
            <Paper shadow="lg" radius="md" p={64} variant="light" className="text-center">
              <Text size="xl">近日公開</Text>
              <Text size="sm" mt={16} c="dimmed">
                公開までしばらくお待ちください。
              </Text>
            </Paper>
          )}
        </div>
      ))}
    </>
  );
}

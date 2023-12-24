'use client';

import React, { useEffect } from 'react';
import { Card, Text, Group, Image, Paper } from '@mantine/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useIllustList, setIllustList } from '@/store/illustListStore';
import { useTags, setTags } from '@/store/tagsStore';
import { GetUserName } from '../Tools/GetUserName';
import classes from './ImageCard.module.css';
import flowShape from '@/public/flowShape.svg';

gsap.registerPlugin(ScrollTrigger);

export function ImageCard() {
  // イラスト(リスト)の状態を取得
  const illusts = useIllustList((state) => state.illustList);

  // タグの状態を取得
  const tags = useTags((state) => state.tags);

  // イラスト(リスト)を取得
  useEffect(() => {
    setIllustList();
    setTags();
  }, []);

  // アニメーション
  useEffect(() => {
    // 上下に動くアニメーション
    if (document.getElementById('card')) {
      gsap.fromTo(
        '#card',
        {
          y: 48,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#cards',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
    // 公開予定の背景アニメーション
    if (document.getElementById('commingSoon')) {
      gsap.to('#commingSoon', {
        y: -100,
        scrollTrigger: {
          trigger: '#commingSoon',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    }
  }, [illusts, tags]);

  return (
    <>
      {/* タグを表示 (キーは兄弟間で一意である必要があるため100から開始している) */}
      {tags.map((tag, tagKey) => (
        <div key={tagKey + 100} className={classes.tag}>
          <h2 className="text-3xl flex justify-center mt-20 mb-8">{`― ${tag.name} ―`}</h2>
          <div className={classes.cards} id="cards">
            {/* イラストをタグごとに表示 */}
            {illusts
              .filter((illust) => illust.tags.includes(tag.id))
              .map((illust, illustKey) => (
                <div key={illustKey} className={classes.wrap} id="card">
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
            // 背景にflowShapeを使用
            <Paper
              shadow="lg"
              radius="md"
              p={64}
              variant="light"
              className="text-center relative overflow-hidden"
            >
              <Image
                id="commingSoon"
                src={flowShape.src}
                fit="contain"
                alt="flowShape"
                className={classes.flowShape}
              />
              <Text size="xl" fw="bold">
                近日公開……！
              </Text>
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

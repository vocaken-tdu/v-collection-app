'use client';

import React, { useEffect } from 'react';
import { Card, Text, Group, Image, Paper } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import useStore from '@/store/useStore';
import { useIllustList, setIllustList, dataInfo } from '@/store/illustListStore';
import { useTags, setTags } from '@/store/tagsStore';
import { GetUserName } from '../Tools/GetUserName';
import classes from './ImageCard.module.css';
import flowShape from '@/public/flowShape.svg';

gsap.registerPlugin(ScrollTrigger);

export function ImageCard() {
  // イラスト(リスト)の状態を取得
  const illusts = useStore(useIllustList, (state) => state.illustList);
  const isExist = useStore(dataInfo, (state) => state.isExist) || false;

  // タグの状態を取得
  const tags = useStore(useTags, (state) => state.tags);

  // 画像が取得できなかったときの通知を表示
  const fetchFailedImage = () => {
    // イラストが存在する場合のみ通知を表示
    isExist &&
      notifications.show({
        id: 'fetchFailedImage',
        loading: true,
        autoClose: false,
        radius: 'md',
        title: '画像が取得できませんでした。',
        message: '現在対応中です。しばらくお待ちいただくか、長く続く場合はお問い合わせください。',
      });
  };

  // イラスト(リスト)を取得
  useEffect(() => {
    setIllustList();
    setTags();
  }, []);

  useEffect(() => {
    // 下からフェードインするアニメーション
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
      {tags?.map((tag, tagKey) => (
        <div key={tagKey + 100} className={classes.tag}>
          <h2 className="text-3xl flex justify-center mt-20 mb-8">
            {tag.name ? `― ${tag.name} ―` : 'Now Loading...'}
          </h2>
          <div className={classes.cards} id="cards">
            {/* イラストをタグごとに表示 */}
            {illusts
              ?.filter((illust) => illust.tags.includes(tag.id))
              .map((illust, illustKey) => (
                <div key={illustKey} className={classes.wrap} id="card">
                  <Card
                    p="lg"
                    className={`big-shadow ${classes.card}`}
                    radius="md"
                    component="a"
                    href={`/works/${illust.id}`}
                  >
                    <Image
                      className={classes.image}
                      src={illust.illust}
                      alt={illust.caption}
                      onError={fetchFailedImage}
                      loading="lazy"
                    />
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
          {illusts?.filter((illust) => illust.tags.includes(tag.id)).length === 0 && (
            // 背景にflowShapeを使用
            <Paper
              radius="md"
              p={64}
              variant="light"
              className="text-center relative overflow-hidden light-shadow"
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

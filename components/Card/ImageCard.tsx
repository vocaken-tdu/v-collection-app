'use client';

import React, { useEffect } from 'react';
import { Text, Image, Paper } from '@mantine/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import useStore from '@/store/useStore';
import { useIllustList, setIllustList } from '@/store/illustListStore';
import { IllustCard } from '@/components/_ui/IllustCard';
import { useTags, setTags } from '@/store/tagsStore';
import classes from './ImageCard.module.css';
import flowShape from '@/public/flowShape.svg';

gsap.registerPlugin(ScrollTrigger);

export function ImageCard() {
  // イラスト(リスト)の状態を取得
  const illusts = useStore(useIllustList, (state) => state.illustList);

  // タグの状態を取得
  const tags = useStore(useTags, (state) => state.tags);

  // イラスト(リスト)を取得
  useEffect(() => {
    setIllustList();
    setTags();
  }, []);

  useEffect(() => {
    // 下からフェードインするアニメーション
    // if (document.getElementById('card')) {
    //   gsap.fromTo(
    //     '#card',
    //     {
    //       y: 48,
    //       opacity: 0,
    //     },
    //     {
    //       y: 0,
    //       opacity: 1,
    //       duration: 0.7,
    //       stagger: 0.05,
    //       ease: 'power2.out',
    //       scrollTrigger: {
    //         trigger: '#cards',
    //         start: 'top 80%',
    //         toggleActions: 'play none none reverse',
    //       },
    //     }
    //   );
    // }
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
                <IllustCard illust={illust} illustKey={illustKey} />
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

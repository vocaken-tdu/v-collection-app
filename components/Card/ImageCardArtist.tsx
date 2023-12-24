'use client';

import React, { useEffect } from 'react';
import { Card, Text, Group, Image } from '@mantine/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useIllustList, setIllustList } from '@/store/illustListStore';
import { useUserName, setUserName } from '@/store/userNameStore';
import { GetUserName } from '../Tools/GetUserName';
import classes from './ImageCard.module.css';

gsap.registerPlugin(ScrollTrigger);

export function ImageCardArtist() {
  // イラスト(リスト)を取得
  useEffect(() => {
    setIllustList();
    setUserName();
  }, []);

  // イラスト(リスト)の状態を取得
  const illusts = useIllustList((state) => state.illustList);

  // ユーザーの状態を取得
  const users = useUserName((state) => state.user);

  return (
    <>
      {/* ユーザーを表示 (キーは兄弟間で一意である必要があるため100から開始している) */}
      {users.map((user, userKey) =>
        // イラストをユーザーごとに表示
        illusts
          .filter((illust) => illust.user_id === user.id)
          .map((illust, illustKey) => (
            <div key={userKey + 100} className={`${classes.tag}`}>
              <h2 className="text-3xl flex justify-center mt-20 mb-5">{`― ${user.name} ―`}</h2>
              <div className={classes.cards} id="cards">
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
              </div>
            </div>
          ))
      )}
    </>
  );
}

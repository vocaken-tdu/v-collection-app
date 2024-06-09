'use client';

import React, { useEffect } from 'react';
import useStore from '@/store/useStore';
import { IllustCard } from '@/components/_ui/IllustCard';
import { useIllustList, setIllustList } from '@/store/illustListStore';
import { useUserName, setUserName } from '@/store/userNameStore';
import classes from './ImageCard.module.css';

export function ImageCardArtist() {
  // イラスト(リスト)の状態を取得
  const illusts = useStore(useIllustList, (state) => state.illustList) || [];

  // ユーザーの状態を取得
  const users = useUserName((state) => state.user);

  // イラスト(リスト)を取得
  useEffect(() => {
    setIllustList();
    setUserName();
  }, []);

  // useEffect(() => {
  //   // 下からフェードインするアニメーション
  //   if (document.getElementById('card')) {
  //     gsap.fromTo(
  //       '#card',
  //       {
  //         y: 48,
  //         opacity: 0,
  //       },
  //       {
  //         y: 0,
  //         opacity: 1,
  //         duration: 0.7,
  //         stagger: 0.05,
  //         ease: 'power2.out',
  //         scrollTrigger: {
  //           trigger: '#cards',
  //           start: 'top 80%',
  //           toggleActions: 'play none none reverse',
  //         },
  //       }
  //     );
  //   }
  // }, [illusts, users]);

  return (
    <>
      {/* ユーザーを表示 (キーは兄弟間で一意である必要があるため100から開始している) */}
      {users.map(
        (user, userKey) =>
          // 1作品以上イラストを描いているユーザーであれば表示
          illusts.filter((illust) => illust.user_id === user.id).length > 0 && (
            <div key={userKey + 100} className={`${classes.tag}`}>
              <h2 className="text-3xl flex justify-center mt-20 mb-5">
                {user.name ? `― ${user.name} ―` : 'Now Loading...'}
              </h2>
              <div className={classes.cards} id="cards">
                {/* イラストをユーザーごとに表示 */}
                {illusts
                  .filter((illust) => illust.user_id === user.id)
                  .map((illust, illustKey) => (
                    <IllustCard illust={illust} illustKey={illustKey} />
                  ))}
              </div>
            </div>
          )
      )}
    </>
  );
}

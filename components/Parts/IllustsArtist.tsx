'use client';

import React, { useEffect } from 'react';
import useStore from '@/store/useStore';
import { IllustCard } from '@/components/_ui/IllustCard';
import { useIllustList, setIllustList } from '@/store/illustListStore';
import { useUserName, setUserName } from '@/store/userNameStore';
import classes from './Illusts.module.css';

export function IllustsArtist() {
  // イラスト(リスト)の状態を取得
  const illusts = useStore(useIllustList, (state) => state.illustList) || [];

  // ユーザーの状態を取得
  const users = useUserName((state) => state.user);

  // イラスト(リスト)を取得
  useEffect(() => {
    setIllustList();
    setUserName();
  }, []);

  return (
    <>
      {/* ユーザーを表示 (キーは兄弟間で一意である必要があるため100から開始している) */}
      {users.map(
        (user, userKey) =>
          // 1作品以上イラストを描いているユーザーであれば表示
          illusts.filter((illust) => illust.user_id === user.id).length > 0 && (
            <div key={userKey + 100}>
              <h3 className={classes.header}>{user.name ? `― ${user.name} ―` : 'Now Loading...'}</h3>
              <div className={classes.cards} id="cards">
                {/* イラストをユーザーごとに表示 */}
                {illusts
                  .filter((illust) => illust.user_id === user.id)
                  .map((illust, i) => (
                    <IllustCard illust={illust} i={i} />
                  ))}
              </div>
            </div>
          )
      )}
    </>
  );
}

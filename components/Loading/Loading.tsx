'use client';

import { useEffect } from 'react';
import { Logo2024 } from '@/components/Logo/Logo2024';
import classes from './Loading.module.css';
import { setIsFirstAccess } from '@/store/isFirstAccess';

export function Loading() {
  useEffect(() => {
    // 3.5秒後に初回アクセスかどうかをfalseにする
    setTimeout(() => setIsFirstAccess(), 3500);
  }, []);

  return (
    <div className={`${classes.wrap} ${classes.animFadeOutLogo}`}>
      <Logo2024 isAnimate />
    </div>
  );
}

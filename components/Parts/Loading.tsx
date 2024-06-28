'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import LoadingLogo from '@/public/2024-summer/Logo_24sum-anim.webp';
import classes from './Loading.module.css';
import { setIsFirstAccess } from '@/store/isFirstAccess';

export function Loading() {
  useEffect(() => {
    // 5秒後に初回アクセスかどうかをfalseにする
    setTimeout(() => setIsFirstAccess(), 5000);
  }, []);

  return (
    <div className={`${classes.wrap} anim-fadeOutLogo`}>
      <Image src={LoadingLogo.src} className={classes.logo} width={500} height={100} alt="Logo" />
    </div>
  );
}

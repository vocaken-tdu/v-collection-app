/*
  Framer Motionのラッパー
  ページ遷移時のアニメーションを設定する
*/

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function MotionWrapper({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathName}
        initial={{ opacity: 0, y: 48, size: 80 }} // 初期
        animate={{ opacity: 1, y: 0, size: 100 }} // マウント時
        transition={{ duration: 0.4, ease: 'circOut' }} // アニメーションの時間
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

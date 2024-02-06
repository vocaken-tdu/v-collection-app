'use client';

import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import type { Container } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

export const TspApp = () => {
  const [init, setInit] = useState(false);

  // 1度だけ実行
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // パーティクル読み込み完了時の処理 (ログ出力)
  const particlesLoaded = (container?: Container) => {
    console.log(container);
    return Promise.resolve();
  };

  if (init) {
    return (
      <>
        <Particles
          id="tsparticles"
          url="/particles/particles.json"
          particlesLoaded={particlesLoaded}
        />
      </>
    );
  }

  return <></>;
};

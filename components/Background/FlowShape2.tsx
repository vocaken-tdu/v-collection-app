'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import classes from './FlowShape2.module.css';

gsap.registerPlugin(ScrollTrigger);

export function FlowShape2() {
  // スクロールしたときにパララックスするアニメーション
  useEffect(() => {
    gsap.to('#anim', {
      y: -1600,
      scrollTrigger: {
        trigger: '#anim',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      },
    });
  }, []);

  return (
    <div className={classes.bgWrap}>
      <div className={classes.bgParallax}>
        <div className={classes.bg} id="anim" />
      </div>
    </div>
  );
}

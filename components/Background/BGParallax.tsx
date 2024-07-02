'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import classes from './BGParallax.module.css';

gsap.registerPlugin(ScrollTrigger);

export function BGParallax() {
  // スクロールしたときにパララックスするアニメーション
  useEffect(() => {
    gsap.to('#parallax1', {
      y: -1200,
      scrollTrigger: {
        trigger: '#parallax1',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      },
    });
    gsap.to('#parallax2', {
      y: -1600,
      scrollTrigger: {
        trigger: '#parallax2',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      },
    });
  }, []);

  return (
    <div className={classes.bgWrap}>
      <div className={classes.bgParallax}>
        <div className={`${classes.bg} ${classes.parallax1}`} id="parallax1" />
      </div>
      <div className={classes.bgParallax}>
        <div className={`${classes.bg} ${classes.parallax2}`} id="parallax2" />
      </div>
    </div>
  );
}

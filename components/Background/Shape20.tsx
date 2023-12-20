'use client';

import { BackgroundImage } from '@mantine/core';
import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import shape from '@/public/shape20.svg';
import classes from './Shape20.module.css';

gsap.registerPlugin(ScrollTrigger);

export function Shape20() {
  useEffect(() => {
    const y = -300;

    gsap.to('#anim', {
      y,
      scrollTrigger: {
        trigger: '#anim',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      },
    });
  }, []);

  return <BackgroundImage src={shape.src} className={classes.bg} id="anim" />;
}

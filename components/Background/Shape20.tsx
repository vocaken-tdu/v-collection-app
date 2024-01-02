'use client';

import { useEffect } from 'react';
import { BackgroundImage } from '@mantine/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import shape from '@/public/shape20.svg';
import classes from './Shape20.module.css';

gsap.registerPlugin(ScrollTrigger);

export function Shape20() {
  useEffect(() => {
    gsap.to('#anim', {
      opacity: 1,
    });
    gsap.to('#anim', {
      y: -300,
      scrollTrigger: {
        trigger: '#anim',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      },
    });
  }, []);
  return <BackgroundImage src={shape.src} className={`${classes.bg} opacity-0`} id="anim" />;
}

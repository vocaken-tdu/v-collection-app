'use client';

import { Image, Container, Group } from '@mantine/core';
import image from '../../public/illustrations/202311221521.png';
import logo from '../../public/Logo.png';
import classes from './MainVisual.module.css';

export function MainVisual() {
  return (
    <Container size="xl" className={`${classes.main} h-screen overflow-hidden`}>
      <div className={classes.inner}>
        <div className={`${classes.content} grid place-content-center`}>
          <div className={classes.title}>
            <div className={`${classes.highlight} ${classes.l}`}>あのキャラはこの冬</div>
            <div className={`${classes.highlight} ${classes.r}`}>
              どんな服で過ごしているだろう
            </div>
          </div>

          <Group mt={60}>
            <Image
              src={logo.src}
            />
          </Group>
        </div>
        <div className={`${classes.wrap} rotate-3`}>
          <Image
            className={classes.image}
            src={image.src}
          />
        </div>
      </div>
    </Container>
  );
}

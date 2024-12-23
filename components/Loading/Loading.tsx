import classes from './Loading.module.css';

import { Logo2024 } from '@/components/Logo/Logo2024';

export function Loading() {
  return (
    <div className={`${classes.wrap} ${classes.animFadeOutLogo}`}>
      <Logo2024 isAnimate />
    </div>
  );
}

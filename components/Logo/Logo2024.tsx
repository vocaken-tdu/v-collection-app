import Image from 'next/image';
import sun from '@/public/2024-summer/logo/sun.svg';
import title from '@/public/2024-summer/logo/title.svg';
import subtitle from '@/public/2024-summer/logo/subtitle.svg';
import classes from './Logo2024.module.css';

export function Logo2024({ isAnimate }: { isAnimate?: boolean }) {
  return (
    <div className={`${classes.wrap} ${isAnimate && classes.anim}`}>
      <Image src={sun} alt="Logo(sun)" className={classes.sun} />
      <Image src={title} alt="Logo(title)" className={classes.title} />
      <Image src={subtitle} alt="Logo(subtitle)" className={classes.subtitle} />
    </div>
  );
}

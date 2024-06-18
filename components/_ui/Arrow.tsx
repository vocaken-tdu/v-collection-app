import classes from './Arrow.module.css';

export function Arrow() {
  const path = (
    <path d="M0.944688 11.388L11.5656 0.924973C12.2058 0.29428 13.1881 0.168057 13.9669 0.616395L32.2111 11.1183C33.9869 12.1405 33.2596 14.8543 31.2106 14.8516L2.34558 14.8128C0.55784 14.8104 -0.328865 12.6426 0.944688 11.388Z" />
  );

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="34"
        height="15"
        viewBox="0 0 34 15"
        className={`${classes.arrow} ${classes.pc} anim-tail-pc`}
      >
        {path}
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="34"
        height="15"
        viewBox="0 0 34 15"
        className={`${classes.arrow} ${classes.sp} anim-tail-sp`}
      >
        {path}
      </svg>
    </>
  );
}

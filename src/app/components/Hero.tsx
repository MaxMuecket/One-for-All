import React from 'react';
import styles from './Hero.module.css';

type HeroProps = {
  title: string;
  // imgSrc: string;
};

function Hero({ title }: HeroProps): JSX.Element {
  return (
    <section className={styles.hero}>
      {/* <img src={imgSrc} alt="" /> */}
      <h1>{title}</h1>
    </section>
  );
}

export default Hero;

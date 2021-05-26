import React from 'react';
import styles from './Footer.module.css';

type FooterProps = {
  link: string;
};

function Footer({ link }: FooterProps): JSX.Element {
  return (
    <ul className={styles.footer}>
      <li>
        {link}
        <a href="#">Bam</a>
      </li>
      <li>
        {link}
        <a href="#">Bam</a>
      </li>
      <li>
        {link}
        <a href="#">Bam</a>
      </li>
    </ul>
  );
}

export default Footer;

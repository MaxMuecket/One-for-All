import React from 'react';
import styles from './Credential.module.css';
import type { Credential as CredentialType } from '../../types';

type CredentialProps = {
  credential: CredentialType;
};

function Credential({ credential }: CredentialProps): JSX.Element {
  return (
    <ul className={styles.credential}>
      <li className={styles.credential__button}>
        {credential.service}
        <button>↩️</button>
        <button>⏩</button>
        <button>🚮</button>
      </li>
      {/* <span>{credential.username}</span>
      <span>{credential.password}</span> */}
    </ul>
  );
}

export default Credential;

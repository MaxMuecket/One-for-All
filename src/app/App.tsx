import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import { Credential as CredentialType } from '../types';
import Credential from './components/Credential';
import Footer from './components/Footer';
import Hero from './components/Hero';

function App(): JSX.Element {
  // const [count, setCount] = useState(0);
  const [credentials, setCredentials] = useState<CredentialType[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/credentials')
      .then((response) => response.json())
      .then(setCredentials);
  }, []);

  const credentialElements = credentials.map((credential) => (
    <Credential key={credential.service} credential={credential} />
  ));

  return (
    <div className={styles.App}>
      <header>
        <Hero title="ONE-FOR-ALL" />
      </header>
      <main>
        <ul>{credentialElements}</ul>
      </main>
      <footer>
        <Footer link="" />
      </footer>
    </div>
  );
}
export default App;

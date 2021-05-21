import React from 'react';
import styles from './App.module.css';
import Credential from './components/Credential';
import Hero from './components/Hero';

function App(): JSX.Element {
  // const [count, setCount] = useState(0);

  return (
    <div className={styles.App}>
      <header>
        <Hero title="ONE-FOR-ALL" />
      </header>
      <main>
        <ul>
          <Credential service="Bla" />
        </ul>
      </main>
    </div>
  );
}
export default App;

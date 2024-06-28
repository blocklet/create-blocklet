import solidjsLogo from './assets/solidjs.svg';
import blockletLogo from './assets/blocklet.svg';
import styles from './App.module.css';

function App() {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <div class={styles.container}>
          <img src={solidjsLogo} class={styles.logo} alt="solidjs logo" />
          <img src={blockletLogo} class={styles.logo} alt="blocklet logo" />
        </div>
        <p>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://www.arcblock.io/docs/blocklet-developer/en/getting-started"
          target="_blank"
          rel="noopener noreferrer">
          Learn Blocklet
        </a>
      </header>
    </div>
  );
}

export default App;

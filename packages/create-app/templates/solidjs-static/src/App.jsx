import logo from './logo.svg';
import styles from './App.module.css';

function App() {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://developer.blocklet.io/docs/en/blocklet"
          target="_blank"
          rel="noopener noreferrer">
          Learn Blocklet
        </a>
      </header>
    </div>
  );
}

export default App;

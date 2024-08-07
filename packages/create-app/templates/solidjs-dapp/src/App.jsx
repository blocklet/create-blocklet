import solidjsLogo from './assets/solidjs.svg';
import blockletLogo from './assets/blocklet.svg';
import styles from './App.module.css';
import api from './libs/api';

function App() {
  async function getApiData() {
    const { data } = await api.get('/api/data');
    const { message } = data;
    alert(`Message from api: ${message}`);
  }

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
        <button onClick={getApiData}>Get API Data</button>
        <a
          class={styles.link}
          href="https://www.arcblock.io/docs/blocklet-developer/getting-started"
          target="_blank"
          rel="noopener noreferrer">
          Learn Blocklet
        </a>
      </header>
    </div>
  );
}

export default App;

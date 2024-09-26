import { useState } from 'react';
import { Stack } from '@mui/material';
import reactLogo from '../../assets/react.svg';
import blockletLogo from '../../assets/blocklet.svg';
import viteLogo from '../../assets/vite.svg';
import walletLogo from '../../assets/wallet.png';
import api from '../../libs/api';
import './index.css';

function Home() {
  const [count, setCount] = useState(0);

  async function getApiData() {
    const { data } = await api.get('/api/data');
    const { message } = data;
    alert(`Message from api: ${message}`);
  }

  return (
    <Stack sx={{ textAlign: 'center', mt: '10%'}}>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://www.arcblock.io/docs/blocklet-developer/getting-started" target="_blank" rel="noreferrer">
          <img src={blockletLogo} className="logo blocklet" alt="Blocklet logo" />
        </a>
        <a href="https://www.didwallet.io/en" target="_blank" rel="noreferrer">
          <img src={walletLogo} className="logo wallet" alt="Wallet logo" />
        </a>
      </div>
      <h1>Vite + React + Blocklet + DID Wallet</h1>
      <p>
        This is a demo app for DID Wallet.You can use DID Wallet to sign in and get API data.
      </p>
      <div className="card">
        <button type="button" onClick={() => setCount((currentCount) => currentCount + 1)}>
          count is {count}
        </button>
        <br />
        <br />
        <button type="button" onClick={getApiData}>
          Get API Data
        </button>
        <p>
          Edit <code>src/app.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the logo to learn more details</p>
    </Stack>
  );
}

export default Home;

import { useState } from 'react';
import { Stack } from '@mui/material';

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
    <Stack className="container" sx={{ textAlign: 'center' }}>
      <h1>Vite + React + Blocklet</h1>
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
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </Stack>
  );
}

export default Home;

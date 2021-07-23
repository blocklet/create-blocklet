import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './app.css';
import api from './libs/api';

function App() {
  const [env, setEnv] = useState({});
  useEffect(async () => {
    const { data } = await api.get('/api');
    setEnv(data);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <pre style={{ textAlign: 'left' }}>
          <code>{JSON.stringify(env, null, 2)}</code>
        </pre>
        <a className="app-link" href="https://docs.arcblock.io/abtnode/" target="_blank" rel="noopener noreferrer">
          Learn Blocklet
        </a>
      </header>
    </div>
  );
}

export default App;

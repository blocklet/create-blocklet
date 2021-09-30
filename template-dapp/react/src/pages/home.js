import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../logo.svg';
import api from '../libs/api';

const Home = () => {
  const [env, setEnv] = useState({});
  useEffect(async () => {
    const { data } = await api.get('/api/env');
    setEnv(data);
  }, []);

  return (
    <header className="app-header">
      <img src={logo} className="app-logo" alt="logo" />
      <pre style={{ textAlign: 'left' }}>
        <code>{JSON.stringify(env, null, 2)}</code>
      </pre>
      <Link className="app-link" to="/about">
        About
      </Link>
      <a className="app-link" href="https://docs.arcblock.io/abtnode/" target="_blank" rel="noopener noreferrer">
        Learn Blocklet
      </a>
    </header>
  );
};

export default Home;

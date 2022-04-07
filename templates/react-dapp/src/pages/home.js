import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../logo.svg';

const Home = () => {
  return (
    <header className="app-header">
      <img src={logo} className="app-logo" alt="logo" />
      <pre style={{ textAlign: 'left' }}>
        <code>window.blocklet = {JSON.stringify(window.blocklet, null, 2)}</code>
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

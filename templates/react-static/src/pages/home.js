import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';

const Home = () => {
  return (
    <header className="app-header">
      <img src={logo} className="app-logo" alt="logo" />
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

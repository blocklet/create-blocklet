import React from 'react';
import logo from './logo.svg';
import './app.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <a className="app-link" href="https://docs.arcblock.io/abtnode/" target="_blank" rel="noopener noreferrer">
          Learn Blocklet
        </a>
      </header>
    </div>
  );
}

export default App;

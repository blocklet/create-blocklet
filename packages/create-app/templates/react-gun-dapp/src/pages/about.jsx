import { Link } from 'react-router-dom';

import logo from '../logo.svg';

function About() {
  return (
    <header className="app-header">
      <img src={logo} className="app-logo" alt="logo" />
      <pre style={{ textAlign: 'left' }}>
        <code>window.blocklet = {JSON.stringify(window.blocklet, null, 2)}</code>
      </pre>
      <Link className="app-link" to="/home">
        Home
      </Link>
      <a
        className="app-link"
        href="https://www.arcblock.io/docs/blocklet-developer/getting-started"
        target="_blank"
        rel="noopener noreferrer">
        Learn Blocklet
      </a>
      <a className="app-link" href="https://gun.eco" target="_blank" rel="noopener noreferrer">
        Learn GunJS
      </a>
    </header>
  );
}

export default About;

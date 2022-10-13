/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import Gun from 'gun';

import { Link } from 'react-router-dom';

const gun = Gun({
  peers: [`${window.location.origin}${window?.blocklet?.prefix || ''}gun`], // Put the relay nodes that you want here
});

export default function Home() {
  const [txt, setTxt] = useState();

  useEffect(() => {
    gun.get('text').once((node) => {
      // Retrieve the text value on startup
      console.log(node);
      if (node === undefined) {
        gun.get('text').put({ text: 'Write the text here' });
      } else {
        console.log('Found Node');
        setTxt(node.text);
      }
    });

    gun.get('text').on((node) => {
      // Is called whenever text is updated
      console.log('Receiving Update');
      console.log(node);
      setTxt(node.text);
    });
  }, []);

  const updateText = (event) => {
    console.log('Updating Text');
    console.log(event.target.value);
    gun.get('text').put({ text: event.target.value }); // Edit the value in our db
    setTxt(event.target.value);
  };

  return (
    <div className="App">
      <h1 className="page-title">Sample App build with React & GunJS</h1>
      <div className="input-wrapper">
        <textarea className="input" value={txt} onChange={updateText} />
      </div>

      <div className="link-wrapper">
        <Link className="app-link" to="/home">
          Home
        </Link>
        <a className="app-link" href="https://docs.arcblock.io/abtnode/" target="_blank" rel="noopener noreferrer">
          Learn Blocklet
        </a>
        <a className="app-link" href="https://gun.eco" target="_blank" rel="noopener noreferrer">
          Learn GunJS
        </a>
      </div>
    </div>
  );
}

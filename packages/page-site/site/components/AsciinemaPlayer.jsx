import { useEffect, useRef } from 'react';
import * as AsciinemaPlayer from 'asciinema-player';
import 'asciinema-player/dist/bundle/asciinema-player.css';

function Asciinema({ sourcePath }) {
  const refAsciinema = useRef(null);
  useEffect(() => {
    const player = AsciinemaPlayer.create(sourcePath, refAsciinema.current, {
      autoPlay: true,
      preload: true,
      loop: true,
      speed: 1,
      idleTimeLimit: 1,
      cols: 100,
      rows: 30,
    });
    return () => {
      player.dispose();
    };
  }, []);
  return <div ref={refAsciinema}></div>;
}

export default Asciinema;

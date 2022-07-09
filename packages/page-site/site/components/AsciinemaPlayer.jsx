import { useEffect, useRef } from 'react';
import * as AsciinemaPlayer from 'asciinema-player';
import 'asciinema-player/dist/bundle/asciinema-player.css';

function Asciinema({ sourcePath }) {
  const refAsciinema = useRef(null);
  useEffect(() => {
    const parentElement = refAsciinema.current.parentElement;
    parentElement.style.overflow = 'auto';
    parentElement.style.width = '90%';
    const player = AsciinemaPlayer.create(sourcePath, refAsciinema.current, {
      autoPlay: true,
      preload: true,
      loop: true,
      speed: 1,
      idleTimeLimit: 1,
    });
    return () => {
      refAsciinema.current && player.dispose();
    };
  }, []);
  return <div className="overflow-auto max-w-[700px] m-auto" ref={refAsciinema}></div>;
}

export default Asciinema;

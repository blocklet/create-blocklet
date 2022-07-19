import { isInBlocklet } from './utils.js';

export default function createHmrPlugin({ version }) {
  return {
    name: 'blocklet:hmr',
    apply: 'serve',
    transform(code, id) {
      if (isInBlocklet && version === 2) {
        if (id.endsWith('/vite/dist/client/client.mjs')) {
          let replacedCode = code;
          replacedCode = replacedCode.replace("const base = __BASE__ || '/';\n", '');
          replacedCode = replacedCode.replace(
            'const socketHost = `${__HMR_HOSTNAME__ || location.hostname}:${__HMR_PORT__}`;',
            "const base = __BASE__ || '/';\nlet tmpPort = __HMR_PORT__;\nif (window.blocklet) {\ntmpPort = new URL(window.location.href).port + base;\n}\nconst socketHost = `${__HMR_HOSTNAME__ || location.hostname}${tmpPort ? `:${tmpPort}` : ''}`;"
          );
          return replacedCode;
        }
      }
    },
  };
}

import { version as viteVersion } from 'vite';
import semver from 'semver';
import { isInBlocklet } from './utils.js';

export default function createHmrPlugin({ version = viteVersion } = {}) {
  return {
    name: 'blocklet:hmr',
    apply: 'serve',
    async transform(code, id) {
      if (isInBlocklet && id.endsWith('/vite/dist/client/client.mjs')) {
        const pureVersion = semver.major(version);
        let replacedCode = code;
        if (pureVersion === 2) {
          replacedCode = replacedCode.replace("const base = __BASE__ || '/';\n", '');
          replacedCode = replacedCode.replace(
            'const socketHost = `${__HMR_HOSTNAME__ || location.hostname}:${__HMR_PORT__}`;',
            "const base = __BASE__ || '/';\nlet tmpPort = __HMR_PORT__;\nif (window.blocklet) {\ntmpPort = new URL(window.location.href).port + base;\n}\nconst socketHost = `${__HMR_HOSTNAME__ || location.hostname}${tmpPort ? `:${tmpPort}` : ''}`;"
          );
          return replacedCode;
        } else if (pureVersion === 3) {
          let replacedCode = code;
          replacedCode = replacedCode.replace('__HMR_PORT__', 'undefined');
          return replacedCode;
        }
      }
    },
  };
}

import { version as viteVersion } from 'vite';
import semver from 'semver';
import { isInBlocklet } from './utils.js';

/**
 * Creates a HMR plugin with the given options.
 *
 * @param {Object} options - The options for the HMR plugin.
 * @param {string} options.version - The version of the vite version.
 * @return {Object} The HMR plugin object.
 */
export default function createHmrPlugin(options = {}) {
  const { version = viteVersion } = options;
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
            "const base = __BASE__ || '/';\nlet tmpPort = __HMR_PORT__;\nif (window.blocklet) {\ntmpPort = new URL(window.location.href).port + base;\n}\nconst socketHost = `${__HMR_HOSTNAME__ || location.hostname}${tmpPort ? `:${tmpPort}` : ''}`;",
          );
          return replacedCode;
        }

        // 根据页面的协议自动判断端口
        replacedCode = replacedCode.replace(
          /__HMR_PORT__/g,
          'location.port || (location.protocol === "https:" ? 443 : 80);',
        );

        // 在页面加载时,触发一次 upgrade
        replacedCode = replacedCode.replace(
          'function setupWebSocket(protocol, hostAndPath, onCloseWithoutOpen) {',
          'async function setupWebSocket(protocol, hostAndPath, onCloseWithoutOpen) {\nawait waitForSuccessfulPing(protocol, hostAndPath);\n',
        );
        replacedCode = replacedCode.replace('fallback = () => {', 'fallback = async () => {');
        replacedCode = replacedCode.replace(/socket = setupWebSocket\(/g, 'socket = await setupWebSocket(');

        if ([4, 5].includes(pureVersion)) {
          // 改变刷新页面的判断
          replacedCode = replacedCode.replace(
            'const ping =',
            "const ping = async () => {\ntry {\nawait fetch(`${pingHostProtocol}://${hostAndPath}`, {\nmode: 'no-cors',\nheaders: {\nAccept: 'text/x-vite-ping'\n}\n}).then(res => {\nif ([404, 502].includes(res.status)) {\nthrow new Error('waiting for server to restart...');\n}\n});\nreturn true;\n} catch {}\nreturn false;\n}\nconst pingBak =",
          );
        }
        return replacedCode;
      }
    },
  };
}

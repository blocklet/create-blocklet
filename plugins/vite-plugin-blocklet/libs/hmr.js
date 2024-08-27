import { version as viteVersion } from 'vite';
import semver from 'semver';
import { blockletPrefix, isInBlocklet } from './utils.js';

/**
 * Creates a HMR plugin with the given options.
 *
 * @param {Object} options - The options for the HMR plugin.
 * @param {string} options.version - The version of the vite version.
 * @param {'middleware'|'client'|'server'|'wsUpgrade'} [options.hmrMode = 'client'] - The version of the vite version.
 * @return {Object} The HMR plugin object.
 */
export default function createHmrPlugin(options = {}) {
  const { version = viteVersion, hmrMode = process.env.VITE_HMR_MODE || 'client' } = options || {};
  return {
    name: 'blocklet:hmr',
    apply: 'serve',
    transform(code, id) {
      if (isInBlocklet && id.endsWith('/vite/dist/client/client.mjs')) {
        const pureVersion = semver.major(version);
        let replacedCode = code;
        if (pureVersion === 2) {
          replacedCode = replacedCode.replace("const base = __BASE__ || '/';\n", '');
          replacedCode = replacedCode.replace(
            'const socketHost = `${__HMR_HOSTNAME__ || location.hostname}:${__HMR_PORT__}`;',
            `const base = __BASE__ || '/';
let tmpPort = __HMR_PORT__;
if (window.blocklet) {
  tmpPort = new URL(window.location.href).port + base;
}
const socketHost = \`\$\{__HMR_HOSTNAME__ || location.hostname\}\$\{tmpPort ? \`:\$\{tmpPort\}\` : ''}\`;`,
          );
          return replacedCode;
        }

        // 兼容不带服务端的情况、vite 以中间件形式挂载到服务端代码的情况
        if (['client', 'middleware', 'wsUpgrade'].includes(hmrMode)) {
          replacedCode = replacedCode.replace(
            /__HMR_BASE__/g,
            `"${blockletPrefix === '/' ? '' : blockletPrefix}"+__HMR_BASE__`,
          );
        }

        // 兼容 vite 以中间件形式挂载到服务端代码的情况，无论 ws 是中间件挂载还是 ws 直接监听 upgrade 事件都支持
        if (['middleware', 'wsUpgrade'].includes(hmrMode)) {
          // 根据页面的协议自动判断端口
          replacedCode = replacedCode.replace(
            /__HMR_PORT__/g,
            'location.port || (location.protocol === "https:" ? 443 : 80);',
          );
        }
        // 当 ws 是以中间件的形式挂载到服务端代码时，需要手动在页面触发一次 upgrade 事件
        if (hmrMode === 'middleware') {
          // 在页面加载时,触发一次 upgrade
          replacedCode = replacedCode.replace(
            `try {
  let fallback;`,
            `async function runInit() {
try {
  let fallback;`,
          );
          replacedCode = replacedCode.replace(
            `console.error(\`[vite] failed to connect to websocket (\$\{error\}). \`);
}`,
            `console.error(\`[vite] failed to connect to websocket (\$\{error\}). \`);
}
}
runInit();`,
          );
          replacedCode = replacedCode.replace(
            'function setupWebSocket(protocol, hostAndPath, onCloseWithoutOpen) {',
            `async function setupWebSocket(protocol, hostAndPath, onCloseWithoutOpen) {
  await waitForSuccessfulPing(protocol, hostAndPath);
`,
          );
          replacedCode = replacedCode.replace('fallback = () => {', 'fallback = async () => {');
          replacedCode = replacedCode.replace(/socket = setupWebSocket\(/g, 'socket = await setupWebSocket(');
        }
        // 当 ws 是通过服务端的 proxy 来实现时，需要更改页面自动刷新的判断逻辑
        if (['middleware', 'wsUpgrade'].includes(hmrMode)) {
          if ([4, 5].includes(pureVersion)) {
            // 改变刷新页面的判断
            replacedCode = replacedCode.replace(
              'const ping =',
              `const ping = async () => {
      try {
        await fetch(\`\$\{pingHostProtocol\}://\$\{hostAndPath\}\`, {
          mode: 'no-cors',
          headers: {
            Accept: 'text/x-vite-ping'
          }
        }).then((res) => {
          if ([404, 502].includes(res.status)) {
            throw new Error('waiting for server to restart...');
          }
        });
        return true;
      } catch {}
    return false;
  }
  const pingBak =`,
            );
          }
        }

        return replacedCode;
      }
      return code;
    },
  };
}

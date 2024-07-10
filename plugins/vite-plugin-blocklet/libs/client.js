import path from 'node:path';
import getPort from 'get-port';
import { createServer } from 'vite';
import mri from 'mri';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { blockletPrefix } from './utils.js';

const argv = process.argv.slice(2);
const isProduction = process.env.NODE_ENV === 'production' || process.env.ABT_NODE_SERVICE_ENV === 'production';

/**
 * Sets up the client for the application.
 *
 * @param {Object} app - The application object.
 * @param {Object} [options={}] - The options object.
 * @param {string} [options.host='127.0.0.1'] - The host for the server.
 * @param {string} [options.protocol='ws'] - The protocol for the server.
 * @param {number} [options.port] - The port for the ws server.
 * @param {number} [options.clientPort] - The clientPort for the ws server.
 * @param {string} [options.configFile=''] - The path to the config file.
 * @param {string} [options.appType='spa'] - The type of the application.
 * @param {import('node:http').Server} [options.server] - The http server instance
 * @param {object} [options.importMetaHot] - vite import.meta.hot
 * @return {Promise<Object>} A promise that resolves to the Vite server object.
 */
export default async function setupClient(app, options = {}) {
  if (!isProduction) {
    const params = mri(argv, {
      alias: {
        config: 'c',
      },
    });
    const { host, protocol = 'ws', port: inputPort, configFile = '', appType = 'spa' } = options || {};
    const port = await getPort({ port: inputPort });
    const clientPort = options?.clientPort || port;
    const enableWsMiddleware = !host;
    if (enableWsMiddleware) {
      // 创建 hmr proxy
      const hmrWsPath = path.join(blockletPrefix, '/__vite_hmr__');
      const wsProxy = createProxyMiddleware({
        target: `ws://127.0.0.1:${port}`,
        ws: true,
      });
      try {
        if (options?.server) {
          options.server.on('upgrade', (req, socket, head) => {
            if ((req.originalUrl || req.url).includes(hmrWsPath)) {
              wsProxy.upgrade(req, socket, head);
            }
          });
          process.env.VITE_HMR_MODE = 'wsUpgrade';
        } else {
          throw new Error('Missing options.server, fallback to use middleware mode.');
        }
      } catch {
        process.env.VITE_HMR_MODE = 'middleware';
        app.use(hmrWsPath, wsProxy);
      }
    } else {
      process.env.VITE_HMR_MODE = 'server';
    }

    // 以中间件模式创建 Vite 服务器
    const vite = await createServer({
      configFile: params.config || configFile || undefined,
      server: {
        middlewareMode: true,
        hmr: enableWsMiddleware
          ? {
              port,
              path: '/__vite_hmr__',
            }
          : {
              host,
              port,
              clientPort,
              protocol,
            },
      },
      appType,
    });
    // 将 vite 的 connect 实例作中间件使用
    app.use(vite.middlewares);
    // 用于 vite-node 进行服务重载时，先关闭原有服务的端口监听
    if (options?.server && options?.importMetaHot && options.importMetaHot?.on && options.importMetaHot?.dispose) {
      async function killServer() {
        await options.server.close((err) => {
          console.log('vite-plugin-blocklet: Server closed succeed');
          console.error('vite-plugin-blocklet: Failed to close server', err);
        });
      }
      options.importMetaHot.on('vite:beforeFullReload', async () => {
        console.log('vite-plugin-blocklet: Full reload');
        await killServer();
      });

      options.importMetaHot.dispose(async () => {
        console.log('vite-plugin-blocklet: Dispose');
        await killServer();
      });
    }
    return vite;
  }
}

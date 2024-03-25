import getPort from 'get-port';
import { createServer } from 'vite';
import mri from 'mri';

const argv = process.argv.slice(2);
const isProduction = process.env.NODE_ENV === 'production' || process.env.ABT_NODE_SERVICE_ENV === 'production';

/**
 * Sets up the client for the application.
 *
 * @param {Object} app - The application object.
 * @param {Object} [options={}] - The options object.
 * @param {string} [options.host='127.0.0.1'] - The host for the server.
 * @param {string} [options.protocol='ws'] - The protocol for the server.
 * @param {number} [options.port] - The port for the server.
 * @param {string} [options.configFile=''] - The path to the config file.
 * @param {string} [options.appType='spa'] - The type of the application.
 * @return {Promise<Object>} A promise that resolves to the Vite server object.
 */
export default async function setupClient(app, options = {}) {
  if (!isProduction) {
    const params = mri(argv, {
      alias: {
        config: 'c',
      },
    });
    const { host = '127.0.0.1', protocol = 'ws', port: inputPort, configFile = '', appType = 'spa' } = options;
    const port = await getPort({ port: inputPort });
    // 以中间件模式创建 Vite 服务器
    const vite = await createServer({
      configFile: params.config || configFile || undefined,
      server: {
        middlewareMode: true,
        hmr: {
          host,
          port,
          protocol,
        },
      },
      appType,
    });
    // 将 vite 的 connect 实例作中间件使用
    app.use(vite.middlewares);
    return vite;
  }
}

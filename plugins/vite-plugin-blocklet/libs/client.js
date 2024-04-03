import fs from 'node:fs';
import path from 'node:path';
import getPort from 'get-port';
import { createServer } from 'vite';
import mri from 'mri';
import dotenv from 'dotenv';

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
    let skipWritePort = true;
    let envAppendContent = '';
    let envObject = '';
    const envFilePath = path.join(process.cwd(), '.env.development.local');
    let port;

    if (!fs.existsSync(envFilePath)) {
      skipWritePort = false;
      port = await getPort({ port: inputPort });
      envAppendContent = `BLOCKLET_VITE_PORT=${port}`;
    } else {
      port = await getPort({ port: inputPort });
      const envContent = await fs.promises.readFile(envFilePath, 'utf-8');
      envObject = dotenv.parse(envContent);

      if (!envObject.BLOCKLET_VITE_PORT) {
        skipWritePort = false;
        envAppendContent = `${envContent}\nBLOCKLET_VITE_PORT=${port}`;
      } else {
        port = process.env.BLOCKLET_VITE_PORT;
      }
    }
    if (!skipWritePort && envAppendContent) {
      // TODO @zhanghan 常见的 env file 处理暂不支持保留 comment，所以不能通过解析后的对象来写入文件
      // @see https://github.com/bevry/envfile/pull/213
      await fs.promises.writeFile(envFilePath, envAppendContent);
    }
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

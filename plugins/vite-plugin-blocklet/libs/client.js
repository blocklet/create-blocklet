import getPort from 'get-port';
import { createServer } from 'vite';

const isProduction = process.env.NODE_ENV === 'production' || process.env.ABT_NODE_SERVICE_ENV === 'production';

export default async function setupClient(app, options = {}) {
  if (!isProduction) {
    const { host = '127.0.0.1', protocol = 'ws', port: inputPort } = options;
    const port = await getPort({ port: inputPort });
    // 以中间件模式创建 Vite 服务器
    const vite = await createServer({
      server: {
        middlewareMode: true,
        hmr: {
          host,
          port,
          protocol,
        },
      },
    });
    // 将 vite 的 connect 实例作中间件使用
    app.use(vite.middlewares);
  }
}

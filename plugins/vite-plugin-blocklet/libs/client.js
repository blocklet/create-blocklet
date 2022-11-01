import getPort from 'get-port';
import { createServer } from 'vite';
import { createProxyMiddleware } from 'http-proxy-middleware';

const isProduction = process.env.NODE_ENV === 'production' || process.env.ABT_NODE_SERVICE_ENV === 'production';

export default async function setupClient(app, server, options = {}) {
  if (!isProduction) {
    const randomport = await getPort();
    const { host = 'localhost', protocol = 'ws', port = randomport } = options;
    const hmrPath = `/_vite_websocket_${port}`;
    // 以中间件模式创建 Vite 服务器
    const vite = await createServer({
      server: {
        middlewareMode: true,
        hmr: {
          port,
          path: hmrPath,
        },
      },
    });
    // 将 vite 的 connect 实例作中间件使用
    const wsProxy = createProxyMiddleware(`${protocol}://${host}:${port}`);
    app.use(hmrPath, wsProxy);
    server.on('upgrade', wsProxy.upgrade);
    app.use(vite.middlewares);
  }
}

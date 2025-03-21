import { readFileSync } from 'fs';
import path from 'path';
import { setupClient } from 'vite-plugin-blocklet';

import { app, server } from './src';

(async () => {
  const viteDevServer = await setupClient(app, {
    appType: 'custom',
    server,
    importMetaHot: import.meta.hot,
  });

  const html = readFileSync(path.join(__dirname, '../index.html'), 'utf-8');
  const transformedHtml = await viteDevServer.transformIndexHtml('/', html);

  // Add route to serve the transformed HTML
  app.get('*', (req, res) => {
    res.send(transformedHtml);
  });
})();

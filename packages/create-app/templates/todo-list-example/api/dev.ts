import { app } from './src';

import('vite-plugin-blocklet').then(({ setupClient }) => {
  setupClient(app);
});

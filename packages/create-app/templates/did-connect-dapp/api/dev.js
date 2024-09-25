const { app } = require('./index');

import('vite-plugin-blocklet').then(({ setupClient }) => {
  setupClient(app);
});

const { app, server } = require('./index');

import('vite-plugin-blocklet').then(({ setupClient }) => {
  setupClient(app, {
    server,
  });
});

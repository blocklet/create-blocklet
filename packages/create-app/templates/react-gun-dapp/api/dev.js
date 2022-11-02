const { setupClient } = require('vite-plugin-blocklet');
const { server, app } = require('./index');

setupClient(app, server);

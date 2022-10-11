require('dotenv-flow').config();

const mountPoint = process.env.BLOCKLET_DEV_MOUNT_POINT || '';
const port = process.env.BLOCKLET_PORT || process.env.PORT || 3000;
const apiPort = process.env.API_PORT || 3030;
const apiPrefix = `${mountPoint}/api`;
const whenDev = process.env.NODE_ENV === 'development';

module.exports = {
  publicPath: whenDev ? '' : process.env.PUBLIC_PATH || '/',
  devServer: {
    port,
    allowedHosts: 'all',
    client: {
      // If you want to development this blocklet without blocklet-server, you can delete next line, otherwise the hot reload will be failed.
      webSocketURL: `wss://0.0.0.0${mountPoint}/ws`,
    },
    proxy: {
      [apiPrefix]: {
        target: `http://127.0.0.1:${apiPort}`,
        rewrite: (path) => path.replace(apiPrefix, '/api'), // rewrite path when blocklet dev
      },
    },
  },
};

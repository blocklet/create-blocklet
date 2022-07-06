require('dotenv-flow').config();

const port = process.env.BLOCKLET_PORT || process.env.PORT || 3000;
const apiPort = process.env.API_PORT || 57890;

const whenDev = process.env.NODE_ENV === 'development';

const mountPoint = process.env.BLOCKLET_DEV_MOUNT_POINT || '';

module.exports = {
  devServer: {
    port,
    client: {
      // If you want to development this blocklet without blocklet-server, you can delete next line, otherwise the hot reload will be failed.
      webSocketURL: `wss://0.0.0.0${mountPoint}/ws`,
    },
    proxy: [
      {
        context: ['/api'],
        target: `http://127.0.0.1:${apiPort}`,
      },
      {
        context: ['/gun'],
        target: `ws://127.0.0.1:${apiPort}`,
        ws: true,
      },
    ],
  },
  webpack: {
    configure: {
      module: {
        noParse: /gun\.js$/,
      },
      output: whenDev
        ? {
            publicPath: '', // When the dev mode as component, this line required
          }
        : {},
    },
  },
};

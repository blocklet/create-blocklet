require('dotenv-flow').config();

const port = process.env.BLOCKLET_PORT || process.env.PORT || 3000;
const apiPort = process.env.API_PORT || 3030;

module.exports = {
  devServer: {
    port,
    client: {
      // If you want to development this blocklet without blocklet-server, you can delete next line, otherwise the hot reload will be failed.
      webSocketURL: 'wss://0.0.0.0/ws',
    },
    proxy: {
      '/api': {
        target: `http://127.0.0.1:${apiPort}`,
      },
    },
  },
};

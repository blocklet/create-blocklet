const port = process.env.BLOCKLET_PORT || process.env.PORT || 8080;
const dappPort = process.env.APP_PORT || 3030;

module.exports = {
  devServer: {
    port,
    client: {
      // If you want to development this blocklet without blocklet-server, you can delete next line, otherwise the hot reload will be failed.
      webSocketURL: 'wss://0.0.0.0/ws',
    },
    proxy: [
      {
        context: ['/api'],
        target: `http://127.0.0.1:${dappPort}`,
      },
      {
        context: ['/gun'],
        target: `ws://127.0.0.1:${dappPort}`,
        ws: true,
      },
    ],
  },
  webpack: {
    configure: {
      module: {
        noParse: /gun\.js$/,
      },
    },
  },
};

const port = process.env.BLOCKLET_PORT || process.env.PORT || 8080;

module.exports = {
  publicPath: process.env.PUBLIC_PATH || '/',
  devServer: {
    port,
    allowedHosts: 'all',
    client: {
      // If you want to development this blocklet without blocklet-server, you can delete next line, otherwise the hot reload will be failed.
      webSocketURL: 'wss://0.0.0.0/ws',
    },
  },
};

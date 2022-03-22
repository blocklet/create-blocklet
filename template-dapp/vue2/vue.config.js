module.exports = {
  publicPath: process.env.PUBLIC_PATH || '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3030',
      },
    },
  },
};

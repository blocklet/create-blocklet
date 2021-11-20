module.exports = {
  publicPath: process.env.PUBLIC_PATH || '/',
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3030',
      },
    },
  },
};

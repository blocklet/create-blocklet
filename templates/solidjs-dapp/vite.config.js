import { defineConfig, loadEnv } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { createHtmlPlugin } from 'vite-plugin-html';
import { createBlockletPlugin } from 'vite-plugin-blocklet';

export default ({ mode }) => {
  const envMap = loadEnv(mode, process.cwd(), '');
  const port = process.env.BLOCKLET_PORT || 3000;
  const apiPort = envMap.API_PORT || 3030;

  return defineConfig({
    plugins: [
      solidPlugin(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            base: process.env.BASE_URL || '/',
            title: envMap.APP_TITLE,
          },
        },
      }),
      createBlockletPlugin(),
    ],
    build: {
      target: 'esnext',
      polyfillDynamicImport: false,
    },
    server: {
      port,
      proxy: {
        '/api': `http://127.0.0.1:${apiPort}`,
      },
    },
  });
};
